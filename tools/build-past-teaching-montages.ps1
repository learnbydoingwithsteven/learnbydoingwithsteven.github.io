[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$workspaceRoot = Split-Path $repoRoot -Parent
$assetRoot = Join-Path $repoRoot "assets\past-teaching"
$renderRoot = Join-Path $repoRoot "output\past-teaching"
$montageScript = "C:\Users\wjbea\.codex\skills\slides\scripts\create_montage.py"
$pinganZhCollectionName = [string]::Concat(([char]0x4EA4), ([char]0x4ED8), "PPT", ([char]0x6C47), ([char]0x603B), "_", ([char]0x4E2D), ([char]0x6587), ([char]0x8131), ([char]0x654F), ([char]0x7248), "_20260402")
$gaodunZhCollectionName = [string]::Concat(([char]0x6700), ([char]0x7EC8), ([char]0x4EA4), ([char]0x4ED8), ([char]0x6C47), ([char]0x603B), "_20260402_", ([char]0x4E2D), ([char]0x6587), ([char]0x7EC8), ([char]0x7248))
$gaodunAllPptFolderName = [string]::Concat("01_", ([char]0x5168), ([char]0x90E8), "PPT")

function Get-PptFiles {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Directory
    )

    if (-not (Test-Path -LiteralPath $Directory)) {
        throw "Input directory not found: $Directory"
    }

    return Get-ChildItem -LiteralPath $Directory -File |
        Where-Object { $_.Extension -in ".pptx", ".ppt" } |
        Sort-Object Name
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

$collections = @(
    @{
        Key = "pingan-it"
        Project = "Ping An"
        InputDir = Join-Path $workspaceRoot "pingan\output\Raccolta_PPT_Italiano_Anonimizzata_20260403"
        OutputFile = Join-Path $assetRoot "pingan-it-first-slide-grid.jpg"
    },
    @{
        Key = "pingan-en"
        Project = "Ping An"
        InputDir = Join-Path $workspaceRoot "pingan\output\English_Sanitized_PPT_Collection_20260403"
        OutputFile = Join-Path $assetRoot "pingan-en-first-slide-grid.jpg"
    },
    @{
        Key = "pingan-zh"
        Project = "Ping An"
        InputDir = Join-Path (Join-Path $workspaceRoot "pingan\output") $pinganZhCollectionName
        OutputFile = Join-Path $assetRoot "pingan-zh-first-slide-grid.jpg"
    },
    @{
        Key = "gaodun-codex-it"
        Project = "Gaodun Codex"
        InputDir = Join-Path $workspaceRoot "gaodun_codex\Archivio_Consegna_Finale_20260403_IT\01_Tutti_i_PPT"
        OutputFile = Join-Path $assetRoot "gaodun-codex-it-first-slide-grid.jpg"
    },
    @{
        Key = "gaodun-codex-en"
        Project = "Gaodun Codex"
        InputDir = Join-Path $workspaceRoot "gaodun_codex\Final_Delivery_Hub_20260403_EN\01_All_PPT"
        OutputFile = Join-Path $assetRoot "gaodun-codex-en-first-slide-grid.jpg"
    },
    @{
        Key = "gaodun-codex-zh"
        Project = "Gaodun Codex"
        InputDir = Join-Path (Join-Path (Join-Path $workspaceRoot "gaodun_codex") $gaodunZhCollectionName) $gaodunAllPptFolderName
        OutputFile = Join-Path $assetRoot "gaodun-codex-zh-first-slide-grid.jpg"
    }
)

New-Item -ItemType Directory -Path $assetRoot -Force | Out-Null
New-Item -ItemType Directory -Path $renderRoot -Force | Out-Null

$powerPoint = $null
try {
    $powerPoint = New-Object -ComObject PowerPoint.Application
    $powerPoint.DisplayAlerts = 1

    foreach ($collection in $collections) {
        $pptFiles = Get-PptFiles -Directory $collection.InputDir
        if ($pptFiles.Count -eq 0) {
            throw "No PowerPoint files found in $($collection.InputDir)"
        }

        $coverDir = Join-Path $renderRoot $collection.Key
        New-Item -ItemType Directory -Path $coverDir -Force | Out-Null

        $exportedFiles = New-Object System.Collections.Generic.List[string]

        for ($index = 0; $index -lt $pptFiles.Count; $index++) {
            $deck = $pptFiles[$index]
            $coverPath = Join-Path $coverDir ("cover-{0:D3}.png" -f ($index + 1))
            Write-Host ("[{0}] {1}/{2} {3}" -f $collection.Key, ($index + 1), $pptFiles.Count, $deck.Name)
            Export-FirstSlide -PowerPoint $powerPoint -DeckPath $deck.FullName -OutputPath $coverPath
            $exportedFiles.Add($coverPath)
        }

        & py $montageScript `
            --input_files $exportedFiles.ToArray() `
            --output_file $collection.OutputFile `
            --num_col 5 `
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
