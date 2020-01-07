import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Banner} from "./styled";
import update from 'react-addons-update';
import PageSEO from '../PageSEO'


class ListPages extends Component {
    constructor (props) {
        super(props);

        this.state = {

        };
    }


    render () {
        const { dispatch, pages } = this.props;

        return (
            <Container>
                <Banner>
                    <h4>Page SEO </h4>
                </Banner>
                {
                    pages ?
                        Object.keys(pages).map( (key, index) => {
                            return <PageSEO key={key} page={pages[key]} id={key}  />
                        })
                        : null
                }

            </Container>
        );
    }
}

ListPages.propTypes = {
};

export default connect()(ListPages);
