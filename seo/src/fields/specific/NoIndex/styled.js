import styled from 'styled-components';
import { extensionTheme} from "../../../style/theme";

export const Container = styled.div` 
  background : ${extensionTheme.white};
   display : flex;
  box-sizing : border-box;
  align-items : center;
  padding-right : 10px;
  
  input{
    border : 1px solid  ${ extensionTheme.grey80 };
    padding : 0;
    margin-right : 10px;
    box-sizing:border-box;
    line-height : 30px;
  }
  
  label{
    color : ${extensionTheme.black};
  }
`;
