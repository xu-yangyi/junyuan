import styled from 'styled-components';

export const Wrapper = styled.div`
    width:100%;
    height:100%;
    padding:0 0 50px 0;
    background-color:#EAEAEA;
`
export const BackToTop = styled.div`
    position:fixed;
    right:30px;
    bottom:60px;
    width:36px;
    height:36px;
    transition:1s;
    opacity:0;
    #icon{
        color:#555555;
        transform:scale(1.8);
        :hover{
            transform:scale(2);
            transition:0.5s;
        }
    }
`