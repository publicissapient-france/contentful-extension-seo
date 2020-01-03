import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Container, Title, Field,Banner, Fields , ChoiceItemsConfirm } from './styled'
import LanguageToggle from '../../../containers/LanguageToggle'
import SvgContent from '../../../components/svg/SvgContent';
import { Icon } from '../../../style/styledComponents'

import {getCurrentLanguage, updatePage} from "../../../actions";

class OGP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openFields : false
        };
    }

    componentDidMount(){}

    componentDidUpdate(prevProps, prevState) {

    }

    toggleOpenFields = () => {
        console.log('TOGGLE OPEN FIELDS')
        this.setState(prevState => ({
            openFields: !prevState.openFields,
        }));
    }

    render() {
        const { dispatch, storeValue, idPage, selectedLanguage } = this.props;

        console.log('storevalue on specific OGP', storeValue);
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
                                   dispatch(updatePage('OGP', 'title', e.target.value, idPage, selectedLanguage))
                               }}/>

                    </Field>
                    <Field>
                        <label>og:description</label>
                        <input type={'text'}
                               value={storeValue && storeValue.description && storeValue.description[selectedLanguage] ? storeValue.description[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'description', e.target.value, idPage, selectedLanguage))
                               }}/>

                    </Field>
                    <Field>
                        <label>og:type</label>
                        <input type={'text'}
                               value={storeValue && storeValue.type && storeValue.type[selectedLanguage] ? storeValue.type[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'type', e.target.value, idPage, selectedLanguage))
                               }}/>

                    </Field>
                    <Field>
                        <label>og:url</label>
                        <input type={'text'}
                               value={storeValue && storeValue.url && storeValue.url[selectedLanguage] ? storeValue.url[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'url', e.target.value, idPage, selectedLanguage))
                               }}/>
                    </Field>
                    <Field>
                        <label>og:image</label>
                        <input type={'text'}
                               value={storeValue && storeValue.image && storeValue.image[selectedLanguage] ? storeValue.image[selectedLanguage] : ''}
                               onChange={e => {
                                   dispatch(updatePage('OGP', 'image', e.target.value, idPage, selectedLanguage))
                               }}/>
                    </Field>
                </Fields>


                {

                    /*<ChoiceItemsConfirm className={''}>
                        <ButtonBasic label={'Cancel'} disabled={false}/>
                        <ButtonValidate label={'Update'} disabled={false} action={() => {
                            console.log('click on validate')
                        }}/>
                    </ChoiceItemsConfirm>*/
                }


            </Container>
        );
    }
}

const mapStateToProps = ( state, ownProps) => ({
    storeValue : state.seo.pages[ownProps.idPage]['OGP'] || null,
    selectedLanguage: state.visibility.selectedLanguage
});


export default connect(mapStateToProps)(OGP);
