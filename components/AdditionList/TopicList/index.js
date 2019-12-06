import React from "react"
import { connect } from "react-redux"
import Router, {withRouter} from "next/router"
import {Item, Wrapper} from "./style"


const TopicList= (props)=>{
    function goTo(url){
        Router.push('/empty')
        setTimeout(()=>{
            Router.push('/home'+url)
        })
    }



    return(
        <Wrapper>
            <div id={'head'}>
                <div id={'red'}/>
                <div id={'title'}>
                    技术专题
                </div>
            </div>
                <div id={'content'}>
                    {props.topics?
                        props.topics.map(v=>{
                            return(
                                <Item key={v.topic} onClick={()=>goTo(`/?topic=${v.topic}`)}>{v.topic}</Item>
                            )
                        })
                        :null}
                </div>
        </Wrapper>
    )

}
export default connect(
    (state)=>{
        return{
            topics:state.Article.topics
        }
    },null
)(withRouter(TopicList));