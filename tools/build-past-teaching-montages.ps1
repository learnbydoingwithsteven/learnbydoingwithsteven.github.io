[CmdletBinding()]
param(
    [string[]]$Keys = @()
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$workspaceRoot = Split-Path $repoRoot -Parent
$assetRoot = Join-Path $repoRoot "assets\past-teaching"
$renderRoot = Join-Path $repoRoot "output\past-teaching"
$montageScript = "C:\Users\wjbea\.codex\skills\slides\scripts\create_montage.py"
$fallbackCoverScript = Join-Path $repoRoot "tools\render-pptx-cover-fallback.py"
$pinganZhCollectionName = [string]::Concat(([char]0x4EA4), ([char]0x4ED8), "PPT", ([char]0x6C47), ([char]0x603B), "_", ([char]0x4E2D), ([char]0x6587), ([char]0x8131), ([char]0x654F), ([char]0x7248), "_20260402")
$gaodunZhCollectionName = [string]::Concat(([char]0x6700), ([char]0x7EC8), ([char]0x4EA4), ([char]0x4ED8), ([char]0x6C47), ([char]0x603B), "_20260402_", ([char]0x4E2D), ([char]0x6587), ([char]0x7EC8), ([char]0x7248))
$gaodunAllPptFolderName = [string]::Concat("01_", ([char]0x5168), ([char]0x90E8), "PPT")

function Get-PptFiles {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Directory,
        [string[]]$IncludePattern = @(),
        [string]$SortMode = "name"
    )

    if (-not (Test-Path -LiteralPath $Directory)) {
        throw "Input directory not found: $Directory"
    }

    $files = Get-ChildItem -LiteralPath $Directory -File |
        Where-Object { $_.Extension -in ".pptx", ".ppt" }

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

    if ($SortMode -eq "numeric-last") {
        return $files | Sort-Object `
            @{ Expression = {
                    $matches = [regex]::Matches($_.BaseName, "\d+")
                    if ($matches.Count -gt 0) {
                        [int]$matches[$matches.Count - 1].Value
                    }
                    else {
                        [int]::MaxValue
                    }
                }
            }, `
            Name
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
        SortMode = "numeric-last"
    },
    @{
        Key = "logistics-hrbp"
        InputDir = Join-Path $workspaceRoot "consulting\hrbp-ppt-chatgpt"
        IncludePattern = @("HRBP_Logistics_*.pptx")
        OutputFile = Join-Path $assetRoot "logistics-hrbp-grid.jpg"
        Columns = 4
        RenderMode = "fallback"
        FallbackPreset = "hrbp"
        SortMode = "numeric-last"
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
        -not ($_.ContainsKey("RenderMode") -and $_.RenderMode -eq "fallback")
    }
).Count -gt 0

$powerPoint = $null
try {
    if ($requiresPowerPoint) {
        $powerPoint = New-Object -ComObject PowerPoint.Application
        $powerPoint.DisplayAlerts = 1
    }

    foreach ($collection in $collections) {
        $sortMode = "name"
        if ($collection.ContainsKey("SortMode") -and $collection.SortMode) {
            $sortMode = $collection.SortMode
        }

        $pptFiles = Get-PptFiles -Directory $collection.InputDir -IncludePattern $collection.IncludePattern -SortMode $sortMode
        if ($pptFiles.Count -eq 0) {
            throw "No PowerPoint files found in $($collection.InputDir)"
        }

        $numColumns = 5
        if ($collection.ContainsKey("Columns") -and [int]$collection.Columns -gt 0) {
            $numColumns = [int]$collection.Columns
        }

        $renderMode = "powerpoint"
        if ($collection.ContainsKey("RenderMode") -and $collection.RenderMode) {
            $renderMode = $collection.RenderMode
        }

        $fallbackPreset = "general"
        if ($collection.ContainsKey("FallbackPreset") -and $collection.FallbackPreset) {
            $fallbackPreset = $collection.FallbackPreset
        }

        $coverDir = Join-Path $renderRoot $collection.Key
        New-Item -ItemType Directory -Path $coverDir -Force | Out-Null

        $exportedFiles = New-Object System.Collections.Generic.List[string]

        for ($index = 0; $index -lt $pptFiles.Count; $index++) {
            $deck = $pptFiles[$index]
            $coverPath = Join-Path $coverDir ("cover-{0:D3}.png" -f ($index + 1))
            Write-Host ("[{0}] {1}/{2} {3}" -f $collection.Key, ($index + 1), $pptFiles.Count, $deck.Name)
            if ($renderMode -eq "fallback") {
                Render-FallbackCover -DeckPath $deck.FullName -OutputPath $coverPath -Preset $fallbackPreset
            }
            else {
                try {
                    Export-FirstSlide -PowerPoint $powerPoint -DeckPath $deck.FullName -OutputPath $coverPath
                }
                catch {
                    Write-Warning ("PowerPoint export failed for {0}; using fallback renderer." -f $deck.Name)
                    Render-FallbackCover -DeckPath $deck.FullName -OutputPath $coverPath -Preset $fallbackPreset
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
        $powerPoint.Quit()
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint)
    }
    [gc]::Collect()
    [gc]::WaitForPendingFinalizers()
}
