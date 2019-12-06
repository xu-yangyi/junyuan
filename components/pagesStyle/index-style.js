import styled from 'styled-components'

export const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:#333333;
    overflow:hidden;
    
    .sun{
        position:absolute;
        right:50px;
        top:30px;
        width:9%;
        height:17%;
        opacity: 0;
        transform-origin:50% 400%;
        transform:rotate(-90deg);
    }
    .sunIn1-enter, .sunIn1-appear{
        opacity: 0;
        transform:rotate(-90deg);
    }
    .sunIn1-enter-active, .sunIn1-appear-active{
        opacity: 1;
        transition:all 1s ease-in;
        animation:go 1s linear infinite;
        @keyframes go{
            0%{opacity:0;transform:rotate(-90deg)}
            50%{opacity:0;}
            90%{transform:rotate(10deg)}
            100%{opacity:1;transform:rotate(0deg)}
        }
    } 
    .sunIn1-enter-done{
        opacity: 1;
        transform-origin:50% 50%;
        transform:rotate(0deg);
        animation:spin1 21s linear infinite;
        @keyframes spin1{
            0%{transform:rotate(0) scale(1)}
            25%{transform:rotate(90deg) scale(1.2)}
            50%{transform:rotate(180deg) scale(1.1)}
            75%{transform:rotate(270deg) scale(1.2)}
            100%{transform:rotate(360deg) scale(1) }
        }
    }
    .sunIn1-exit-active{
        animation:sunExit1 1s linear infinite;
        @keyframes sunExit1 {
            0%{opacity:1;transform:rotate(0deg)}
            100%{opacity:0;transform:rotate(60deg)}
        }
    }
    .sunIn1-exit-done{
        opacity: 0;
        transform:rotate(60deg);
    }
    
    .sunIn2-enter, .sunIn2-appear{
        opacity: 0;
        transform:rotate(-90deg);
    }
    .sunIn2-enter-active, .sunIn2-appear-active{
        animation:sunIn21 1s linear infinite;
        @keyframes sunIn21{
            0%{opacity:0;transform:rotate(-90deg)}
            50%{opacity:0;}
            90%{transform:rotate(10deg)}
            100%{opacity:1;transform:rotate(0deg)}
        }
    } 
    .sunIn2-enter-done{
        transform-origin:50% 50%;
        animation:spin2 21s linear infinite;
        @keyframes spin2{
            0%{transform:rotate(0) scale(1);opacity:1;}
            25%{transform:rotate(90deg) scale(0.8)}
            50%{transform:rotate(180deg) scale(1.1)}
            75%{transform:rotate(270deg) scale(0.8)}
            100%{transform:rotate(360deg) scale(1);opacity:1; }
        }
    }
    .sunIn2-exit-active{
        animation:sunExit2 1s linear infinite;
        @keyframes sunExit2 {
            0%{opacity:1;transform:rotate(0deg)}
            100%{opacity:0;transform:rotate(60deg)}
        }
    }
    .sunIn2-exit-done{
        opacity: 0;
        transform:rotate(60deg);
    }
    
    .moon{
        position:absolute;
        right:70px;
        top:60px;
        opacity: 0;
        zoom:0.45;
    }
    .moon1-enter, .moon1-appear{
        opacity: 0;
        transform-origin:50% 400%;
        transform:rotate(-90deg);
    }
    .moon1-enter-active, .moon1-appear-active{
        transition:all 1s ease-in;
        animation:moon11 1s linear infinite;
        @keyframes moon11{
            0%{opacity:0;transform:rotate(-90deg)}
            50%{opacity:0;}
            90%{transform:rotate(10deg)}
            100%{opacity:1;transform:rotate(0deg)}
        }
    } 
    .moon1-enter-done{
        opacity:1;
        transform:rotate(0deg)
    }
    .moon1-exit-active{
        transform-origin:50% 400%;
        animation:moonExit1 1s linear infinite;
        @keyframes moonExit1 {
            0%{opacity:1;transform:rotate(0deg)}
            100%{opacity:0;transform:rotate(60deg)}
        }
    }
    .moon1-exit-done{
        opacity: 0;
        transform:rotate(60deg);
    }
    
    
    .moon2-enter, .moon2-appear{
        opacity: 0;
        transform-origin:-50% -50%;
        transform:rotate(-50deg);

    }
    .moon2-enter-done{
        opacity:1;
        zoom:0.5;   
        transform-origin:-50% -50%;
        animation:moon21 21s linear infinite;
        @keyframes moon21 {
            0%{transform:rotate(-50deg)}
            99%{opacity:1;transform:rotate(50deg)}
            100%{opacity:0}
        }
    }
    .moon2-exit-active{
        transform-origin:50% 400%;
        animation:moonExit1 1s linear infinite;
        @keyframes moonExit1 {
            0%{opacity:1;transform:rotate(0deg)}
            100%{opacity:0;transform:rotate(60deg)}
        }
    }
    .moon2-exit-done{
        display:none;
    }

    
    .wave1{
        position:absolute;
        right:0px;
        left:0px;
        top:89%;
        zoom:0.46;
        opacity: 0;
    }
    .wave1In-enter, .wave1In-appear{
        opacity: 0;
    }
    .wave1In-enter-active, .wave1In-appear-active{
        opacity: 1;
        animation:wave11 2s linear 1;
        @keyframes wave11{
            0%{opacity:0;top:100%;left:0px;}
            20%{opacity:1;left:-20px;}
            35%{left:0px;}
            50%{left:-20px;}
            65%{left:0px;}
            70%{left:-20px;}
            100%{top:89%;left:0px;}
        }
    } 
    .wave1In-enter-done{
        opacity: 1;
        top:89%;
        animation:wave12 12s linear infinite;
        @keyframes wave12{
            0%{top:89%;left:0px;}
            20%{top:88%;left:-20px;}
            35%{top:89%;left:0px;}
            50%{top:88%;left:-20px;}
            65%{top:89%;left:0px;}
            70%{top:88%;left:-20px;}
            100%{top:89%;left:0px;}
        }
    }
    
    .wave2{
        position:absolute;
        right:0;
        left:-50px;
        top:89%;
        zoom:0.46;
        opacity: 0;
    }
    .wave2In-enter, .wave2In-appear{
        opacity: 0;
    }
    .wave2In-enter-active, .wave2In-appear-active{
        opacity: 1;
        animation:wave21 2s linear 1;
        @keyframes wave21{
            0%{opacity:0;top:100%;left:-50px;}
            20%{opacity:1;left:-20px;}
            35%{left:-50px;}
            50%{left:-20px;}
            65%{left:-50px;}
            70%{left:-20px;}
            100%{top:92%;left:-50px;}
        }
    } 
    .wave2In-enter-done{
        opacity: 1;
        top:92%;
        animation:wave22 12s linear infinite;
        @keyframes wave22{
            0%{top:92%;left:-50px;}
            20%{top:91%;left:-20px;}
            35%{top:92%;left:-50px;}
            50%{top:91%;left:-20px;}
            65%{top:92%;left:-50px;}
            70%{top:91%;left:-20px;}
            100%{top:92%;left:-50px;}
        }
    }
        
        
    .shark{
        position:absolute;
        right:0px;
        bottom:0;
        zoom:0.15;
        opacity: 1;
        animation:sharkIn 44s linear infinite;
        @keyframes sharkIn{
            0%{right:-20%;bottom:0;transform:scaleX(1)}
            5%{bottom:-3%;}
            10%{bottom:2%;}
            15%{bottom:-3%;}
            20%{bottom:2%;}
            25%{bottom:-3%;}
            30%{bottom:2%;}
            35%{bottom:-3%;}
            40%{bottom:2%;}
            45%{bottom:-3%;}
            49%{transform:scaleX(1)}
            50%{right:110%;bottom:0;transform:scaleX(-1)}
            55%{bottom:-3%;}
            60%{bottom:2%;}
            65%{bottom:-3%;}
            70%{bottom:2%;}
            75%{bottom:-3%;}
            80%{bottom:2%;}
            85%{bottom:-3%;}
            90%{bottom:2%;}
            95%{bottom:-3%;}
            99%{transform:scaleX(-1)}
            100%{right:-10%;bottom:0;transform:scaleX(1)}
        }
    }
    
    
    #junyuan{
        width:16%;
        height:22%;
        position:absolute;
        top:22%;
        left:42%;
    }
    #intro1{
        width:23%;
        height:6%;
        position:absolute;
        top:43%;
        left:39%;
    }
    #btn{
        width:4%;
        height:4%;
        position:absolute;
        top:50%;
        left:48%;
        textAlign:center;
        padding:0;
        fontWeight:bold;
    }
    .hi{
        opacity:0;
    }
    .center-enter, .center-appear{
        opacity: 0;
        margin-top:20px;
    }
    .center-enter-active, .center-appear-active{
        animation:center1 2s linear 1;
        @keyframes center1{
            0%{margin-top:100px;opacity: 0;}
            50%{margin-top:100px;opacity: 0;}
            87%{margin-top:-20px;}
            92%{margin-top:-30px;}
            97%{margin-top:-20px;}
            100%{margin-top:0;opacity: 1;}
        }
    } 
    .center-enter-done{
        opacity: 1;
        margin-top:0px;
    }
    
    
    .btn-enter, .btn-appear{
        opacity: 0;
        transform:scale(2)
    }
    .btn-enter-active, .btn-appear-active{
        animation:btn1 3s linear 1;
        @keyframes btn1{
            0%{transform:scale(2);opacity: 0;}
            66%{transform:scale(2);opacity: 0;}
            100%{transform:scale(1);opacity: 1;}
        }
    } 
    .btn-enter-done{
        opacity: 1;
        transform:scale(1);
    }
    }
`
