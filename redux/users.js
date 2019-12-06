import axios from 'axios';


//reducer
const initState={
    auth:false,
    user:'',
    error:'',
    redirect:'',
};
export function User(state=initState,action){
    switch (action.type) {
        case ERROR_MSG:
            return {...state,error:action.msg};
        case AUTH_SUCCESS:
            return {...state,auth:true,user:action.user,redirect:action.redirect,error:''}
        case LOGOUT:
            return {...initState}
        default: return state
    }
}

//Constants
const ERROR_MSG="user/error_msg";
const AUTH_SUCCESS='user/auth_success';
const LOGOUT='user/logout'


//ActionCreators
export function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
}

export function handleLogin(user,pwd,code) {
    if(!user||!pwd){ return errorMsg("用户名或者密码不能为空")}
    if(!(2<=user.length<=8) && (6<=pwd.length<=14) ){ return errorMsg('用户名或密码错误') }

    return async dispatch=>{
        const res=await axios.post('/userInfo',{user,pwd,code});
        if(res.status===200&&res.data.code===0){
            dispatch({user:res.data.user,
                      type:AUTH_SUCCESS,
                      redirect:res.data.redirect})
        }else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}
export function handleLogout() {
    return async dispatch=>{
        const res= await axios.post('/userLogout')
        dispatch({type:LOGOUT})
    }
}
export function handleRegister(user,pwd,email,eCaptcha) {
    if (!(user && pwd && email && eCaptcha)){
        return errorMsg("注册信息不能为空")}
    if( !((2<=user.length<=8) && (6<=pwd.length<=14)&& (10<=email.length<=29)) ){
        return errorMsg('注册信息不合规范')}
    return async dispatch=>{
        const res= await axios.post('/userInfo',{user,pwd,email,eCaptcha:eCaptcha})
        if(res.status===200&&res.data.code===0){
            dispatch({user:res.data.user,
                      type:AUTH_SUCCESS,
                      redirect:res.data.redirect})
        }else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}
export function handleReset(pwd,email,eCaptcha) {
    if (!(pwd && email && eCaptcha)){
        return errorMsg("填写信息不能为空")}
    if( !((6<=pwd.length<=14)&& (10<=email.length<=29)) ){
        return errorMsg('填写信息不合规范')}
    return async dispatch=>{
        const res= await axios.post('/userReset',{pwd,email,eCaptcha:eCaptcha})
        if(res.status===200&&res.data.code===0){
            dispatch({user:res.data.user,
                type:AUTH_SUCCESS,
                redirect:res.data.redirect})
        }else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}
export function stateInit() {
    return async dispatch=>{
        const res= await axios.post('/userInit')
        if(res.status===200&&res.data.code===0){
            dispatch({
                    user:res.data.user,
                    type:AUTH_SUCCESS,
                })
        }else {
            dispatch({type:LOGOUT})
        }
    }
}