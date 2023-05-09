!#/bin/bash
# rename file *-96x96.jpg to sample.jpg
for i in *-96x96.jpg; do mv $i sample.jpg; done

# rename file *-96x96.jpg to sample.jpg iu all subdirectories
Get-ChildItem -Filter *-96x96.jpg | ForEach-Object { Move-Item $_ sample.jpg }
