import styled from "styled-components"

export const Wrapper=styled.div`
    width:90%;
    margin-top:20px;
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
        border-radius:1px 1px 0 0;
        padding:1px 0 1px 20px;
    }
    #yellow{
        display:inline-block;
        width:3px;
        height:15px;
        background-color:#D52A2A;
        float:left;
        margin:4px 5px 0 0;
    }
    #title{
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }
    #item0{
        color:#A45252;
    }
    #item1{
        color:#905A5A;
    }
    #item2{
        color:#7A5858;
    }
`
export const Item = styled.div`
    display:inline-block;
    font-weight:bold;
    width:100%;
    padding-left:20px;
    border-radius:1px;
    border-bottom:1px solid #F0F0F0;
    cursor:pointer;
    :hover{
        box-shadow:0 0 4px silver;
    }
`