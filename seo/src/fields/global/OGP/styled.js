import styled from 'styled-components';
import { extensionTheme} from "../../../style/theme";

export const Container = styled.div`
  padding : 10px;
  background : ${extensionTheme.white};
`;

export const Field = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
  box-sizing : border-box;
  
  input{
    border : 1px solid  ${ extensionTheme.grey80 };
    width : 100%;
    padding : 0;
    padding-left : 5px;
    box-sizing:border-box;
    line-height : 30px;
    
    &.updated{
        background : ${ extensionTheme.blueM };
        color :  ${ extensionTheme.white };
    }
  }
  
  select {
    &.updated{
            background : ${ extensionTheme.blueM };
            color : ${ extensionTheme.white }
        }
  }
  
  label {
    font-size : 12px;
    font-weight : 300;
    color :  ${ extensionTheme.grey80 };
  }
  
  span {
    font-size : 11px;
    color :  ${ extensionTheme.grey50 };
    margin-top:3px;
  }
  
  &.open{
    display: flex;
  }
`;

export const Title = styled.p`
    line-height : 15px;
    padding-bottom : 5px;
    align-self:center;
    font-size:13px;
    font-weight : 400;
    opacity:0.7;
`;
