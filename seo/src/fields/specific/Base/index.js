import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePage} from "../../../actions";
import {Container, Title, Field, Banner, Fields} from './styled'
import {Icon} from '../../../style/styledComponents'
import LanguageToggle from '../../../containers/LanguageToggle'
import SvgContent from '../../../components/svg/SvgContent';

const Base = ({dispatch, storeValue, index, selectedLanguage}) => {
    const [openFields, setOpenFields] = useState(false);

    const toggleOpenFields = () => setOpenFields(!openFields);

    return (
        <Container>
            <Banner>
                <Title>Base</Title>
                <div>
                    <LanguageToggle
                        hidden={!openFields}/>
                    <Icon className={openFields ? 'active' : ''}
                          onClick={() => toggleOpenFields()}><SvgContent/></Icon>
                </div>
            </Banner>
            <Fields className={!openFields ? 'hidden' : ''}>
                <Field>
                    <label>{`<title> content`}</label>
                    <input type={'text'}
                           value={storeValue && storeValue.title && storeValue.title[selectedLanguage] ? storeValue.title[selectedLanguage] : ''}
                           onChange={e => {
                               dispatch(updatePage('Base', 'title', e.target.value, index, selectedLanguage))
                           }}/>
                </Field>
                <Field>
                    <label>{`<meta name="description"> content`}</label>
                    <input type={'text'}
                           value={storeValue && storeValue.description && storeValue.description[selectedLanguage] ? storeValue.description[selectedLanguage] : ''}
                           onChange={e => {
                               dispatch(updatePage('Base', 'description', e.target.value, index, selectedLanguage))
                           }}/>
                </Field>
            </Fields>
        </Container>
    );
}

Base.propTypes = {
    storeValue: PropTypes.object,
    index: PropTypes.number,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    storeValue: state.seo.pages[ownProps.index]['Base'] || null,
    selectedLanguage: state.visibility.selectedLanguage
});

export default connect(mapStateToProps)(Base);
