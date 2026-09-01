Add-Type -AssemblyName System.Drawing

$imgPath = "d:\NEXORA\frontend\public\assets\nexora_logo.jpg"
$outPath = "d:\NEXORA\frontend\public\assets\nexora_logo.png"

$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
$width = $bmp.Width
$height = $bmp.Height

# Create an output bitmap with ARGB
$outBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Copy original image pixels into outBmp
for ($x = 0; $x -lt $width; $x++) {
    for ($y = 0; $y -lt $height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        $outBmp.SetPixel($x, $y, $c)
    }
}
$bmp.Dispose()

# Threshold function for background white/light pixels
function IsLightBg($color) {
    return ($color.R -gt 210 -and $color.G -gt 210 -and $color.B -gt 210)
}

# BFS Flood Fill starting from image edges
$visited = New-Object 'bool[,]' $width, $height
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Add border pixels to queue
for ($x = 0; $x -lt $width; $x++) {
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $queue.Enqueue((New-Object System.Drawing.Point($x, $height - 1)))
}
for ($y = 0; $y -lt $height; $y++) {
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $queue.Enqueue((New-Object System.Drawing.Point($width - 1, $y)))
}

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $px = $pt.X
    $py = $pt.Y

    if ($px -lt 0 -or $px -ge $width -or $py -lt 0 -or $py -ge $height) { continue }
    if ($visited[$px, $py]) { continue }
    $visited[$px, $py] = $true

    $c = $outBmp.GetPixel($px, $py)

    if (IsLightBg $c) {
        # Calculate anti-alias alpha transition near edges
        $brightness = ($c.R + $c.G + $c.B) / 3.0
        if ($brightness -gt 240) {
            $outBmp.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Smooth feather alpha for edge pixels
            $alpha = [int](255 * (240 - $brightness) / 30.0)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $outBmp.SetPixel($px, $py, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        }

        # Add 4-directional neighbors
        if ($px + 1 -lt $width) { $queue.Enqueue((New-Object System.Drawing.Point($px + 1, $py))) }
        if ($px - 1 -ge 0) { $queue.Enqueue((New-Object System.Drawing.Point($px - 1, $py))) }
        if ($py + 1 -lt $height) { $queue.Enqueue((New-Object System.Drawing.Point($px, $py + 1))) }
        if ($py - 1 -ge 0) { $queue.Enqueue((New-Object System.Drawing.Point($px, $py - 1))) }
    }
}

# Also flood fill any inner enclosed background pockets (e.g. inside the O hexagon circuit loop if light background)
# Save output PNG
$outBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()
Write-Host "Flood fill background removal finished successfully!"
