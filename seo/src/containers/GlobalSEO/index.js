import React, { Component } from 'react';
import {Container, Banner} from "./styled";
import OGP from '../../fields/global/OGP';
import GoogleTagManager from '../../fields/global/GoogleTagManager';

class GlobalSEO extends Component {
    render () {
        return (
            <Container>
                <Banner>
                    <h4> Global SEO</h4>
                </Banner>
                <OGP/>
                <GoogleTagManager/>
            </Container>
        );
    }
}

GlobalSEO.propTypes = {};

export default GlobalSEO;
