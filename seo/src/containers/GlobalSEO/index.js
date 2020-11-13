import React from 'react';
import {Container, Banner, Contain} from "./styled";
import OGP from '../../fields/global/OGP';
import GoogleTagManager from '../../fields/global/GoogleTagManager';

const GlobalSEO = () => {
    return (
        <Container>
            <Banner>
                <h4> Global SEO</h4>
            </Banner>
            <Contain>
                <OGP/>
                <GoogleTagManager/>
            </Contain>
        </Container>
    );
}

GlobalSEO.propTypes = {};

export default GlobalSEO;
