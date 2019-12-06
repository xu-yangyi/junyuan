import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import { Table, Button,message,Input,Modal } from 'antd';

const { confirm } = Modal;
const { Column } = Table;



const Topics = function (props) {
    const [topics,setTopics] = useState('')
    const [add,setAdd] = useState('')
    const [alter,setAlter] = useState('')
    //显示修改栏，用于修改信息
    const [showAlter,setShowAlter] = useState(false)
    //Modal需要单独的一个，多余的会重叠导致每次修改必定修改的为最后一个，此处的Info记录了正在修改的主题信息
    const [alterInfo,setAlterInfo] = useState([])

    function showAddConfirm() {
        const addTopic = async ()=>{
            return await axios.post('/topics/add',{add})
        }
        confirm({
            title: `你确定要上传主题：${add}吗？`,
            onOk() {
                addTopic().then((res)=>{
                    if(res.data.code===0&&res.status===200){
                        message.success('添加主题成功')
                        return getTopics()
                    }
                    return message.error('添加主题失败')
                },()=>message.error('服务器出错！'))
            },
            onCancel() {},
        });
    }
    function showDelConfirm(tp) {
        const delTopic = async (id)=>{
            return await axios.post('/topic/delete',{tp})
        }
        confirm({
            title: `你确定要删除主题：${tp}吗？`,
            onOk() {
                delTopic().then((res)=>{
                    if(res.data.code===0&&res.status===200){
                        message.success('删除主题成功')
                        return getTopics()
                    }
                    return message.error('删除主题失败')
                },()=>message.error('服务器出错！'))
            },
            onCancel() {},
        });
    }
    function handleOk(id){
        const altTopic = async ()=>{
            return await axios.post('/topic/alter',{id,alter})
        }
        altTopic().then((res)=>{
            if(res.data.code===0&&res.status===200){
                message.success('修改主题成功')
                setShowAlter(false)
                return getTopics()
            }
            return message.error('修改主题失败')
        },()=>message.error('服务器出错！'))
    }
    const getTopics = async()=> {
        const res = await axios.post('/topics/getAll')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取主题列表成功')
            setTopics(res.data.data)
        } else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }

    useEffect(()=>{
        getTopics()
    },[])

    return(
        <>
            <Button onClick={showAddConfirm}>添加主题</Button>
            <Input placeholder="请输入待添加的主题"
                   style={{width:200,display:'inline-block'}}
                   onChange={v=>{setAdd(v.target.value)}}/>
            <Table dataSource={topics}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="topic" dataIndex="topic" key="topic" />
                <Column title="articles" dataIndex="articles" key="articles" />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <span>
                            <a onClick={()=>{setAlterInfo({id:record.id, articles:record.articles});setShowAlter(true)}}>修改</a>
                            <br/>
                            <a onClick={()=>showDelConfirm(record.topic)}>删除</a>
                        </span>
                    )}
                />
            </Table>
            <Modal
                visible={showAlter}
                onOk={()=>handleOk(alterInfo.id)}
                onCancel={()=>setShowAlter(false)}
            >
                <Input style={{width:400}} placeholder={`${alterInfo.articles}`} onChange={v=>{setAlter(v.target.value)}}/>
            </Modal>
        </>
    )
};


export default Topics;