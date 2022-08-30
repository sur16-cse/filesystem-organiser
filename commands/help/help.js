function helpFun(){
    console.log(`
    List of all the commands:
            node file.js  tree "directory path"
            node file.js organise "directory path"
            node file.js --help
            `
    )
}

module.exports={
    helpKey:helpFun
}
