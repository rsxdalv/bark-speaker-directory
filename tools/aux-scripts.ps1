# rename file *-96x96.jpg to sample.jpg in all subdirectories
Get-ChildItem -Filter sample.jpg -Recurse | ForEach-Object { 
    $newName = Join-Path -Path $_.DirectoryName -ChildPath "image.jpg"
    Move-Item -Path $_.FullName -Destination $newName
}
