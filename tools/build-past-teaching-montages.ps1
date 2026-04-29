[CmdletBinding()]
param(
    [string[]]$Keys = @()
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$workspaceRoot = Split-Path $repoRoot -Parent
$assetRoot = Join-Path $repoRoot "assets\past-teaching"
$renderRoot = Join-Path $repoRoot "output\past-teaching"
$montageScript = Join-Path $repoRoot "tools\create_montage.py"
$fallbackCoverScript = Join-Path $repoRoot "tools\render-pptx-cover-fallback.py"
$fallbackDocCoverScript = Join-Path $repoRoot "tools\render-docx-cover-fallback.py"

$pinganZhCollectionName = [string]::Concat(([char]0x4EA4), ([char]0x4ED8), "PPT", ([char]0x6C47), ([char]0x603B), "_", ([char]0x4E2D), ([char]0x6587), ([char]0x8131), ([char]0x654F), ([char]0x7248), "_20260402")
$gaodunZhCollectionName = [string]::Concat(([char]0x6700), ([char]0x7EC8), ([char]0x4EA4), ([char]0x4ED8), ([char]0x6C47), ([char]0x603B), "_20260402_", ([char]0x4E2D), ([char]0x6587), ([char]0x7EC8), ([char]0x7248))
$gaodunAllPptFolderName = [string]::Concat("01_", ([char]0x5168), ([char]0x90E8), "PPT")

$bankIctFolder = Join-Path $workspaceRoot ([string]::Concat("consulting\", ([char]0x94F6), ([char]0x884C), "it", ([char]0x67B6), ([char]0x6784), ([char]0xFF0C), ([char]0x4E2D), ([char]0x6587)))
$bankCreditFlowFolder = Join-Path $workspaceRoot ([string]::Concat("consulting\", ([char]0x94F6), ([char]0x884C), ([char]0x4FE1), ([char]0x8D37), ([char]0x98CE), ([char]0x9669), ([char]0x5168), ([char]0x6D41), ([char]0x7A0B), ([char]0x8BC6), ([char]0x522B)))
$bankDueDiligenceFolder = Join-Path $workspaceRoot ([string]::Concat("consulting\", ([char]0x94F6), ([char]0x884C), ([char]0x4FE1), ([char]0x8D37), ([char]0x98CE), ([char]0x9669), ([char]0x73B0), ([char]0x573A), ([char]0x5C3D), ([char]0x8C03), ([char]0x8BC4), ([char]0x4F30), "-done"))
$aiOfficeFolder = Join-Path $workspaceRoot ([string]::Concat("consulting\AI", ([char]0x52A9), ([char]0x529B), ([char]0x804C), ([char]0x573A), ([char]0x7CBE), ([char]0x82F1), ([char]0x63D0), ([char]0x5347), ([char]0x529E), ([char]0x516C), ([char]0x6548), ([char]0x7387), "-done"))

$dayOneMarker = [string]::Concat(([char]0x7B2C), ([char]0x4E00), ([char]0x5929))
$dayTwoMarker = [string]::Concat(([char]0x7B2C), ([char]0x4E8C), ([char]0x5929))
$dayThreeMarker = [string]::Concat(([char]0x7B2C), ([char]0x4E09), ([char]0x5929))
$training15Marker = [string]::Concat("15", ([char]0x5929), ([char]0x57F9), ([char]0x8BAD), ([char]0x8BFE), ([char]0x7A0B))
$handoutMarker = [string]::Concat(([char]0x8BB2), ([char]0x4E49))
$scriptMarker = [string]::Concat(([char]0x8BB2), ([char]0x7A3F))

function Get-TrainingSequenceRank {
    param(
        [Parameter(Mandatory = $true)]
        [string]$BaseName
    )

    $lowerBaseName = $BaseName.ToLowerInvariant()
    $dayMatch = [regex]::Match($lowerBaseName, "day\s*0*(\d+)")
    if ($dayMatch.Success) {
        return [int]$dayMatch.Groups[1].Value
    }

    if ($BaseName.Contains($dayOneMarker)) {
        return 1
    }

    if ($BaseName.Contains($dayTwoMarker)) {
        return 2
    }

    if ($BaseName.Contains($dayThreeMarker)) {
        return 3
    }

    if ($BaseName.Contains($training15Marker)) {
        return 1000
    }

    if ($lowerBaseName -like "*cheatsheet*" -or $BaseName.Contains($handoutMarker)) {
        return 1001
    }

    if ($lowerBaseName -like "*handout*") {
        return 1002
    }

    if ($lowerBaseName -like "*speaker*" -or $lowerBaseName -like "*notes*" -or $lowerBaseName -like "*script*" -or $BaseName.Contains($scriptMarker)) {
        return 1003
    }

    return [int]::MaxValue
}

function Get-CollectionFiles {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Directory,
        [string[]]$Extensions = @(".pptx", ".ppt"),
        [string[]]$IncludePattern = @(),
        [string]$SortMode = "name",
        [bool]$Recursive = $false
    )

    if (-not (Test-Path -LiteralPath $Directory)) {
        throw "Input directory not found: $Directory"
    }

    $files = if ($Recursive) {
        Get-ChildItem -LiteralPath $Directory -File -Recurse
    }
    else {
        Get-ChildItem -LiteralPath $Directory -File
    }

    $normalizedExtensions = $Extensions | ForEach-Object { $_.ToLowerInvariant() }
    $files = $files | Where-Object { $_.Extension.ToLowerInvariant() -in $normalizedExtensions }

    if ($IncludePattern.Count -gt 0) {
        $files = $files | Where-Object {
            $fileName = $_.Name
            foreach ($pattern in $IncludePattern) {
                if ($fileName -like $pattern) {
                    return $true
                }
            }
            return $false
        }
    }

    if ($SortMode -eq "training-sequence") {
        return $files | Sort-Object @{ Expression = { Get-TrainingSequenceRank -BaseName $_.BaseName } }, Name
    }

    if ($SortMode -eq "numeric-first") {
        return $files | Sort-Object @{ Expression = {
                $matches = [regex]::Matches($_.BaseName, "\d+")
                if ($matches.Count -gt 0) {
                    [int]$matches[0].Value
                }
                else {
                    [int]::MaxValue
                }
            }
        }, Name
    }

    if ($SortMode -eq "numeric-last") {
        return $files | Sort-Object @{ Expression = {
                $matches = [regex]::Matches($_.BaseName, "\d+")
                if ($matches.Count -gt 0) {
                    [int]$matches[$matches.Count - 1].Value
                }
                else {
                    [int]::MaxValue
                }
            }
        }, Name
    }

    return $files | Sort-Object Name
}

function Export-FirstSlide {
    param(
        [Parameter(Mandatory = $true)]
        $PowerPoint,
        [Parameter(Mandatory = $true)]
        [string]$DeckPath,
        [Parameter(Mandatory = $true)]
        [string]$OutputPath
    )

    $presentation = $null
    try {
        $presentation = $PowerPoint.Presentations.Open($DeckPath, $true, $false, $false)
        if ($presentation.Slides.Count -lt 1) {
            throw "No slides found in $DeckPath"
        }

        $presentation.Slides.Item(1).Export($OutputPath, "PNG", 1600, 900)
    }
    finally {
        if ($presentation -ne $null) {
            $presentation.Close()
            [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation)
        }
    }
}

function Render-FallbackCover {
    param(
        [Parameter(Mandatory = $true)]
        [string]$DeckPath,
        [Parameter(Mandatory = $true)]
        [string]$OutputPath,
        [Parameter(Mandatory = $true)]
        [string]$Preset
    )

    & py $fallbackCoverScript `
        --input_file $DeckPath `
        --output_file $OutputPath `
        --preset $Preset

    if ($LASTEXITCODE -ne 0) {
        throw "Fallback cover generation failed for $DeckPath"
    }
}

function Render-DocxFallbackCover {
    param(
        [Parameter(Mandatory = $true)]
        [string]$DocumentPath,
        [Parameter(Mandatory = $true)]
        [string]$OutputPath,
        [Parameter(Mandatory = $true)]
        [string]$Preset
    )

    & py $fallbackDocCoverScript `
        --input_file $DocumentPath `
        --output_file $OutputPath `
        --preset $Preset

    if ($LASTEXITCODE -ne 0) {
        throw "Docx cover generation failed for $DocumentPath"
    }
}

$collections = @(
    @{
        Key = "financial-services-it"
        InputDir = Join-Path $workspaceRoot "pingan\output\Raccolta_PPT_Italiano_Anonimizzata_20260403"
        OutputFile = Join-Path $assetRoot "financial-services-ai-it-grid.jpg"
    },
    @{
        Key = "financial-services-en"
        InputDir = Join-Path $workspaceRoot "pingan\output\English_Sanitized_PPT_Collection_20260403"
        OutputFile = Join-Path $assetRoot "financial-services-ai-en-grid.jpg"
    },
    @{
        Key = "financial-services-zh"
        InputDir = Join-Path (Join-Path $workspaceRoot "pingan\output") $pinganZhCollectionName
        OutputFile = Join-Path $assetRoot "financial-services-ai-zh-grid.jpg"
    },
    @{
        Key = "finance-capability-it"
        InputDir = Join-Path $workspaceRoot "gaodun_codex\Archivio_Consegna_Finale_20260403_IT\01_Tutti_i_PPT"
        OutputFile = Join-Path $assetRoot "finance-capability-it-grid.jpg"
    },
    @{
        Key = "finance-capability-en"
        InputDir = Join-Path $workspaceRoot "gaodun_codex\Final_Delivery_Hub_20260403_EN\01_All_PPT"
        OutputFile = Join-Path $assetRoot "finance-capability-en-grid.jpg"
    },
    @{
        Key = "finance-capability-zh"
        InputDir = Join-Path (Join-Path (Join-Path $workspaceRoot "gaodun_codex") $gaodunZhCollectionName) $gaodunAllPptFolderName
        OutputFile = Join-Path $assetRoot "finance-capability-zh-grid.jpg"
        Columns = 5
    },
    @{
        Key = "zero-to-sota-ai-100"
        InputDir = Join-Path $workspaceRoot "consulting\ai-0-to-sota-chatgpt\Zero_to_SOTA_AI_100_Lessons_Bilingual\Zero_to_SOTA_AI_100_Lessons_Bilingual"
        IncludePattern = @("Zero_to_SOTA_AI_Lesson_*_Bilingual.pptx")
        OutputFile = Join-Path $assetRoot "zero-to-sota-ai-100-grid.jpg"
        Columns = 10
        RenderMode = "fallback"
        FallbackPreset = "ai-lessons"
        SortMode = "numeric-first"
    },
    @{
        Key = "logistics-hrbp"
        InputDir = Join-Path $workspaceRoot "consulting\hrbp-ppt-chatgpt"
        IncludePattern = @("HRBP_Logistics_*.pptx")
        OutputFile = Join-Path $assetRoot "logistics-hrbp-grid.jpg"
        Columns = 4
        RenderMode = "fallback"
        FallbackPreset = "hrbp"
        SortMode = "numeric-first"
    },
    @{
        Key = "embodied-intelligence-research"
        InputDir = Join-Path $workspaceRoot "consulting\robotics"
        OutputFile = Join-Path $assetRoot "embodied-intelligence-research-grid.jpg"
        Columns = 4
        RenderMode = "fallback"
        FallbackPreset = "robotics"
    },
    @{
        Key = "bank-ict-architecture-docs"
        InputDir = $bankIctFolder
        OutputFile = Join-Path $assetRoot "bank-ict-architecture-doc-grid.jpg"
        Columns = 5
        SourceType = "docx"
        RenderMode = "fallback"
        FallbackPreset = "bank-ict"
    },
    @{
        Key = "bank-credit-risk-full"
        InputDir = $bankCreditFlowFolder
        IncludePattern = @("*.pptx")
        OutputFile = Join-Path $assetRoot "bank-credit-risk-full-grid.jpg"
        Columns = 4
        RenderMode = "fallback"
        FallbackPreset = "credit-risk"
        SortMode = "training-sequence"
    },
    @{
        Key = "bank-credit-due-diligence"
        InputDir = $bankDueDiligenceFolder
        IncludePattern = @("*.pptx")
        OutputFile = Join-Path $assetRoot "bank-credit-due-diligence-grid.jpg"
        Columns = 5
        Recursive = $true
        RenderMode = "fallback"
        FallbackPreset = "due-diligence"
        SortMode = "training-sequence"
    },
    @{
        Key = "ai-governance-records"
        InputDir = Join-Path $workspaceRoot "consulting\20260425-safeshield-aigovernance\v2"
        IncludePattern = @("*.pptx")
        OutputFile = Join-Path $assetRoot "ai-governance-records-grid.jpg"
        Columns = 5
        Recursive = $true
        RenderMode = "fallback"
        FallbackPreset = "governance"
        SortMode = "numeric-first"
    },
    @{
        Key = "ai-office-productivity"
        InputDir = $aiOfficeFolder
        IncludePattern = @("*.pptx")
        OutputFile = Join-Path $assetRoot "ai-office-productivity-grid.jpg"
        Columns = 5
        Recursive = $true
        RenderMode = "fallback"
        FallbackPreset = "office-productivity"
        SortMode = "training-sequence"
    },
    @{
        Key = "deepseek-marketing-15day"
        InputDir = Join-Path $workspaceRoot "consulting\deepseek_15day_marketing_training_cn\daily_decks\output"
        IncludePattern = @("*.pptx")
        OutputFile = Join-Path $assetRoot "deepseek-marketing-15day-grid.jpg"
        Columns = 5
        RenderMode = "fallback"
        FallbackPreset = "ai-marketing"
        SortMode = "numeric-first"
    }
)

New-Item -ItemType Directory -Path $assetRoot -Force | Out-Null
New-Item -ItemType Directory -Path $renderRoot -Force | Out-Null

if ($Keys.Count -gt 0) {
    $collections = @($collections | Where-Object { $_.Key -in $Keys })
    if ($collections.Count -eq 0) {
        throw "No matching collection keys found."
    }
}

$requiresPowerPoint = @(
    $collections | Where-Object {
        $sourceType = if ($_.ContainsKey("SourceType")) { $_.SourceType } else { "ppt" }
        $renderMode = if ($_.ContainsKey("RenderMode")) { $_.RenderMode } else { "powerpoint" }
        $sourceType -eq "ppt" -and $renderMode -ne "fallback"
    }
).Count -gt 0

$powerPoint = $null
try {
    if ($requiresPowerPoint) {
        $powerPoint = New-Object -ComObject PowerPoint.Application
        $powerPoint.DisplayAlerts = 1
    }

    foreach ($collection in $collections) {
        $sourceType = if ($collection.ContainsKey("SourceType") -and $collection.SourceType) { $collection.SourceType } else { "ppt" }
        $sortMode = if ($collection.ContainsKey("SortMode") -and $collection.SortMode) { $collection.SortMode } else { "name" }
        $recursive = if ($collection.ContainsKey("Recursive")) { [bool]$collection.Recursive } else { $false }
        $extensions = if ($sourceType -eq "docx") { @(".docx") } else { @(".pptx", ".ppt") }
        $renderMode = if ($collection.ContainsKey("RenderMode") -and $collection.RenderMode) { $collection.RenderMode } else { "powerpoint" }
        $fallbackPreset = if ($collection.ContainsKey("FallbackPreset") -and $collection.FallbackPreset) { $collection.FallbackPreset } else { "general" }
        $numColumns = if ($collection.ContainsKey("Columns") -and [int]$collection.Columns -gt 0) { [int]$collection.Columns } else { 5 }
        $includePattern = if ($collection.ContainsKey("IncludePattern") -and $collection.IncludePattern) { $collection.IncludePattern } else { @() }

        $collectionFiles = Get-CollectionFiles -Directory $collection.InputDir -Extensions $extensions -IncludePattern $includePattern -SortMode $sortMode -Recursive $recursive
        if ($collectionFiles.Count -eq 0) {
            throw "No source files found in $($collection.InputDir)"
        }

        $coverDir = Join-Path $renderRoot $collection.Key
        New-Item -ItemType Directory -Path $coverDir -Force | Out-Null

        $exportedFiles = New-Object System.Collections.Generic.List[string]

        for ($index = 0; $index -lt $collectionFiles.Count; $index++) {
            $file = $collectionFiles[$index]
            $coverPath = Join-Path $coverDir ("cover-{0:D3}.png" -f ($index + 1))
            Write-Host ("[{0}] {1}/{2} {3}" -f $collection.Key, ($index + 1), $collectionFiles.Count, $file.Name)

            if ($sourceType -eq "docx") {
                Render-DocxFallbackCover -DocumentPath $file.FullName -OutputPath $coverPath -Preset $fallbackPreset
            }
            elseif ($renderMode -eq "fallback") {
                Render-FallbackCover -DeckPath $file.FullName -OutputPath $coverPath -Preset $fallbackPreset
            }
            else {
                try {
                    Export-FirstSlide -PowerPoint $powerPoint -DeckPath $file.FullName -OutputPath $coverPath
                }
                catch {
                    Write-Warning ("PowerPoint export failed for {0}; using fallback renderer." -f $file.Name)
                    Render-FallbackCover -DeckPath $file.FullName -OutputPath $coverPath -Preset $fallbackPreset
                }
            }

            $exportedFiles.Add($coverPath)
        }

        & py $montageScript `
            --input_files $exportedFiles.ToArray() `
            --output_file $collection.OutputFile `
            --num_col $numColumns `
            --cell_width 256 `
            --cell_height 144 `
            --gap 18 `
            --label_mode none

        if ($LASTEXITCODE -ne 0) {
            throw "Montage generation failed for $($collection.Key)"
        }
    }
}
finally {
    if ($powerPoint -ne $null) {
        try {
            $powerPoint.Quit()
        }
        catch {
            Write-Warning "PowerPoint instance was already closed before cleanup."
        }

        try {
            [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint)
        }
        catch {
            Write-Warning "PowerPoint COM object release was skipped."
        }
    }

    [gc]::Collect()
    [gc]::WaitForPendingFinalizers()
}
