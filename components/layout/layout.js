import Header from "../Header"
import React,{ useEffect,useState } from "react"
import { Router,withRouter } from "next/router"
import { Icon } from 'antd'
import {BackToTop, Wrapper} from "./style"


//定义公用的布局
const Layout=(props)=>{
    const [home,setHome] = useState(false)
    const handleClick=()=>{
        if(document.body.scrollTop){
            return document.body.scrollTop=0
        }
        return document.documentElement.scrollTop=0
    }

    //返回顶部按钮
    useEffect(()=>{
        let button = document.getElementById('button')
        function getScroll(){
            return {
                left:  document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                top: document.documentElement.scrollTop || document.body.scrollTop || 0
            };
        }
        window.addEventListener('scroll',()=>{
            if(getScroll().top>300){
                return button.style.cssText='opacity:1;cursor:pointer;'
            }
            return button.style.cssText='opacity:0;cursor:default;'
        })
    },[])
    useEffect(()=>{
        if(props.router.pathname==='/'){ setHome(true)}
        else{ setHome(false) }
    },[props.router])
    return(
        <>
            {home?<>{props.children}</>:
            <>
                <Header/>
                <Wrapper>
                    {props.children}
                    <BackToTop id={'button'} onClick={handleClick}>
                        <Icon type="up-circle" id={'icon'}/></BackToTop>
                </Wrapper>
                <style global jsx>{`
                  body {
                    background-color:#EAEAEA;
                  }
                `}</style>
            </>
            }
        </>
    )
}
export default withRouter(Layout);