import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {Table, message, Modal} from 'antd';

const { Column } = Table;



const Users = function (props) {
    const [user,setUsers] = useState([])

    const getUsers = async()=> {
        const res = await axios.post('/users-backend/getAll')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取用户列表成功')
            setUsers(res.data.users)
        } else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }
    const handleDelete = async(id)=>{
        //
        // 未完成
        //
        const res = await axios.get('/user-backend/delete')
        if (res.status === 200 && res.data.code === 0) {
            message.success('删除用户成功')
            getUsers()
        } else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }

    useEffect(()=>{
        getUsers()
    },[])


    return(
        <>
            <Table dataSource={user} rowKey={record => record.id}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="name" dataIndex="name" key="name" />
                <Column title="pwd" dataIndex="pwd" key="pwd" />
                <Column title="email" dataIndex="email" key="email"/>
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <span key="actionSpan">
                            <a onClick={() =>{handleDelete(record.id)}}>删除</a>
                        </span>
                    )}
                />
            </Table>
        </>
    )
};


export default Users;