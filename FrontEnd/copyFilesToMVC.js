"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var distDir = 'dist';
var targetProjectDir = '../WebDemo';
var distDirInTarget = 'Scripts/NGApp';
var mvcIndexFile = 'views/home/index.cshtml';
var targetDir = path.join(targetProjectDir, distDirInTarget);
try {
    if (fs.existsSync(targetDir)) {
        //delete existing files in target dir
        fs.readdirSync(targetDir).forEach(function (f) {
            let fileName = path.join(targetDir, f);
            if (!fs.lstatSync(fileName).isDirectory())
                fs.unlinkSync(fileName);
        });
    }
    else {
        //create target dir
        fs.mkdirSync(targetDir);
    }
    //create index.cshtml
    var csHtml = fs.readFileSync('dist/index.html').toString();
    csHtml = csHtml.replace(/src="/g, 'src="' + distDirInTarget + '/');
    csHtml = csHtml.replace(/href="styles/g, 'href="' + distDirInTarget + '/styles');

    fs.writeFileSync(path.join(targetProjectDir, mvcIndexFile), "\ufeff@{\r\n   Layout = null;\r\n}\r\n" +
        csHtml.replace(/@/gm,"@@"));
    //copy files to target dir
    fs.readdirSync(distDir).forEach(function (f) {
        let fileName = path.join(distDir, f);
        if (!fs.lstatSync(fileName).isDirectory())
            copyFile(fileName, path.join(targetDir, f));
    });

    console.log("DONE!!!!!");
}
catch (error) {
    console.log(error);
    throw error;
}
function copyFile(source, target) {
    fs.copyFileSync(source, target);
}
