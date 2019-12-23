import styled from 'styled-components';
import { extensionTheme } from '../../../style/theme';

export const Button = styled.button`
   align-self : center;
  cursor : pointer;
  font-size : 14px;
  transition : background .2s ease, background-image .2s ease,opacity .2s ease-in-out,border-color .2s ease;
  background : ${ extensionTheme.redM } !important;  
  color : white !important;
  border-radius : 4px;
  padding : 10px;
  line-height : 11px;
  font-weight : 300;
  height : 33px;
  border : 1px solid transparent;
    margin-left : 10px;

   
  &:hover{
     background : ${ extensionTheme.redL } !important;
    }
  &:focus{
    outline : none;
  }
`;
