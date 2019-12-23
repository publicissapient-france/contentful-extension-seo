import styled from 'styled-components';
import { contentfulTheme, extensionTheme } from '../../../style/theme';

export const Button = styled.button`
   background :  ${ extensionTheme.grey50 };
   color : white;
   font-family:${ contentfulTheme.basicFont };
   font-size : 14px;
   cursor : pointer;
   height : fit-content;
   border : 1px solid  transparent;
   border-radius : 4px;
   padding : 10px;
   line-height : 11px;
   font-weight : 300;
   height : 33px;
   transition : background .2s ease, background-image .2s ease,opacity .2s ease-in-out,border-color .2s ease;

   
   &:hover{
    background :  ${ extensionTheme.grey60 };
   }
   
   &.disable{
       background :  ${ extensionTheme.grey20 };
       color : white;
       border : 1px solid  ${ extensionTheme.grey10 };
   }
   
   &:focus {outline:0;}
   
   
  
`;
