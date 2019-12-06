import React from 'react'
import { Icon } from 'antd'
import {Intro, Pic, Title, Wrapper} from "./style"
import Router from "next/router"
import { connect } from "react-redux"

//props:title,intro,pic
const Card = (props)=>{
    let {title,intro,file,time,artiId,operations,pageviews} = props;

    let fname=file.match(/\d+/)[0]
    fname = fname.substring(2,fname.length)
    let nTime = time.substring(0,4)+'-'+time.substring(4,6)+'-'+time.substring(6,8)

    function showAddition(i) {
        if(operations){
            //统计like和评论数
            let like=0;
            let com=0;
            operations.forEach(v=>{
                if(v.action==='like' && v.target===i){ like++ }
                if(v.action==='comment' && v.target===i){ com++ }
            })
            return(
                <>
                    <Icon type="eye" />
                    {pageviews?<> {pageviews}　</>:<> - 　</>}
                    <Icon type="like" />
                    {like? <> {like}　</>:<> - 　</>}
                    <Icon type="message" />
                    {com? <> {com}　</>:<> - 　</>}
                </>
            )
        }
    }
    return(
        <Wrapper onClick={()=>{Router.push(`/article?id=${fname}`)}}>
            <Title>{title}</Title>
            <Pic><img src={`/articles/${time}.png`} alt="图片"/></Pic>
            <Intro>{intro}</Intro>
            <div id={'time'}>
                {showAddition(artiId)}
                <Icon type="clock-circle" /> {nTime}
            </div>
        </Wrapper>
    )
}

export default connect(
    (state)=>{
        return{
            operations:state.Article.operations,
        }
    },null
)(Card);