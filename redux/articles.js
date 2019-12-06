import axios from 'axios';

//reducer
const initState={
    articles:'',
    redirect:'',
    topics:'',
    operations:'',
};
export function Article(state=initState,action){
    switch (action.type) {
        case WRONG:
            return {...state,redirect:'/404'}
        case  ARTICLES_GET:
            return {...state,articles:action.articles,showList:action.articles}
        case TOPICS_GET:
            return {...state,topics:action.topics}
        case OPERATIONS_GET:
            return {...state,operations:action.operations}
        default:
            return state
    }
}

//Constants
const ARTICLES_GET = 'article/articles_get'
const WRONG = 'article/wrong'
const TOPICS_GET = 'article/topics_get'
const OPERATIONS_GET='article/operations_get'
//ActionCreators
export const getAllArticles= ()=>{
    return async dispatch=>{
        const res = await axios.post('/articles/getAll')
        if(res.status===200&&res.data.code===0){
            dispatch({articles:res.data.articles,type:ARTICLES_GET})
        }else {
            dispatch({type:WRONG})
        }
    }
}
export const getAllTopics = ()=>{
    return async dispatch=>{
        const res = await axios.post('/topics/getAll')
        if(res.status===200&&res.data.code===0){
            dispatch({topics:res.data.data,type:TOPICS_GET})
        }else {
            dispatch({type:WRONG})
        }
    }
}
export const getAllOperations = ()=>{
    return async dispatch=>{
        const res = await axios.post('/operations/getInfo')
        if(res.status===200&&res.data.code===0){
            dispatch({operations:res.data.data,type:OPERATIONS_GET})
        }else {
            dispatch({type:WRONG})
        }
    }
}