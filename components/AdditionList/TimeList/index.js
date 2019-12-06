import React,{ useState,useEffect } from "react"
import { connect } from "react-redux"
import Router, {withRouter} from "next/router"
import {Item, Wrapper} from "./style"
import { Icon } from 'antd'


const TimeList= (props)=>{
    const [showAll,setShowAll] = useState(false)
    const [showList,setShowList] = useState('')

    function goTo(url){
        Router.push('/empty')
        setTimeout(()=>{
            Router.push('/home'+url)
        })
    }
    function showContent(){
        if(showList.length){
            if(showList.length<=6){
                return (
                    <>
                        {showList.map(v=>{
                            return (
                                <Item key={v} onClick={()=>goTo(`/?period=${v.substring(0,6)}`)}>
                                    {v.substring(0,4)+'年'+v.substring(4,6)+'月'}
                                </Item>) })}
                    </>
                )

            }else {
                return(
                    <>
                        {showAll?
                            <>
                            {showList.map(v=>{
                                return (
                                    <Item key={v} onClick={()=>goTo(`/?period=${v.substring(0,6)}`)}>
                                        {v.substring(0,4)+'年'+v.substring(4,6)+'月'}
                                    </Item>
                                ) })
                            }
                            </>
                            :<>
                                {showList.slice(0,6).map(v=>{
                                return (
                                    <Item key={v} onClick={()=>goTo(`/?period=${v.substring(0,6)}`)}>
                                        {v.substring(0,4)+'年'+v.substring(4,6)+'月'}
                                    </Item>
                                ) }) }
                                <Item id={'showMore'} onClick={()=>{setShowAll(true)}}>显示更多</Item>
                            </>
                        }
                    </>
                )
            }

        }
    }

    useEffect(()=>{
        if(props.articles){
            let timeLi = []
            props.articles.map(v=>{
                timeLi.push(v.create_time.substring(0,6))
            })
            timeLi = new Set(timeLi)
            setShowList(Array.from(timeLi).sort((a,b)=>{return b>a?1:-1} ))
        }
    },[props.articles])

    return(
        <Wrapper>
            <div id={'head'}>
                <div id={'blue'}/>
                <div id={'title'}>
                    文章归档
                </div>
            </div>
                <div id={'content'}>
                    {showContent()}
                </div>
        </Wrapper>
    )

}
export default connect(
    (state)=>{
        return{
            articles:state.Article.articles
        }
    },null
)(withRouter(TimeList));