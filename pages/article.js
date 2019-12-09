import React,{useEffect,useState} from 'react'
import Router, { withRouter } from 'next/router'
import { connect } from "react-redux"
import axios from 'axios/index'
import Clipboard from 'react-clipboard.js';

import { Icon,Tooltip,Comment,Avatar,Input,Button,message } from 'antd'
import { ArticleWrapper,Menu,CommentsWrapper } from "../components/pagesStyle/article-style"
const { TextArea } = Input;
import MarkdownIt from 'markdown-it'
let mk = new MarkdownIt()

const Article = (props) => {
    const [article,setArticle] = useState('')
    const [artiId,setArtiId] = useState()
    const [url,setUrl] = useState()
    //用户自己待提交的评论
    const [comment,setComment] = useState('')
    //本文章的所有评论
    const [comments,setComments] = useState([])
    let f = props.router.query.id

    function toComment(){
        let c = document.getElementById('comment')
        c.scrollIntoView({behavior: "smooth"})
    }
    function writeComment(){
        if(props.auth){
            return(
                <>
                    <TextArea id={'commentArea'} rows={4} maxLength={190} onChange={v=>{setComment(v.target.value)}}/>
                    <Button onClick={handleComment}>提交评论</Button>
                </>
            )
        }
        return (
            <>
            <TextArea disabled rows={4} maxLength={190}/>
            <Button disabled>登录后可评论</Button>
            </>
        )
    }
    async function handleComment(){
        if(!comment){ return message.error('评论不能为空')}
        let res = await axios.post('/articles/handInComment',{content:comment,user:props.user,artiId:artiId})
        if(res.status===200&&res.data.code===0){
            message.success('评论提交成功，等待管理员审核中')
            let t = document.getElementById('commentArea')
            t.value=''
            return setComment('')
        }else {
            return message.error('系统错误，请稍候再试！\n如果一直无法评论，请联系管理员，谢谢！')
        }
    }
    async function like(){
        let user = props.user
        if(!props.auth) {
            try{
                user = await axios.get('/cityjson')
                user = JSON.parse(user.data.split(/ = |;/)[1]).cip
                // return message.info('登录后再点赞吧，让我记住你 :)')
            }catch{
                return message.error('系统错误，请稍候再试！\n如果一直无法操作，请联系管理员，谢谢！')
            }

        }
        let res = await axios.post('/articles/like',{user:user,artiId:artiId})
        if(res.status===200&&res.data.code===0){
            return message.success(res.data.msg)
        }else {
            return message.error('系统错误，请稍候再试！\n如果一直无法操作，请联系管理员，谢谢！')
        }
    }
    function getUrl(){
        if(!window){
            return ''
        }
        return window.location.href
    }

    useEffect(()=>{
        const getArticle = async ()=>{
            const res = await axios.post('/articles/getContent',{file:f})
            if(res.status===200&&res.data.code===0){
                setArtiId(res.data.artiId)
                let result = mk.render(res.data.data)
                setArticle(result)
            }else {
                Router.push('/404')
            }
        }
        getArticle()

    },[])
    useEffect(()=>{
        const getComments = async ()=>{
            const res = await axios.post('/articles/getOneComments',{artiId:artiId})
            if(res.status===200&&res.data.code===0){
                return setComments(res.data.data)
            }else {
                return setComments([])
            }
        }
        getComments()
    },[artiId])
    return(
        <>
            <ArticleWrapper>
                    <div className={'markdown-body'} dangerouslySetInnerHTML={{__html:article}}/>
                    <div style={{textAlign:'center',marginTop:'60px'}}>--- E n d ---</div>
	            <div style={{textAlign:'center',marginTop:'2px',fontSize:'14px',fontWeight:'bold'}}>欢迎分享，欢迎讨论<br/>也欢迎关注我的其他平台账号：<br/>
                        【知乎】均远<br/>
                        【公众号】佛系前端<br/>
                        【GitHub】JunYuanHub<br/>
                        【个人博客】xujunyuan.com</div>            
</ArticleWrapper>
            <Menu>
                <div>
                    <Tooltip
                        title="朕赏你个赞"
                        onClick={()=>like()}>
                    <Icon type="like" theme="twoTone"
                           twoToneColor="#FF4D4D"
                           style={{transform:"scale(1.4)",display:"block"}}/>
                    </Tooltip>
                </div>

                <Clipboard option-text={getUrl}
                           onSuccess={()=>message.success('复制链接成功，欢迎分享')}
                           component="div">
                    <Tooltip title="奇文共欣赏">
                    <Icon type="share-alt"
                           style={{transform:"scale(1.4)",display:"block"}}/>
                    </Tooltip>
                </Clipboard>

                <div>
                    <Tooltip title="指定江山处">
                    <Icon type="message"
                           theme="twoTone" twoToneColor="#90D56F"
                           onClick={()=>toComment()}
                           style={{transform:"scale(1.4)",display:"block"}}/>
                    </Tooltip>
                </div>
            </Menu>
            <CommentsWrapper id="comment">
                {comments.length
                    ?comments.sort((a,b)=>{
                        return a.cTime.replace(/[:\- ]/,'')>b.cTime.replace(/[:\- ]/,'')?1:-1}
                        ).map((v,index)=>{
                        return(
                            <Comment
                                key={v.commentId}
                                author={<a>{v.user}</a>}
                                avatar={
                                    <Avatar
                                        src="/img/panda.png"
                                        alt="user"
                                    />
                                }
                                content={
                                    <p>
                                        {v.content}
                                    </p>
                                }
                                datetime={
                                    <Tooltip >
                                        <span>{v.cTime.split(':')[0]+":"+v.cTime.split(':')[1]}　</span>
                                        <span>　# {index+1}楼</span>
                                    </Tooltip>
                                }
                            />
                        )
                    })
                    : <>
                        <div className="noComment">－－－－</div>
                        <div className="noComment">还没有人留下评论</div>
                        <div className="noComment">－－－－</div>
                        <br/>
                    </>}

                {writeComment()}

            </CommentsWrapper>
        </>

    )
}

export default connect(
    (state)=>{
        return{
            auth:state.User.auth,
            user:state.User.user,
        }
    },null
)(withRouter(Article));
