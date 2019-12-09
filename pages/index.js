import React,{ useState,useEffect,useRef } from 'react'
import Router from 'next/router'
import { CSSTransition } from 'react-transition-group'
import { Wrapper } from "../components/pagesStyle/index-style"
import { Button } from 'antd'

const Index=()=>{

    const [day,setDay] = useState(false)
    const [wave,setWave] = useState(false)
    const intervalRef = useRef();


    useEffect(()=>{
        document.title='均远--壹个佛系程序猿的个人博客'
    },[])

    useEffect(()=>{
        const a = setInterval(()=>{ setDay(pre=>{return !pre}) },22000)
        intervalRef.current=a
        setDay(true)
        setWave(true)
        return ()=>{
            if(intervalRef.current){
                clearInterval(intervalRef.current)
            }
        }
    },[])

    return(
        <Wrapper>
            {/*太阳月亮*/}
            <>
                <CSSTransition
                    in={day}
                    timeout ={1000}
                    classNames ='sunIn1'
                >
                    <img className={'sun'} src="/img/sun-border.png" alt=""/>
                </CSSTransition>
                <CSSTransition
                    in={day}
                    timeout ={1000}
                    classNames ='sunIn2'
                >
                    <img className={'sun'} src="/img/sun-center.png" alt=""/>
                </CSSTransition>

                <CSSTransition
                    in={!day}
                    timeout ={1000}
                    classNames ='moon1'
                >
                    <img className={'moon'} src="/img/moon1.png" alt=""/>
                </CSSTransition>
                <CSSTransition
                    in={!day}
                    timeout ={1000}
                    classNames ='moon2'
                >
                    <img className={'moon'} src="/img/moon2.png" alt=""/>
                </CSSTransition>
            </>
            {/*海浪*/}
            <>
                <CSSTransition
                    in={wave}
                    timeout ={2000}
                    classNames ='wave1In'
                >
                    <img className={'wave1'} src="/img/wave1.png" alt=""/>
                </CSSTransition>
                <img className={'shark'} src="/img/shark.png" alt=""/>
                <CSSTransition
                    in={wave}
                    timeout ={2000}
                    classNames ='wave2In'
                >
                    <img className={'wave2'} src="/img/wave2.png" alt=""/>
                </CSSTransition>
            </>
            {/*中心部分*/}
            <>
                <CSSTransition
                    in={wave}
                    timeout ={2000}
                    classNames ='center'
                >
                    <img id={'junyuan'} className={'hi'} src="/img/junyuan.png" alt=""/>
                </CSSTransition>
                <CSSTransition
                    in={wave}
                    timeout ={2000}
                    classNames ='center'
                >
                    <img id={'intro1'} className={'hi'} src="/img/intro1.png" alt=""/>
                </CSSTransition>
                <CSSTransition
                    in={wave}
                    timeout ={3000}
                    classNames ='btn'
                >
                    <Button
                        id={'btn'}
                        className={'hi'}
                        onClick={()=>Router.push('/home')}
                    >Enter</Button>
                </CSSTransition>


            </>
        </Wrapper>

    )
}
export default Index;

