import React from "react"
import { connect } from "react-redux"
import Router, {withRouter} from "next/router"
import {Item, Wrapper} from "./style"


const HotList= (props)=>{

    return(
        <Wrapper>
            <div id={'head'}>
                <div id={'yellow'}/>
                <div id={'title'}>
                    热门文章
                </div>
            </div>
            {props.articles.length?
                props.articles.sort((a,b)=>{
                    return b.pageviews>a.pageviews?1:-1
                }).slice(0,5).map((v,index)=>{
                    return <Item id={`item${index}`}
                                 key={v.id}
                                 onClick={()=>{Router.push(`/article?id=${v.create_time.substring(2,v.create_time.length)}`)}}>{index+1}. {v.title}</Item>
                })
                :null}
        </Wrapper>
    )

}
export default connect(
    (state)=>{
        return{
            articles:state.Article.articles
        }
    },null
)(withRouter(HotList));