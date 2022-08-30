var fs = require("fs");
let path = require("path");
function treeFun(dirPath){
    //console.log("Tree command implemented for",dirPath)
        if(dirPath===undefined)
        {
            // console.log("kindly please enter the path");
            //to make it global i.e, work for current working directory show tree of current directory
            treeHelper(process.cwd(), "")
            return;
        }
        else{
            let doesExist=fs.existsSync(dirPath)
            if(doesExist){
                treeHelper(dirPath, "")
            }
            else{
                console.log("kindly please enter the path");
                return;
            }
        }
}

 function treeHelper(src,indent){
    //check src is file pr folder
    let isDir=fs.lstatSync(src).isDirectory()
    // if file then simply show in console
    if(isDir==true){
        let dirName=path.basename(src);
        console.log(indent+ "└──" + dirName)
        //check folders file 
        let childrens=fs.readdirSync(src);
       
        //structure tree of folder path
        for(let i=0;i<childrens.length;i++){
            //console.log(src,childrens[i],childrens.length)
           let childPath= path.join(src,childrens[i])
            treeHelper(childPath, String(indent + "\t"))
        }
    }
    //else folder with indent print 
    else{
        let fileName=path.basename(src)
        console.log(indent+ "├──" + fileName)
    }
}

module.exports={
    treeKey:treeFun
}