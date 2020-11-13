import styled from 'styled-components';
import { extensionTheme} from "../../../style/theme";
import {CommonBanner, CommonTitle} from "../../../style/styledComponents";

export const Container = styled.div` 
  background : ${extensionTheme.white};
`;

export const Title = styled(CommonTitle)``;

export const UrlLink = styled.p`
    line-height : 15px;
    align-self:center;
    font-size:13px;
    font-weight : 400;
    color : ${extensionTheme.blueM};
    text-decoration : underline;
    padding-left : 15px;
`;

export const Banner = styled(CommonBanner)`
  justify-content: flex-start; 
`;