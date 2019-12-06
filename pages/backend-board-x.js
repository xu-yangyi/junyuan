import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

import { Layout, Menu, Icon } from 'antd';
import BackendDetail from "../components/BackendDetail"

const { SubMenu } = Menu;
const { Sider } = Layout;

const BackEnd = function (props) {
    const [detail,setDetail] = useState('')

    useEffect(()=>{
        if(props.user!=='许洋溢' || props.auth!==true){
            Router.push('/')
        }},[props.auth,props.user])

    return(
        <Layout>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="1" onClick={()=>setDetail('show_all_users')}>全部用户</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="book" />文章管理</span>}>
                            <Menu.Item key="2" onClick={()=>setDetail('show_all_articles')}>全部文章</Menu.Item>
                            <Menu.Item key="3" onClick={()=>setDetail('upload_article')}>上传文章</Menu.Item>
                            <Menu.Item key="4" onClick={()=>setDetail('classify_articles')}>文章分类</Menu.Item>
                            <Menu.Item key="5" onClick={()=>setDetail('show_all_comments')}>留言管理</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="wechat" />用户交互</span>}>
                            <Menu.Item key="6" onClick={()=>setDetail('user_msg')}>用户留言</Menu.Item>
                            <Menu.Item key="7" onClick={()=>setDetail('user_operations')}>用户操作</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="pie-chart" />高级操作</span>}>
                            <Menu.Item key="8" onClick={()=>setDetail('DB_operation')}>数据库操作</Menu.Item>
                            <Menu.Item key="9" onClick={()=>setDetail('file_operation')}>静态目录管理</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '10px 24px',height:'460px' }}>
                    <BackendDetail detail={detail} setDetail={setDetail}/>
                </Layout>
            </Layout>
        </Layout>)
}

export default connect(
    (state)=>{
        return{
            auth:state.User.auth,
            user:state.User.user}
    },null
)(BackEnd);