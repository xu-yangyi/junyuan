import styled from 'styled-components';

export const RegisterBox = styled.div`
    position:relative;
    width:460px;
	padding:10px 50px;
	margin: 0 auto;
	padding-top: 20px;
    margin: 70px auto 190px auto;
	background: #fff;
	box-shadow: 8px 8px 8px rgba(0,0,0,.1);
	border-radius:6px;
`;
export const InputWrapper = styled.div`
    width:260px;
    height:30px;
    margin:4px auto;
    #check-on{
        position:relative;
        top:-36px;
        left:245px;
    	width: 60px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        background: #19212C;
        font-size:7px;
        border-radius: 4px;
        text-align: center;
        cursor:pointer;
	}
    #check-off{
        position:relative;
        top:-36px;
        left:245px;
    	width: 60px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        background: #A5A5A5;
        font-size:7px;
        border-radius: 4px;
        text-align: center;
	}
`

export const Input = styled.input`
	display: inline-block;
	width: 170px;
	height: 26px;
	line-height: 30px;
	padding: 0 10px;
	margin: 10px auto;
	color: #777;
`;

export const Button = styled.div`
	width: 220px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #19212C;
	border-radius: 15px;
	margin: 15px auto;
	text-align: center;
	cursor:pointer;
`;
export const Error = styled.div`
    position:absolute;
    top:10px;
    left:150px;
    width:150px;
    font-size:12px;
    color:red;
`
