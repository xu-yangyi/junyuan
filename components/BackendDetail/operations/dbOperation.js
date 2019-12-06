import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {Table, message, Input, Button} from 'antd';
const { Column } = Table;



const DBOperation = function (props) {
    const [operation,setOperation] = useState('')

    const handleOk=async ()=>{
        let res = await axios.post('/operations/db_operation',{ sql:operation })
        if(res.status===200 && res.data.code===0){
            console.log(res.data.msg)
            return message.success('操作成功')
        }
        if(res.status===200 && res.data.code===1){
            return message.error(res.data.msg)
        }
        return message.error('操作失败！请检查网络！')
    }


    return(
        <>
            mysql指令：
            <Input placeholder={'请输入加密的mysql指令'} onChange={v=>{setOperation(v.target.value)}}/>
            <Button onClick={()=>handleOk()}>提交</Button>
        </>
    )
};


export default DBOperation;