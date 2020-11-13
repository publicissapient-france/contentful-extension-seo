import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePage} from "../../../actions";
import {Container, Title, Field, Banner, Fields} from './styled'
import {Icon} from '../../../style/styledComponents'
import LanguageToggle from '../../../containers/LanguageToggle'
import SvgContent from '../../../components/svg/SvgContent';

const Data = ({dispatch, storeValue, index, selectedLanguage}) => {
    const [openFields, setOpenFields] = useState(false);

    const toggleOpenFields = () => setOpenFields(!openFields);

    return (
        <Container>
            <Banner>
                <Title>Structured Data</Title>
                <div>
                    <LanguageToggle
                        hidden={!openFields}/>
                    <Icon className={openFields ? 'active' : ''}
                          onClick={() => toggleOpenFields()}><SvgContent/></Icon>
                </div>
            </Banner>
            <Fields className={!openFields ? 'hidden' : ''}>
                <Field>
                    <label>Add scripts to head (json)</label>
                    <textarea type={'text'}
                              value={storeValue && storeValue.structuredData && storeValue.structuredData[selectedLanguage] ? storeValue.structuredData[selectedLanguage] : ''}
                              onChange={e => {
                                  dispatch(updatePage('Data', 'structuredData', e.target.value, index, selectedLanguage))
                              }}/>
                </Field>
            </Fields>
        </Container>
    );
}

Data.propTypes = {
    storeValue: PropTypes.object,
    index: PropTypes.number,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    storeValue: state.seo.pages[ownProps.index]['Data'] || null,
    selectedLanguage: state.visibility.selectedLanguage
});

export default connect(mapStateToProps)(Data);
