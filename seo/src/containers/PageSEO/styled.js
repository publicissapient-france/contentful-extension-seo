import styled from 'styled-components';
import {extensionTheme} from "../../style/theme";

export const Container = styled.div`
  border: 1px solid ${ extensionTheme.grey20 };
  border-left : 5px solid ${extensionTheme.blueM}
  background : white;
  margin-bottom : 10px;
  box-sizing : border-box;
  margin-left : 10px;
  margin-right : 10px;
 `;

export const Banner = styled.div`
  display : flex;
  width : 100%;
  padding-left : 10px;
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
    margin: 0;
    padding : 0;
  }
`;