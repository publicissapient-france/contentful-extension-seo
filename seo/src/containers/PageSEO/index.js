import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Container, Banner} from "./styled";
import OGP from '../../fields/specific/OGP';
import Base from '../../fields/specific/Base';

class PageSEO extends Component {

    render () {
        const { page , index } = this.props;
        return (
            <Container>
                <Banner>
                    <h4>{ page.slug[Object.keys(page.slug)[0]] }</h4>
                </Banner>
                <div>
                   <Base index={index}/>
                   <OGP index={index}/>
                </div>
            </Container>
        );
    }
}

PageSEO.propTypes = {
    page : PropTypes.object,
    index : PropTypes.number
};

export default PageSEO;
