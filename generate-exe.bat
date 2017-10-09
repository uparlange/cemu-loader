"%ProgramFiles%\7-Zip\7z.exe" a -t7z dist\release.7z .\dist\cemu-loader\* .\dist\nw\*
copy /b build\7zsd_All_original.sfx + build\config.txt + dist\release.7z dist\release.exe