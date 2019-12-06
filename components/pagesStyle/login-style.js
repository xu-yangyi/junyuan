import styled from 'styled-components';


export const LoginBox = styled.div`
    position:relative;
    width:400px;
	padding:10px 50px;
	margin: 70px auto 190px auto;
	padding-top: 20px;
	background: #fff;
	box-shadow: 8px 8px 8px rgba(0,0,0,.1);
	border-radius:6px;
	#findBack{
        margin:0 0 0 145px;
        font-size:2px;
        color:grey;
	}
    #findBack:hover{
	    color:black;
	    text-decoration:underline;
	    font-weight:bold;
	    cursor:pointer;
	}
	#zhuce{
	    margin:0 0 0 10px;
        color:grey;
        font-size:2px;
        cursor:pointer;
	}
	#zhuce:hover{
	    color:black;
	    text-decoration:underline;
	    font-weight:bold
	}
	    
    #code{
        display: inline-block;
        width: 110px;
        height: 25px;
        line-height: 30px;
        padding: 0 10px;
        margin: 14px 0 0 60px ;
        color: #777;
	}
	#captcha{
        display: inline-block;
        position:relative;
        top:6px;
        left:5px;
        width: 60px;
        height:30px;
	}
`;

export const Input = styled.input`
	display: block;
	width: 180px;
	height: 25px;
	line-height: 30px;
	padding: 0 10px;
	margin: 14px auto 0 auto;
	color: #777;

`;

export const Button = styled.div`
	width: 220px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #19212C;
	border-radius: 15px;
	margin: 5px auto 15px auto;
	text-align: center;
	cursor:pointer;
`;

export const Label = styled.div`
    margin:-6px 0 -12px 85px;
    color:red;
    font-size:2px;
    cursor:pointer;
`