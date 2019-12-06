const fs = require('fs');

function write(path,data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve()
        });
    })
}

function read(dir){
    return new Promise((resolve,reject)=>{
        fs.readFile(dir,'utf-8',(err,data)=>{
            if(err){
                reject(console.log(err))
            }else{
                resolve(data)
            }
        })
    })
}
function deleteFile(path) {
    console.log(path)
    if (fs.existsSync(path)&&(!fs.statSync(path).isDirectory())){
        return fs.unlinkSync(path)
    }

    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFile(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports={write,read,deleteFile}