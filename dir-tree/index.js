//目录树分析
//获取目标文件夹的目录内容
//将文件或者文件夹进行划分
//将文件或者文件夹进行打印 命令行console.log()
//文件夹在次遍历 deep1  ┣━  deep2  ┃ ┣━  deep3 ┃  ┃  ┣━
//打印当前目录树

const fs=require('fs');
const path=require('path');
//目标目录 是一个绝对路径

let target=path.join(__dirname,'../');


function loadTree(target,deep){
    //可以选择使用for循环 join的用法将数组准换成字符创并以 | 分割
    let prev=new Array(deep).join(' ┃');
    let dirinfo=fs.readdirSync(target);
    //保存文件或者是文件夹
    let files=[];
    let dirs=[];

//遍历将文件或者文件夹分开存储
for(let i = 0;i < dirinfo.length; i++){
    let state=fs.statSync(path.join(target,dirinfo[i]));
    if(state.isFile()){
        if(dirinfo[i].indexOf(".js")>-1){
          files.push(dirinfo[i])
        }
    }else{
        if(dirinfo[i]!=".cache"&&dirinfo[i]!="dist"&&dirinfo[i]!="node_modules"&&dirinfo[i]!=".git"){
           dirs.push(dirinfo[i])
        }
    }
}

//对文件夹进行操作
for(let i = 0;i < dirs.length; i++){
    console.log(`${prev} ┣━ ${dirs[i]}`);
    //下一级的文件目录 以及层级
    let nextPath=path.join(target,dirs[i]);
    let nextDeep=deep+1;
    //递归
    loadTree(nextPath,nextDeep);
}

//文件操作
var content ="";
for(let i = files.length-1; i >= 0; i--){
    if(i===0){
        console.log(`${prev} ┗━ ${files[i]}`);
    }else{
        console.log(`${prev} ┣━ ${files[i]}`);
    }
}
}

module.exports  = loadTree(target,1);