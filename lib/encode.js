//new buffer的用法因为安全性已被删除，使用buffer.from

//可解码dataURL格式的file文件
function base64ToString(base64Str){
    return Buffer.from(base64Str,'base64').toString();
}

//可解码dataURL格式的pic文件
let dataBuffer = Buffer.from(img, 'base64');
// fs.writeFile(picPath,dataBuffer,function (err) {
//     if(err){
//         e=err
//         console.log(err);
//     }else {
//         console.log("写入成功");
//     }
// })