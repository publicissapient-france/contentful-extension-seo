import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Banner} from "./styled";
import update from 'react-addons-update';
import OGP from '../../fields/OGP';
import GoogleTagManager from '../../fields/GoogleTagManager';


class GlobalSEO extends Component {
    constructor (props) {
        super(props);

        this.state = {

        };
    }


    render () {
        const { dispatch } = this.props;

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

GlobalSEO.propTypes = {
};

export default connect()(GlobalSEO);
