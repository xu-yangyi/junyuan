import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import { Table,message } from 'antd';
const { Column } = Table;



const UserMsg = function (props) {
    const [msg,setMsg] = useState()

    const getMsg = async()=> {
        const res = await axios.post('/operations/getMsg')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取留言成功')
            setMsg(res.data.data)
        } else {
            message.error('获取留言失败！');
            props.setDetail('')
        }
    }

    async function handleOk(oId){
        const res = await axios.post('/operations/msgCheck',{order:'read',oId:oId})
        if (res.status === 200 && res.data.code === 0) {
            message.success('操作成功')
            getMsg()
        } else {
            message.error('系统出错，操作失败');
            props.setDetail('')
        }
    }
    async function handleDel(oId){
        const res = await axios.post('/operations/msgCheck',{order:'del',oId:oId})
        if (res.status === 200 && res.data.code === 0) {
            message.success('留言删除成功')
            getMsg()
        } else {
            message.error('系统出错，操作失败');
            props.setDetail('')
        }
    }
    useEffect(()=>{
        getMsg()
    },[])

    return(
        <>
            <Table dataSource={msg}>
                <Column title="o_id" dataIndex="o_id" key="o_id" />
                <Column title="user" dataIndex="user" key="user" />
                <Column title="action" dataIndex="action" key="action" />
                <Column title="target" dataIndex="target" key="target" />
                <Column title="o_time" dataIndex="o_time" key="o_time" />
                <Column title="msg" dataIndex="msg" key="msg" />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <span>
                            {record.target===0?
                                <>
                                <span onClick={()=>{handleOk(record.o_id)}}>朕已阅</span>
                                <br/>
                                </>
                                :null}
                            <span onClick={()=>handleDel(record.o_id)}>删除</span>
                        </span>
                    )}
                />
            </Table>
        </>
    )
};


export default UserMsg;