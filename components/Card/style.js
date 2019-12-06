import styled from 'styled-components';

export const Wrapper=styled.div`
    overflow:hidden;
    position:relative;
    width:700px;
    margin-top:10px;
    padding:5px 0 15px 0;
    background-color:white;
    cursor:pointer;
    :hover{
        box-shadow:1px 1px 3px silver;
    }
    #time{
        position:absolute;
        right:20px;
        bottom:10px;
    }
`
export const Title=styled.div`
    width:700px;
    padding-left:20px;
    font-size:23px;
`
export const Intro=styled.div`
    font-size:15px;
    color:grey;
    padding-right:10px
`
export const Pic=styled.div`
    float:left;
    width:220px;
    height:130px;
    margin:0 10px 0 20px;
    img{
        width:100%;
        height:100%;
        border-radius:6px;
    }
`