import styled from 'styled-components';


export const Head=styled.div`
    width:100%;
    font-size:16px;
    font-family:Microsoft YaHei;
    #username{
        right:200px;
    }
`

export const Title=styled.div`
    width:100%;
    height:110px;
    background-color:#4D4D4D;
    color:white;
    text-align:center;
    #t{
        display:inline-block;
        margin:0 auto;
        :hover{
            #name{
                display:inline-block;
                padding:13px 60px 0 0;
                font-size:55px;  
                font-weight:bold;
                transition:0.6s; 
            }
            #yangyi{
                display:inline-block;
                position:relative;
                left:-145px;
                top:0;
                font-weight:bold;
                opacity:1;
                transition:0.6s; 
            }
        }
    }
    #name{
        display:inline-block;
        padding:13px 0 0 0;
        font-size:55px;  
        font-weight:bold; 
        transition:1s;
    }
    #add{
        display:inline-block;
        color:#FCFCFC;
        font-weight:bold;
    }
    #yangyi{
        display:inline-block;
        position:relative;
        left:-145px;
        top:6px;
        font-weight:bold;
        opacity:0;
        transition:0.6s; 
    }
    
    
    #sun-border{
        position:absolute;
        top:5px;
        right:80px;
        width:60px;
        height:60px;
        animation:ani-border 20s linear infinite;
        @keyframes ani-border{
            0%{transform:scale(1);}
            25%{transform:scale(1.2);}
            50%{transform:scale(1);}
            75%{transform:scale(1.2);}
            100%{transform:scale(1);}
        }
    }
    #sun-center{
        position:absolute;
        top:6px;
        right:82px;
        width:55px;
        height:55px;
        animation:ani-center 30s linear infinite;
        @keyframes ani-center{
            0%{transform:rotate(0deg);}
            25%{transform:rotate(90deg);}
            50%{transform:rotate(180deg);}
            75%{transform:rotate(270deg);}
            100%{transform:rotate(360deg);}
        }
    }
    #moon-on{
        position:absolute;
        top:10px;
        right:82px;
        width:45px;
        height:45px;
    }
    #moon-off{
        position:absolute;
        top:9px;
        right:81px;
        width:47px;
        height:47px;
        transform-origin:0 0;
        animation:ani-moon 240s linear infinite;
        @keyframes ani-moon{
            0%{transform:rotate(0deg);}
            25%{transform:rotate(-90deg);}
            50%{transform:rotate(-180deg);}
            60%{transform:rotate(-270deg);}
            100%{transform:rotate(-360deg);}
        }
    }
    #star2{
        position:absolute;
        top:100px;
        right:482px;
        width:15px;
        height:15px;
        animation:ani-star2 20s linear infinite;
        @keyframes ani-star2{
            0%{opacity:0;}
            50%{opacity:0;transform:rotate(0deg)}
            51%{opacity:1;top:90px;transform:rotate(20deg)}
            55%{opacity:0;top:30px;transform:rotate(100deg)}
            100%{opacity:0;}
        }
    }

`

export const Bar=styled.div`
    display:flex;
    width:100%;
    height:50px;
    background-color:#333333;
    color:white;

`
export const Item=styled.div`
    width:100px;
    padding:10px 0 10px 10px;
    text-align:center;
    font-weight:600;
    cursor:pointer;
    overflow:hidden;
    letter-spacing:1px;
    transition:0.5s;
    box-sizing: content-box;
    :hover{
        text-shadow:1px 1px 5px silver;
        letter-spacing:3px;
        transition:0.5s;
    }
`
export const Search=styled.div`
    position:absolute;
    right:340px;
    width:240px;
    height:50px;
    #s{
        position:absolute;
        right:25px;
        padding:10px 0;
        width:30px;
        height:30px;
        cursor:pointer;
        box-sizing:content-box;
    }
`
export const InputWrapper=styled.div`
    position:relative;
    display:inline-block;
    width:220px;
    height:30px;
    opacity:0;
    input{
        display:inline-block;
        width:137px;
        height:26px;
        margin-top:10px;
        outline: none;
        font-size:15px;
        padding:0 35px 0 10px;
        border-radius:10px;
        background-color:white;
        box-sizing:content-box;
        color:black;
    }
    #doge{
        position:relative;
        cursor:pointer;
        top:-2px;
        right:35px;
        width:25px;
        height:25px;
    }

`

export const UserButton=styled.div`
    position:absolute;
    right:40px;
    font-weight:bold;
    margin:12px 0 0 0; 
    cursor:pointer;
`