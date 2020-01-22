import styled from 'styled-components';
import {extensionTheme} from "../../style/theme";

export const Container = styled.div`
  border: 1px solid ${ extensionTheme.grey20 };
  background : ${ extensionTheme.grey10 };
  margin-bottom : 10px;
  width : 100%;
 `;

export const Banner = styled.div`
  display : flex;
  width : 100%;
  background : ${ extensionTheme.grey10 }; 
  padding-left : 10px;
  margin-bottom : 10px;
  box-sizing : border-box;
  font-weight : 300;
  border-bottom : 1px solid ${ extensionTheme.grey20 }; 
  justify-content: space-between;
  padding-right : 3px;
  height : 35px;
  
  & h4{
    line-height : 15px;
    align-self:center;
    font-size:13px;
    font-weight : 700;
    opacity:0.7;
  }
  
  & p{
    padding-left : 10px;
    line-height : 15px;
    align-self:center;
    font-size:13px;
    font-weight : 400;
    opacity:0.7;
  }
  
  & input[type='checkbox']{
    height : 34px;
    padding : 0;
    margin : 0;
    
    &:checked{
        background : ${ extensionTheme.blueM }; 
    }
  }
  
  &>div{
    display : flex;
  }
`;