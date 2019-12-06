import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import { Table,message } from 'antd';
const { Column } = Table;



const Comment = function (props) {
    const [comments,setComments] = useState([])

    async function handleOk(cId){
        const res = await axios.post('/articles/commentsCheck',{order:'pass',cId:cId})
        if (res.status === 200 && res.data.code === 0) {
            message.success('评论通过成功')
            getComments()
        } else {
            message.error('系统出错，操作失败');
            props.setDetail('')
        }
    }
    async function handleDel(cId){
        const res = await axios.post('/articles/commentsCheck',{order:'del',cId:cId})
        if (res.status === 200 && res.data.code === 0) {
            message.success('评论驳回成功')
            getComments()
        } else {
            message.error('系统出错，操作失败');
            props.setDetail('')
        }
    }

    const getComments = async()=> {
        const res = await axios.post('/articles/getComments')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取评论列表成功')
            setComments(res.data.data)
        } else {
            message.error('获取评论列表失败！');
            props.setDetail('')
        }
    }

    useEffect(()=>{
        getComments()
    },[])

    return(
        <>
            <Table dataSource={comments}>
                <Column title="commentId" dataIndex="commentId" key="commentId" />
                <Column title="user" dataIndex="user" key="user" />
                <Column title="artiId" dataIndex="artiId" key="artiId" />
                <Column title="content" dataIndex="content" key="content" />
                <Column title="cTime" dataIndex="cTime" key="cTime" />
                <Column title="state" dataIndex="state" key="state" />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <span>
                            {record.state==='unchecked'?
                                <>
                                <span onClick={()=>{handleOk(record.commentId)}}>通过</span>
                                <br/>
                                </>
                                :null}
                            <span onClick={()=>handleDel(record.commentId)}>取消</span>
                        </span>
                    )}
                />
            </Table>
        </>
    )
};


export default Comment;