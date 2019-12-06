import React,{ useState,useEffect } from 'react'
import { Head, Title, Bar, Item, Search, InputWrapper, UserButton } from './style'
import { message,Modal,Input } from "antd"
const { TextArea } = Input
import Router from 'next/router'
import { connect } from "react-redux"
import axios from 'axios'
import {handleLogout, stateInit} from "../../redux/users"
import {getAllTopics,getAllArticles} from "../../redux/articles"

const Header = function (props) {
    const [searching,setSearching] =useState(false);
    const [search,setSearch] = useState('')
    const [time,setTime] = useState()

    const [visi,setVisi] = useState(false)
    const [content,setContent] = useState('')


    function goTo(url){
        Router.push('/empty')
        setTimeout(()=>{
            setSearching(false)
            Router.push('/home'+url)
        })
    }
    function leaveMsg(){
        if(!props.auth){
            return message.warning('留言请先登录,方便我回复您 :)')
        }
        setVisi(true)
    }
    async function handleOk(){
        let res = await axios.post('/leaveMsg',{user:props.user, msg:content})
        if(res.status===200 && res.data.code===0){
            setVisi(false);
            setContent('');
            return message.success(res.data.msg)
        }
        if(res.status===200 && res.data.code===1){
            setVisi(false);
            setContent('');
            return message.warning(res.data.msg)
        }
        return message.warning('系统繁忙，请稍候再试！')
    }
    //控制搜索栏显示
    useEffect(()=>{
        let search=document.getElementById('searchWrapper')

        if(searching){
            search.style.cssText='top:0;opacity:1;transition:0.8s'
        }else {
            //用于解决第一次载入时闪现的bug
            if(search.style.transition){
                search.style.cssText='top:8px;opacity:0;transition:0.8s'
            }else {
                search.style.cssText='top:8px;opacity:0'
            }
        }
    },[searching])
    //根据时间显示不同动画
    useEffect(()=>{
        let date=new Date();
        if(date.getHours()>=18||date.getHours()<=7){
            setTime('night')
        }else {setTime('day')}
    },[])
    //初始加载时获取文章
    useEffect(()=>{
        props.getAllArticles()
        props.getAllTopics()
        props.stateInit()
    },[])

    useEffect(()=>{
        if(props.redirect) {
            Router.push(props.redirect)
        }
    },[props.redirect])

    return(
        <Head>
            <Title className={'title'}>
                {time==='day'?
                    <>
                    <img id={'sun-border'} src={'./img/sun-border.png'} alt=""/>
                    <img id={'sun-center'} src={'./img/sun-center.png'} alt=""/>
                    </> :
                    <>
                        <img id={'moon-on'} src={'./img/moon-on.png'} alt=""/>
                        <img id={'moon-off'} src={'./img/moon-off.png'} alt=""/>
                        <img id={'star2'} src={'./img/star2.png'} alt=""/>
                    </>}


                <div id={'t'} onClick={()=>Router.push('/')} style={{cursor:'pointer'}}>
                    <span id={'name'}>均 远</span>
                    <span id={'add'}>　个 人 博 客</span>
                    <span id={'yangyi'}>许 洋 溢</span>
                </div>
            </Title>


            <Bar className={'bar'}>
                <Item onClick={()=>goTo('')}>首页</Item>
                <Item onClick={()=>goTo('/?tag=tec')}>技术文章</Item>
                <Item onClick={()=>goTo('/?tag=life')}>生活随笔</Item>
                <Item onClick={()=>Router.push('/aboutme')}>关于博客</Item>
                <Item onClick={()=>leaveMsg()}>给我留言</Item>

                <Modal
                    title="这是一个十分草率的留言框"
                    visible={visi}
                    onOk={handleOk}
                    okText={'提交留言'}
                    cancelText={"取消"}
                    onCancel={()=>{setVisi(false);setContent('')}}
                >
                    <p>留言说明：</p>
                    <p>1. 为防止恶意攻击，每位用户一天最多留言两次，还请见谅！<br/>
                    2. 通常我会以邮件形式回复，阁下也可通过其他社交账号与我联系。<br/>3. 感谢关注，友好交流，共同进步 :)</p>
                    <TextArea rows={4} maxLength={180} onChange={v=>setContent(v.target.value)}/>
                </Modal>

                {props.user==='许洋溢'?
                    <Item onClick={()=>{Router.push('/backend-board-x')}}>进入后台</Item>
                    :null}

                <Search>
                    <InputWrapper id={'searchWrapper'}>
                        <input placeholder={'输入关键字查找文章'} onChange={v=>{setSearch(v.target.value)}}/>
                        <img id={'doge'}
                             src={'./img/doge.png'}
                             alt="doge"
                             onClick={()=>goTo(`/?search=${search}`)}/>
                    </InputWrapper>
                    <img id={'s'} src={'./img/search.png'} alt="放大镜"
                         onClick={()=>setSearching(!searching)}/>
                </Search>
                {props.auth?
                    <>
                        <UserButton id="username">你好！{props.user}</UserButton>
                        <UserButton onClick={()=>props.handleLogout()}>退出</UserButton>
                    </>
                    :<UserButton onClick={()=>Router.push('/login')}>登录</UserButton>}

            </Bar>

        </Head>
    )
};


export default connect(
    (state)=>{
        return{
            auth:state.User.auth,
            user:state.User.user,
            redirect:state.Article.redirect}},
    (dispatch)=>{
        return{
            handleLogout:()=>dispatch(handleLogout()),
            getAllArticles:()=>dispatch(getAllArticles()),
            getAllTopics:()=>dispatch(getAllTopics()),
            stateInit:()=>dispatch(stateInit())
        }})(Header);