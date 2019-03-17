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
        fs.readdirSync(targetDir).forEach(function (f) { return fs.unlinkSync(path.join(targetDir, f)); });
    }
    else {
        //create target dir
        fs.mkdirSync(targetDir);
    }
    //copy files to target dir
    fs.readdirSync(distDir).forEach(function (f) {
        copyFile(path.join(distDir, f), path.join(targetDir, f));
    });
    //create index.cshtml
    var csHtml = fs.readFileSync('dist/index.html').toString();
    csHtml = csHtml.replace(/src="/g, 'src="' + distDirInTarget + '/');
    csHtml = csHtml.replace(/href="styles/g, 'href="' + distDirInTarget + '/styles');
    fs.writeFileSync(path.join(targetProjectDir, mvcIndexFile), "@{\n      Layout = null;\n  }\n  " +
        csHtml);
    console.log("DONE!!!!!");
}
catch (error) {
    console.log(error);
    throw error;
}
function copyFile(source, target) {
    fs.createReadStream(source).pipe(fs.createWriteStream(target));
}
