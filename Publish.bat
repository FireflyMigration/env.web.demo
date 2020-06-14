@REM if msbuild command is recognized go to build, otherwise setup build vars

@set buildType=Debug
if  "%1" == "release" @set buildType=Release
@set logFileType=%buildType%
if "%2" == "/t:clean" @set logFileType=clean

@where /q msbuild && goto build
@goto set_build_vars



:set_build_vars
@echo setting up the build vars...
@set _programFiles=%ProgramFiles%
@if defined ProgramFiles(x86) set _programFiles=%ProgramFiles(x86)%

@REM first, check if visual studio 2017 exist and build with it
@set _msbuild_location=%_programFiles%\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\
@if exist "%_msbuild_location%" @set PATH=%_msbuild_location%;%PATH% && goto build

@set _msbuild_location=%_programFiles%\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\
@if exist "%_msbuild_location%" @set PATH=%_msbuild_location%;%PATH% && goto build

@set _msbuild_location=%_programFiles%\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\
@if exist "%_msbuild_location%" @set PATH=%_msbuild_location%;%PATH% && goto build

@REM second, check if MSBuild exist and build with it
@set _msbuild_location=%_programFiles%\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin\
@if exist "%_msbuild_location%" @set PATH=%_msbuild_location%;%PATH% && goto build

@set _msbuild_location=%_programFiles%\MSBuild\14.0\bin\
@if exist "%_msbuild_location%" @set PATH=%_msbuild_location%;%PATH% && goto build

@REM last, check if any older version of visual studio exist and build with it
@if exist "%VS140COMNTOOLS%" @call "%VS140COMNTOOLS%\vsvars32.bat" && goto build
@if exist "%VS120COMNTOOLS%" @call "%VS120COMNTOOLS%\vsvars32.bat" && goto build
@if exist "%VS110COMNTOOLS%" @call "%VS110COMNTOOLS%\vsvars32.bat" && goto build
@if exist "%VS100COMNTOOLS%" @call "%VS100COMNTOOLS%\vsvars32.bat" && goto build

@REM error -  not found
@echo  ERROR: Cannot determine the location of MSBuild. Please make sure Visual Studio or MSBuild is installed.
@exit /B 1

:build

msbuild webdemo\webdemo.csproj /filelogger1 /fileloggerparameters1:logfile=buildDebug.log;append;verbosity=n /p:Configuration=Debug;DeployOnBuild=True;PackageAsSingleFile=False
XCOPY webdemo\Obj\Debug\Package\PackageTmp Publish\web\*.* /y /s
xcopy bin\*.* publish\bin\*.* /y/s
xcopy frontend\dist\fonts\*.* publish\web\fonts\*.* /y/s
xcopy frontend\dist\assets\*.* publish\web\assets\*.* /y/s
xcopy webdemo\views\*.* publish\web\views\*.* /y/s
xcopy webdemo\scripts\ngapp\*.* publish\web\scripts\ngapp\*.*