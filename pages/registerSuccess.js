import React, {useEffect,useState} from 'react'
import Router from "next/router"
import {Head,Add, RegisterBox} from "../components/pagesStyle/registerSuccess-style"
import { Icon } from 'antd';

const RegisterSuccess = function () {
    const [count,setCount] = useState(5)

    useEffect(()=>{
        let x=setInterval(()=>{
            setCount(c=>{return c-1})
        },1000)
        setTimeout(()=>{
            clearInterval(x);
            Router.push('/home')
        },5000)
    },[])
    return (
        <RegisterBox>
            <Head>注册成功<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></Head>
            <Add>{`${count}s后返回主页`}</Add>
        </RegisterBox>
    )
}
export default RegisterSuccess;