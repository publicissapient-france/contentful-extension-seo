import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePage} from "../../../actions";
import { Container, Title, Field,Banner, Fields } from './styled'
import { Icon } from '../../../style/styledComponents'
import LanguageToggle from '../../../containers/LanguageToggle'
import SvgContent from '../../../components/svg/SvgContent';
import ImageUploader from '../../../components/ImageUploader'


class OGP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openFields : false
        };
    }

    toggleOpenFields = () => {
        this.setState(prevState => ({
            openFields: !prevState.openFields,
        }));
    }

    updateImage = (url) => {
        this.props.dispatch(updatePage('OGP', 'image',url, this.props.index, this.props.selectedLanguage))
    }

    render() {
        const { dispatch, storeValue, index, selectedLanguage } = this.props;
        return (
            <Container>
                <Banner>
                    <Title>Open Graph protocol (OGP)</Title>
                    <div>
                        <LanguageToggle
                            hidden={!this.state.openFields}/>
                        <Icon className={this.state.openFields ? 'active' : ''}
                              onClick={() => {
                                  this.toggleOpenFields();
                              }}><SvgContent/></Icon>
                    </div>
                </Banner>
                <Fields className={!this.state.openFields ? 'hidden' : ''}>
                    <Field>
                        <label>og:title</label>
                        <input type={'text'}
                               value={storeValue && storeValue.title && storeValue.title[selectedLanguage] ? storeValue.title[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'title', e.target.value, index, selectedLanguage))
                               }}/>
                    </Field>
                    <Field>
                        <label>og:description</label>
                        <input type={'text'}
                               value={storeValue && storeValue.description && storeValue.description[selectedLanguage] ? storeValue.description[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'description', e.target.value, index, selectedLanguage))
                               }}/>
                    </Field>
                    <Field>
                        <label>og:type</label>
                        <input type={'text'}
                               value={storeValue && storeValue.type && storeValue.type[selectedLanguage] ? storeValue.type[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'type', e.target.value, index, selectedLanguage))
                               }}/>
                    </Field>
                    <Field>
                        <label>og:url</label>
                        <input type={'text'}
                               value={storeValue && storeValue.url && storeValue.url[selectedLanguage] ? storeValue.url[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'url', e.target.value, index, selectedLanguage))
                               }}/>
                    </Field>
                    <Field>
                        <label>og:image</label>
                        <ImageUploader image={storeValue && storeValue.image && storeValue.image[selectedLanguage] ? storeValue.image[selectedLanguage] : null} updateImage={this.updateImage} />
                    </Field>
                </Fields>
            </Container>
        );
    }
}

OGP.propTypes = {
    storeValue : PropTypes.object,
    index : PropTypes.number,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = ( state, ownProps) => ({
    storeValue : state.seo.pages[ownProps.index]['OGP'] || null,
    selectedLanguage: state.visibility.selectedLanguage
});

export default connect(mapStateToProps)(OGP);
