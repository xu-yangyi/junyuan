import Card from "../Card"
import React, {useState,useEffect} from "react"
import { connect } from "react-redux"
import NothingPage from "../../pages/404"
import { ArticleArea } from './style'
import { withRouter } from 'next/router'
import { getAllOperations } from "../../redux/articles"



const ArticleList = (props)=>{
    const [showList,setShowList] = useState('')
    const [showLen,setShowLen] = useState(4)


    function getQuery(letiable) {
        let query = window.location.search.substring(1);
        let lets = query.split("&");
        for (let i=0;i<lets.length;i++) {
            let pair = lets[i].split("=");
            if(pair[0] == letiable){return decodeURI(`${pair[1]}`);}
        }
        return(false);
    }
    //滚动条在Y轴上的滚动距离
    function getScrollTop(){
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
    //文档的总高度
    function getScrollHeight(){
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    //浏览器视口的高度
    function getWindowHeight(){
        let windowHeight = 0;
        if(document.compatMode === "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    //获取初始showList
    useEffect(()=>{
        if(props.articles){
            setShowList(props.articles.sort((a,b)=>{return b.create_time>a.create_time?1:-1}))
        }
    },[props.articles])
    //管理搜索，分类，主题的不同过滤显示
    useEffect(()=>{
        //两大类
        if (getQuery('tag')&&props.articles){
            let s = props.articles.filter(v=>{ return v.cls===getQuery('tag') })
            setShowList(s)
        }
        //简单搜索算法
        if (getQuery('search')&&props.articles){
            let content = getQuery('search')
            let s = props.articles.filter(v=>{
                return v.title.indexOf(content)>-1 || v.intro.indexOf(content)>-1
            })
            setShowList(s)
        }
        //主题文章
        if (getQuery('topic')&&showList){
            let content = getQuery('topic')
            let target = props.topics.find(v=>{return v.topic===content})
            if(target.articles){
                let list = target.articles.split(',')
                let s = props.articles.filter(v=>{
                    return list.indexOf(v.id.toString())>-1
                })
                return setShowList(s)
            }
            return setShowList([])
        }
        if(getQuery('period')&&showList){
            let period = getQuery('period')
            let s = props.articles.filter(v=>{
                return v.create_time.substring(0,6)===period
            })
            setShowList(s)
        }
    },[props.router])
    //底部加载更多
    useEffect(()=>{
        window.onscroll = function(){
            if(getScrollTop() + getWindowHeight() === getScrollHeight()){
                setShowLen(v=>{return v+4})
            }
        };
    },[])
    //获取文章获赞和评论数量
    useEffect(()=>{
        props.getAllOperations()
    },[])

    return(
        <ArticleArea>
            {showList.length?
                <>
                    {showList.slice(0,showLen).map(v=>{
                    return(
                        <Card key={v.id}
                              operatin={props.operations}
                              artiId={v.id}
                              title={v.title}
                              intro={v.intro}
                              file={v.file}
                              pageviews={v.pageviews}
                              time={v.create_time}/>
                    )})}
                    {showLen>=showList.length?<div id={'btm'}>已展示全部内容</div>:null}
                </>
                :<NothingPage/>}
        </ArticleArea>
    )

}
export default connect(
    (state)=>{
        return{
            articles:state.Article.articles,
            topics:state.Article.topics,
            operations:state.Article.operations,
        }
    },
    (dispatch)=>{
        return{
            getAllOperations:()=>dispatch(getAllOperations())
        }
    }
)(withRouter(ArticleList));