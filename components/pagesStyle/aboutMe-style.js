import styled from 'styled-components'

export const Header = styled.div`
    width:100%;
    font-size:40px;
    overflow:hidden;
    background-color:#466C66;
    text-align:center;
`
export const Wrapper = styled.div`
    width:70%;
    margin:2px auto 0 auto ;
    #one{
        font-size:16px;
        overflow:hidden;
        background-color:#566D4A;
        .ant-collapse-header{
            font-size:40px;
            margin:-50px 0 -50px 30px;
        }
        img{
            margin-left:-50px;
            transform:scale(0.35);
        }
    }
    #two{
        font-size:16px;
        font-weight:bold;
        overflow:hidden;
        background-color:#792B1B;
        .ant-collapse-header{
            font-size:40px;
            font-weight:100;
            padding:-10px 16px;
            margin:-50px 0 -50px 30px;
        }
        img{
            margin-left:-50px;
            transform:scale(0.35);
        }
    }
    #three{
        font-size:16px;
        overflow:hidden;
        background-color:#2E394A;
        .ant-collapse-header{
            font-size:40px;
            margin:-20px 0 -20px 30px;
        }
        img{
            margin-left:-20px;
            transform:scale(0.6);
        }
    }
`