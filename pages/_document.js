import Document,{ Html,Head,Main,NextScript } from 'next/document'
import { ServerStyleSheet } from "styled-components"
import React from "react"

class Mydocument extends Document {
    static async getIntialProps(ctx) {
        const sheet = new ServerStyleSheet()

        try{
            ctx.renderPage = ()=>originalRenderPage({
                enhanceApp:App => (...props) =>
                    sheet.collectStyles(<App {...props}/>),
            })
            const props = await Document.getInitialProps(ctx)

            return {
                ...props,
                styles:<>{props.styles}{sheet.getStyleElement()}</>
                //props.styles表示next内置的styles样式，用新的覆盖
            }
        }finally{
            sheet.seal()
        }
    }

    render(){
        return(
            <html>
                <Head>
                </Head>

                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )}
}
export default Mydocument;