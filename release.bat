"%ProgramFiles%\7-Zip\7z.exe" a -t7z "dist\release.7z" .\dist\cemu-loader\* .\dist\nw\*
copy /b 7zsd_All_original.sfx + config.txt + "dist\release.7z" "dist\release.exe"