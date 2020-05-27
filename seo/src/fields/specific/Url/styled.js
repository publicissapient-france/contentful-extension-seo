import styled from 'styled-components';
import { extensionTheme} from "../../../style/theme";

export const Container = styled.div` 
  background : ${extensionTheme.white};
`;



export const Title = styled.p`
    line-height : 15px;
    padding-bottom : 5px;
    align-self:center;
    font-size:13px;
    font-weight : 600;
    opacity:0.5;
`;

export const UrlLink = styled.p`
    line-height : 15px;
    padding-bottom : 5px;
    align-self:center;
    font-size:13px;
    font-weight : 400;
    color : ${extensionTheme.blueM};
    text-decoration : underline;
    padding-left : 15px;
`;

export const Banner = styled.div`
  display : flex;
  width : 100%;
  height : 40px;
  padding-left : 10px;
  background : ${ extensionTheme.grey10 };
  box-sizing : border-box;
  font-weight : 400;
  border-bottom : 1px solid ${ extensionTheme.grey20 }; 
  justify-content: flex-start;
  padding-right : 3px;
  
  & h4{
    line-height : 15px;
    align-self:center;
    font-size:13px;
    font-weight : 700;
    opacity:0.7;
    margin: 0;
    padding : 0;
    
  }
 
`;