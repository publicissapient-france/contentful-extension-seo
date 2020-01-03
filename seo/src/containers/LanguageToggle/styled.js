import styled from 'styled-components';
import { extensionTheme } from '../../style/theme';

export const Languages = styled.div`
  display : flex;
  height : auto;
  align-items : center;
  width : fit-content;
  justify-content : space-between;
  border-right : 1px solid ${ extensionTheme.grey30 }; 
  padding-right : 20px;
`;

export const ToogleLanguage = styled.div`
  width : 22px;
  height : 20px;
  display : flex;
  border-width : 1px;
  border-style : solid;
  border-color :  ${ extensionTheme.grey40 }; 
  color :  ${ extensionTheme.grey40 }; 
  border-radius : 3px;
  font-size : 11px;
  letter-spacing:1px;
  justify-content : center;
  align-items : center;
  cursor : pointer;
  background : ${ extensionTheme.white }; 
  transition: background 0.6s ease, color 0.6s ease;
  margin-left : 10px;
  
  &.active{
    color :  ${ extensionTheme.white }; 
    background : ${ extensionTheme.blueM }; 
    border-color :  ${ extensionTheme.blueM }; 
  }
`;
