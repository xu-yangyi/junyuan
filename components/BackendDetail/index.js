import React from 'react'
import {DetailWrapper} from "./styled"
import UploadArticle from "./article/upload"
import AllArticles from "./article/allArticles"
import Topics from "./article/topics"
import Users from "./users"
import Comment from "./article/comment"
import DBOperation from "./operations/dbOperation"
import FileOperation from "./operations/fileOperation"
import UserMsg from "./userOperation/userMsg"
import UserAllOperations from "./userOperation/userAllOperations"



const BackendDetail = function (props) {

    return (
        <DetailWrapper>
            {props.detail==='show_all_users'?<Users setDetail={props.setDetail}/>:null}

            {props.detail==='upload_article'?<UploadArticle setDetail={props.setDetail}/>:null}
            {props.detail==='show_all_articles'?<AllArticles setDetail={props.setDetail}/>:null}
            {props.detail==='show_all_comments'?<Comment setDetail={props.setDetail}/>:null}
            {props.detail==='classify_articles'?<Topics setDetail={props.setDetail}/>:null}

            {props.detail==='user_msg'?<UserMsg setDetail={props.setDetail}/>:null}
            {props.detail==='user_operations'?<UserAllOperations setDetail={props.setDetail}/>:null}

            {props.detail==='DB_operation'?<DBOperation setDetail={props.setDetail}/>:null}
            {props.detail==='file_operation'?<FileOperation setDetail={props.setDetail}/>:null}
        </DetailWrapper>
    )
};


export default BackendDetail;