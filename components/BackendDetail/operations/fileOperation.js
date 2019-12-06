import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {message, Button, List, Modal, Input, Upload, Icon} from 'antd';
import path from 'path'

const FileOperation = function (props) {
    const [presentDir,setPresentDir] = useState('public')
    const [dirArr,setDirArr] = useState([])
    const [newDir,setNewDir] = useState('')
    const [show,setShow] = useState('')
    const [upFile,setUpFile] = useState()
    const [upFileName,setUpFileName] = useState()


    const getDir=async (filename)=>{
        if(filename==='.'){
            return message.warning('已经是可达根目录')
        }

        let res = await axios.post('/operations/file_operation/read_dir',{ filename:filename })
        if(res.status===200 && res.data.code===0){
            setDirArr(res.data.l)
            return setPresentDir(filename)
        }
        message.error('操作失败！')
        return props.setDetail('')
    }
    const CdDir=async (name)=>{
        if(name.toString().indexOf('.')>-1){
            return message.warning(`${name}是文件，不可进入`)
        }
        getDir(path.join(presentDir,name))
    }
    const createDir= async ()=>{
        let dirName = path.join(presentDir,`./${newDir}`)
        let res = await axios.post('/operations/file_operation/mk_dir',{ dirName:dirName })
        if(res.status===200 && res.data.code===0){
            getDir(presentDir)
            return setShow('')
        }
        message.error('操作失败！')
        return props.setDetail('')
    }
    const uploadFile= async ()=>{
        let fName = path.join(presentDir,upFileName)
        let res = await axios.post('/operations/file_operation/upload_file',{ f:upFile,fName:fName})
        if(res.status===200 && res.data.code===0){
            getDir(presentDir)
            return setShow('')
        }
        message.error('操作失败！')
        return props.setDetail('')
    }
    const removeFile= async (name)=>{
        let fName = path.join(presentDir,`./${name}`)
        let res = await axios.post('/operations/file_operation/rm_dir',{ fName:fName })
        if(res.status===200 && res.data.code===0){
            message.success('操作成功')
            return getDir(presentDir)
        }
        message.error('操作失败！')
        return props.setDetail('')
    }
    useEffect(()=>{
        getDir(presentDir)
    },[])

    const uploadProps = {
        name: 'file',
        accept:'.md,.jpg,.png',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const f = new FileReader();
                f.readAsDataURL(info.file.originFileObj);
                f.onload = function(){
                    setUpFile(f.result.split(',')[1])
                };
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return(
        <>
            <div id="wrapper">
                <div id="header">
                    <span>当前目录：{presentDir}</span>
                    <span id={"btn"}>
                        <span style={{cursor:'pointer'}} onClick={()=>getDir(path.dirname(presentDir))}>返回上层</span>　　　
                        <span style={{cursor:'pointer'}} onClick={()=>setShow('dir')}>新建文件夹</span>　　　
                        <span style={{cursor:'pointer'}} onClick={()=>setShow('file')}>上传文件</span>
                    </span>
                </div>
                <List
                    size="small"
                    bordered
                    dataSource={dirArr}
                    renderItem={item =>
                        <List.Item
                            key={item}
                        >
                        <span style={{display:'inline-block',width:'95%',cursor:'pointer'}} onClick={()=>{CdDir(item)}}>{item}</span>
                        <a
                            style={{cursor:'pointer'}}
                            onClick={()=>{removeFile(item)}}>删除</a>
                        </List.Item>
                    }
                    style={{backgroundColor:'white'}}
                />
                <Modal
                    title="新建文件夹"
                    visible={show==='dir'}
                    onOk={createDir}
                    onCancel={()=>setShow('')}>
                    <p>输入新文件夹名称，不要与public、img等重要目录重名：</p>
                    <Input onChange={v=>setNewDir(v.target.value)}/>
                </Modal>
                <Modal
                    title="上传文件"
                    visible={show==='file'}
                    onOk={uploadFile}
                    onCancel={()=>setShow('')}>
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload" />点击上传
                        </Button>
                    </Upload>
                    <p>输入新文件名称（包括后缀）：</p>
                    <Input onChange={v=>setUpFileName(v.target.value)}/>
                </Modal>
            </div>
            <style jsx>{`
                #wrapper{
                    width:100%;
                    margin:0 auto;
                }
                #header{
                    width:100%;
                    padding:7px 14px;
                    background-color:#333;
                    border-radius:4px 4px 0 0 ;
                    color:white;
                    font-size:16px;
                }
                #btn{
                    float:right;
                }
            `}</style>
        </>
    )
};


export default FileOperation;