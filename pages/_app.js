import App,{ Container } from 'next/app'
import 'antd/dist/antd.css'
import React from "react"
import Router from 'next/router'
import Layout from '../components/layout/layout'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import PageLoading from '../components/PageLoading'

class MyApp extends App{
    state = {
        loading: false,
    }

    startLoading = () => {
        this.setState({
            loading: true,
        })
    }

    stopLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }

    static async getInitialProps(ctx) {
        const { Component } = ctx
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps,
        }
    }

    render(){
        const { Component,pageProps,reduxStore } = this.props
        return(
            <Container>
                <Provider store={reduxStore}>
                    {this.state.loading ? <PageLoading /> : null}
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
            </Container>
        )
    }
}
export default withReduxStore(MyApp)