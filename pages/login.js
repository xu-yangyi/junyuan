import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { LoginBox, Input, Button } from '../components/pagesStyle/login-style'
import { connect } from 'react-redux'
import { errorMsg, handleLogin } from "../redux/users"
import { message } from 'antd'

const Login = function (props) {

    const [name,setName] = useState('');
    const [pwd,setPwd] = useState('');
    const [code,setCode] = useState('');
    const [capt,setCapt] = useState('');

    async function changeCapt (){
        let c = await getCaptcha();
        setCapt(c)
    }
    useEffect(()=>{
        changeCapt();
        props.errorMsg('');
    },[])
    useEffect(()=>{
        if(props.auth){
            Router.push('/home')
        }
    },[props.auth])
    useEffect(()=>{
        if(props.error){ return message.error(props.error) }
    },[props.error])
    return (
        <LoginBox>
            <Input placeholder='账号' onChange={(v)=>setName(v.target.value)}/>
            <Input placeholder='密码'
                   type='password'
                   onChange={(v)=>setPwd(v.target.value)}/>
            <Input id={'code'} placeholder='验证码' onChange={(v)=>setCode(v.target.value)}/>
            <div id={'captcha'}
                 dangerouslySetInnerHTML={{__html:capt.data}}
                 onClick={()=>changeCapt()}/>
            <span id={'findBack'} onClick={()=>Router.push('/reset')}>找回密码</span>
            <span id={'zhuce'} onClick={()=>Router.push('/register')}>注册用户</span>
            <Button onClick={()=>props.handleLogin(name,pwd,code)}>登陆</Button>
        </LoginBox>
    )
}
async function getCaptcha() {
    return await axios.get('/captcha'+'?' + new Date().getTime())
}
export default connect(
    (state)=>{
        return{
            auth:state.User.auth,
            user:state.User.user,
            error:state.User.error,
            redirect:state.User.redirect}},
    (dispatch)=>{
        return{
            handleLogin:(user,pwd,code)=>dispatch(handleLogin(user,pwd,code)),
            errorMsg:(msg)=>dispatch(errorMsg(msg))}
    })(Login);