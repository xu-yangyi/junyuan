import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Router from 'next/router'
import {RegisterBox,InputWrapper,Input,Button,Error} from '../components/pagesStyle/register-style'
import {errorMsg, handleRegister} from "../redux/users"
import { connect } from "react-redux"


const Register = function (props) {
    const [user,setName] = useState('');
    const [pwd,setPwd] = useState('');
    const [email,setEmail] = useState('');
    const [eCaptcha,setECaptcha] = useState('');

    const [waiting,setWaiting] = useState(false);
    const [count,setCount] = useState('')

    useEffect(()=>{
        props.errorMsg('');
    },[])
    useEffect(()=>{
        if(waiting){
            setCount(60)
            let interval=setInterval(()=>{
                setCount(c=>{ return c-1 })
            },1000)
            setTimeout(()=>{
                clearInterval(interval);
                setWaiting(false);
            },60*1000)
        }

    },[waiting])
    useEffect(()=>{
        if (props.redirect==='/registerSuccess'){
            Router.push(props.redirect)
        }
    },[props.redirect])

    async function sendEmailCode() {
        if(! (email.match(/.{4,18}@.{2,6}\.com$/)&&(10<=email.length<=29) )){
            return props.errorMsg('邮箱信息错误')
        }
        const res = await axios.post('/getEmailCaptcha',{email})
        if(res.error){
            return props.errorMsg(res.error)
        }else {
            return setWaiting(true)
        }
    }
    return (
            <RegisterBox>
                {props.error ? <Error>{props.error}</Error> :null}
                <InputWrapper>
                    　账　号：<Input onChange={(v)=>setName(v.target.value)} placeholder={'2-8个字符长度'}/>
                </InputWrapper>
                <InputWrapper>
                    　密　码：<Input onChange={(v)=>setPwd(v.target.value)} type='password' placeholder={'6-14个字符长度'}/>
                </InputWrapper>
                <InputWrapper>
                    　邮　箱：<Input onChange={(v)=>setEmail(v.target.value)} placeholder={'方便联系与密码找回'}/>
                    {waiting?
                        <div id="check-off" >({count}s)</div>
                        :<div id="check-on" onClick={()=>sendEmailCode()}>发送验证</div>}

                </InputWrapper>
                <InputWrapper>
                    验证密码：<Input onChange={(v)=>setECaptcha(v.target.value)} placeholder={'输入邮箱验证码'}/>
                </InputWrapper>
                <Button onClick={()=>props.handleRegister(user,pwd,email,eCaptcha)}>注册</Button>
            </RegisterBox>

    )
}

export default connect(
    (state)=>{
        return {
            auth: state.User.auth,
            error: state.User.error,
            redirect: state.User.redirect}},
    (dispatch)=>{
        return {
            handleRegister:(user,pwd,email,eCaptcha)=>dispatch(handleRegister(user,pwd,email,eCaptcha)),
            errorMsg:(msg)=>dispatch(errorMsg(msg))
        }
    }
)(Register);