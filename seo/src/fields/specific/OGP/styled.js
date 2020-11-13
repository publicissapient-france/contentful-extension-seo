import styled from 'styled-components';
import { extensionTheme} from "../../../style/theme";
import {CommonBanner, CommonTitle} from "../../../style/styledComponents";

export const Container = styled.div`
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
     margin-top : 10px;
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


export const Fields = styled.div`
  padding : 0 10px 10px 10px;
  border-bottom : 1px solid ${ extensionTheme.grey20 };

`;

export const Title = styled(CommonTitle)``;

export const Banner = styled(CommonBanner)``;