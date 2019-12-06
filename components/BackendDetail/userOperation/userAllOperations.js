import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import { Table,message } from 'antd';
const { Column } = Table;



const UserAllOperations = function (props) {
    const [all,setAll] = useState()

    const getAll = async()=> {
        const res = await axios.post('/operations/getAll')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取用户操作成功')
            setAll(res.data.data)
        } else {
            message.error('获取用户操作失败！');
            props.setDetail('')
        }
    }

    async function handleDel(oId){
        const res = await axios.post('/operations/msgCheck',{order:'del',oId:oId})
        if (res.status === 200 && res.data.code === 0) {
            message.success('条目删除成功')
            getAll()
        } else {
            message.error('系统出错，操作失败');
            props.setDetail('')
        }
    }
    useEffect(()=>{
        getAll()
    },[])

    return(
        <>
            <Table dataSource={all}>
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
                            <span onClick={()=>handleDel(record.o_id)}>删除</span>
                        </span>
                    )}
                />
            </Table>
        </>
    )
};


export default UserAllOperations;