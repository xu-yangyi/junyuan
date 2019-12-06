import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {Table, message, Modal} from 'antd';

const { Column } = Table;



const AllArticles = function (props) {
    const [articles,setArticles] = useState([])
    const [show,setShow] = useState(false)

    const [id,setId] = useState('')
    const [title,setTitle] = useState('')
    const [intro,setIntro] = useState('')
    const [cls,setCls] = useState('')
    const [create_time,setCreate_time] = useState('')
    const [pageviews,setPageviews] = useState('')

    const getArticles = async()=> {
        const res = await axios.post('/articles/getAll')
        if (res.status === 200 && res.data.code === 0) {
            message.success('获取文章列表成功')
            setArticles(res.data.articles)
        } else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }
    const handleOk = async ()=>{
        const altArticle = async ()=>{
            return await axios.post('/article-backend/alter',{i:id,title,intro,cls,create_time,pageviews})
        }
        altArticle().then((res)=>{
            if(res.data.code===0&&res.status===200){
                message.success('修改文章成功')
                setShow(false)
                return getArticles()
            }
            setShow(false)
            return message.error('修改文章失败')
        },()=>{setShow(false);message.error('服务器出错！')})
    }
    const handleDelete= async (id)=>{
        const res=await axios.post('/articles-backend/delete',{id})
        if(res.status===200&&res.data.code===0){
            message.success('删除文章成功')
            getArticles()
        }else {
            message.error(res.data.msg);
            props.setDetail('')
        }
    }
    const setInfo = async (t)=>{
        const { id,title,intro,cls,create_time,pageviews } = t
        await setId(id)
        await setTitle(title)
        await setIntro(intro)
        await setCls(cls)
        await setCreate_time(create_time)
        await setPageviews(pageviews)
        setShow(true)
    }

    useEffect(()=>{
        getArticles()
    },[])


    return(
        <>
            <Table dataSource={articles} rowKey={record => record.id}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="title" dataIndex="title" key="title" />
                <Column title="intro" dataIndex="intro" key="intro" />
                <Column title="file" dataIndex="file" key="file"/>
                <Column title="cls" dataIndex="cls" key="cls"/>
                <Column title="create_time" dataIndex="create_time" key="create_time"/>
                <Column title="pageviews" dataIndex="pageviews" key="pageviews"/>
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <span key="actionSpan">
                            <a onClick={()=>{setInfo(record)}}>修改</a>
                            <br/>
                            <a onClick={() =>{handleDelete(record.id)}}>删除</a>
                        </span>
                    )}
                />
            </Table>
            <Modal
                visible={show}
                onOk={()=>handleOk()}
                onCancel={()=>setShow(false)}
            >
                修改一次后记得刷新，否则默认值为上一篇文章的信息<br/>
                Title:<br/><input style={{width:400,display:'inline-block'}}
                                  defaultValue={title}
                                  onChange={v=>{setTitle(v.target.value)}}/><br/>
                Intro:<br/><input style={{width:400,display:'inline-block'}}
                                  defaultValue={intro}
                                  onChange={v=>{setIntro(v.target.value)}}/><br/>
                cls:<br/><input style={{width:400,display:'inline-block'}}
                                defaultValue={cls}
                                onChange={v=>{setCls(v.target.value)}}/><br/>
                create_time:<br/><input style={{width:400,display:'inline-block'}}
                                        defaultValue={create_time}
                                        onChange={v=>{setCreate_time(v.target.value)}}/><br/>
                pageviews:<br/><input style={{width:400,display:'inline-block'}}
                                      defaultValue={pageviews}
                                      onChange={v=>{setPageviews(v.target.value)}}/><br/>
            </Modal>

        </>
    )
};


export default AllArticles;