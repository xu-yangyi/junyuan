import styled from "styled-components"

export const Wrapper=styled.div`
    width:90%;
    margin-top:10px;
    background-color:white;
    box-shadow:0 0 1px grey;
    border-radius:2px;
    #head{
        width:100%;
        height:27px;
        color:$404040;
        font-size:15px;
        font-weight:bold;
        border-bottom:1px solid #E8E8E8;
        border-radius:2px 2px 0 0;
        padding:1px 0 1px 20px;
    }
    #red{
        display:inline-block;
        width:3px;
        height:15px;
        background-color:#638A56;
        float:left;
        margin:4px 5px 0 0;
    }
    #title{
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }
    #content{
        width:100%;
        padding:2px 10px 30px 10px;
        
    }
`
export const Item = styled.div`
    display:inline-block;
    padding:0 3px;
    margin:3px 4px;
    border-radius:4px;
    border:1px solid #cccccc;
    cursor:pointer;
    :hover{
        box-shadow:0 0 1px blue;
    }
`