import React,{ useState,useEffect} from 'react'
import {Input, Upload, message, Button, Icon, Radio} from 'antd/lib/index';
import axios from "axios/index"
import Avatar from "../../avatar"
const { TextArea } = Input;



const UploadArticle = function (props) {
    const [img,setImg] = useState('');
    const [md,setMd] = useState('');
    const [title,setTitle] = useState('');
    const [intro,setIntro] = useState('');
    const [cls,setCls] = useState('tec');


    const uploadProps = {
        name: 'file',
        accept:'.md',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const f = new FileReader();
                f.readAsDataURL(info.file.originFileObj);
                f.onload = function(){
                    setMd(f.result.split(',')[1])
                };
            }else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const handIn= async ()=>{
        if(!img || !md || !title || !intro || !cls){
            return message.error('输入不能为空')
        }
        const res = await axios.post('/article-backend/upload',{img,md,title,intro,cls});
        if(res.status===200&&res.data.code===0){
            message.success('上传文章成功')
            props.setDetail('')
        }else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }
    return (
        <>
            <Upload {...uploadProps}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
            <p>注意原图必须是png,否则无法显示</p>
            <Avatar setImg={v=>setImg(v.split(',')[1])}/>
            <Radio.Group onChange={v=>setCls(v.target.value)} value={cls}>
                <Radio value={'tec'}>技术</Radio>
                <Radio value={'life'}>随笔</Radio>
            </Radio.Group>
            <Input placeholder={'标题'} onChange={t=>setTitle(t.target.value)}/>
            <TextArea rows={4} placeholder={'简介'} onChange={t=>setIntro(t.target.value)}/>
            <Button onClick={()=>handIn()}>提交</Button>
        </>
        )
};


export default UploadArticle;