import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Container, Title, UrlLink,Banner } from './styled'

class Url extends Component {

    render() {
        const { storeValue, selectedLanguage } = this.props;
        return (
            <Container>
                <Banner>
                    <Title>Url</Title>
                    <UrlLink>/{ storeValue &&  storeValue[selectedLanguage] !=='home' ? storeValue[selectedLanguage] : ''}</UrlLink>
                </Banner>
            </Container>
        );
    }
}

Url.propTypes = {
    storeValue : PropTypes.object,
    index : PropTypes.number,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = ( state, ownProps) => ({
    storeValue : state.seo.pages[ownProps.index].slug || null,
    selectedLanguage: state.visibility.selectedLanguage
});

export default connect(mapStateToProps)(Url);
