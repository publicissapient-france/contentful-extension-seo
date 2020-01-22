import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Banner} from "./styled";
import PageSEO from '../PageSEO'

class ListPages extends Component {
     render () {
        const { pages } = this.props;

        return (
            <Container>
                <Banner>
                    <h4>Pages SEO </h4>
                </Banner>
                {
                    pages ?
                        pages.map( (page, index) => {
                            return <PageSEO key={index} page={page} index={index}  />
                        })
                        : null
                }
            </Container>
        );
    }
}

ListPages.propTypes = {
    pages : PropTypes.array
};

const mapStateToProps = ({ seo }) => ({
    pages: seo.pages,
});
export default connect(mapStateToProps)(ListPages);
