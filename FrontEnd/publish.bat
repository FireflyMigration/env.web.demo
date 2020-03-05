set targetPath=..\..\WebPublish\
rem npm run build
set path=%ProgramFiles(x86)%\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\;%PATH%
msbuild webdemo\webdemo.csproj /p:DeployOnBuild=true /p:PublishProfile=FolderProfile
xcopy ..\webdemo\Views\Home\index.cshtml %targetPath%web\Views\Home\*.* /s/y
xcopy ..\webdemo\assets\*.* %targetPath%web\assets\*.* /s/y
xcopy ..\webdemo\scripts\*.* %targetPath%web\scripts\*.* /s/y
xcopy ..\webdemo\fonts\*.* %targetPath%web\fonts\*.* /s/y
xcopy ..\bin\*.* %targetPath%bon\*.* /s /y