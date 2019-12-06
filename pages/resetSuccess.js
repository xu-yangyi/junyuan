import React, {useEffect,useState} from 'react'
import Router from "next/router"
import {Head,Add, RegisterBox} from "../components/pagesStyle/registerSuccess-style"
import { Icon } from 'antd';

const ResetSuccess = function () {
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
            <Head>重置密码成功<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></Head>
            <Add>{`${count}s后返回主页`}</Add>
        </RegisterBox>
    )
}
export default ResetSuccess;