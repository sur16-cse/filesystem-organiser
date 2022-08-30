#!/usr/bin/env node
let helpObj=require("./commands/help/help.js")
let organiseObj=require("./commands/organise/organise.js")
let treeObj=require("./commands/tree/tree")

//take input from command line 
let input=process.argv.slice(2);

//              0th          1st
//node file.js  tree "directory path"
//node main.js organise "directory path"
//node main.js help

let command=input[0];
switch(command){
    case "tree":
        treeObj.treeKey(input[1])
        break;
    case "organise":
        organiseObj.organiseKey(input[1])
        break;
    case "help":
        helpObj.helpKey()
        break;
    default:
        console.log("please input right command")
        break;
}