const utility=require("../../utility")
let fs=require("fs");
let path = require("path");
let readline = require('readline');
function organiseFun(dirPath){
    //console.log("Organise command implemented for",dirPath)
    
    //1. input-> directory path given
    let destinationPath;
        if(dirPath===undefined)
        {
            // console.log("kindly please enter the path");
            //to make it global i.e, work for current working directory show organise folder of current directory
            destinationPath=process.cwd()
            return;
        }
        else{
            let doesExist=fs.existsSync(dirPath)
                    if(doesExist){
                        //2. create -> organised files -> directory
                    destinationPath=path.join(dirPath,"organised_files")
                    if(fs.existsSync(destinationPath)==false){
                        fs.mkdirSync(destinationPath)
                    }
            }
            else{
                console.log("kindly please enter the path");
                return;
            }
        }

    let temp=[]
    organiserHelper(dirPath,destinationPath,temp)

    //ask input from user to procees further for cut files from original location
     console.log("are you want to cut all files from original folder that is copy in organised_folder")
     const rl = readline.createInterface({input: process.stdin, output: process.stdout});
     
     rl.question('Press [Y] to continue or any key for stop:', ans => {
         if (ans == 'y' || ans=='Y') cutFiles(temp);
         else console.log('i will not continue');
         rl.close();
     });
}

function organiserHelper(sourcePath,destinationPath,temp=[]){
    let childNames=fs.readdirSync(sourcePath);
   // console.log(childNames)

     //3. identifies categories of all the files present in that directory
     for(let i=0;i<childNames.length;i++){
        //get address of each file so that pick file and organise 
        let childAddress=path.join(sourcePath,childNames[i]);
        //check childadress path is of file or folder
        let isDir=fs.lstatSync(childAddress).isDirectory();
        if(isDir){
            if(childNames[i]!='node_modules'){  
             organiserHelper(childAddress,destinationPath,temp)
            }
        }
        else{
           //console.log(childNames[i]);
           //4. copy/cut files to that organised directory inside of any of category folder
            let category=getCategory(childNames[i])
            temp.push(childAddress)
            //console.log(childNames[i],"belongs to --->",category)
            //console.log(childAddress+"  ---- srcpath");
            //console.log(destinationPath+"  --- destPath")
            sendFiles(childAddress,destinationPath,category)
        }
     }
    
}

function sendFiles(srcPath,destPath,cate){
    //check category path exist or not if not then create 
    let categroryPath=path.join(destPath,cate);
    if(fs.existsSync(categroryPath)==false)
    fs.mkdirSync(categroryPath)
    //source file path
    let fileName=path.basename(srcPath);
    //console.log(fileName)
    let destinationPath=path.join(categroryPath,fileName)
    fs.copyFileSync(srcPath,destinationPath)
}

function cutFiles(temp){
    temp.forEach(file => {
        fs.unlinkSync(file)
    });
}

function getCategory(name){
    //return path extension
   let extension= path.extname(name).slice(1)
    //console.log(extension);
    // utility file
    let types=utility.types
    //find extension matches to utility file
    for(let type in types){
       let currentType=types[type]
       for(let i=0;i<currentType.length;i++){
        if(extension==currentType[i])
        return type;
       }
    }
    //if no extension matches then return others
    return  "others"
}

module.exports={
    organiseKey:organiseFun
}