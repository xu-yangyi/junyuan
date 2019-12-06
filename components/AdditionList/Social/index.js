import React from "react"
import { Icon,Popover,Tooltip } from "antd"


const Social= (props)=>{


    return(
        <>

            <Popover content={<><div style={{textAlign:'center'}}>扫码前往知乎</div><img src="/img/zhihu.png" alt="" style={{width:'100px',height:'100px'}}/></>} >
                <div className={'wrapper'}>
                    <Icon type="zhihu" style={{width:'46px',height:'46px',fontSize: '42px',color:'white',backgroundColor:'#3582C7'}} />
                </div>
            </Popover>

            <Popover content={<>
                                <div style={{textAlign:'center'}}>欢迎关注公众号</div>
                                <img src="/img/gongzhonghao.jpg" alt="" style={{width:'100px',height:'100px'}}/>
                                </>}
            >
                <div className={'wrapper'}>
                    <Icon type="wechat" style={{width:'46px',height:'46px',fontSize: '42px',color:'white',backgroundColor:'green'}} />
                </div>
            </Popover>

            <Popover content={<img src="/img/qq.png" alt="" style={{width:'100px',height:'100px'}}/>} >
                <div className={'wrapper'}>
                    <Icon type="qq"
                          style={{width:'46px',height:'46px',fontSize: '42px',color:'#3CA1FD',backgroundColor:'white'}}/>
                </div>
            </Popover>

            <Tooltip title="前往GitHub">
            <div className={'wrapper'} onClick={()=>window.location.href='https://github.com/JunYuanHub'}>
                <Icon type="github" style={{width:'46px',height:'46px',fontSize: '42px',color:'white',backgroundColor:'black'}} />
            </div>
            </Tooltip>

            <style jsx>{`
                .wrapper{
                    width:46px;
                    height:46px;
                    display:inline-block;
                    margin:10px 14px 0 10px;
                    background-color:white;
                    box-shadow:0 0 1px grey;
                    border-radius:4px;
                    overflow:hidden;
                    cursor:pointer;
                }
            `}</style>
        </>
    )

}
export default Social;