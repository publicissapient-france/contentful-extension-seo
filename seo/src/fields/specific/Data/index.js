import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePage} from "../../../actions";
import { Container, Title, Field,Banner, Fields } from './styled'
import { Icon } from '../../../style/styledComponents'
import LanguageToggle from '../../../containers/LanguageToggle'
import SvgContent from '../../../components/svg/SvgContent';

class Data extends Component {
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

    render() {
        const { dispatch, storeValue, index, selectedLanguage } = this.props;
        return (
            <Container>
                <Banner>
                    <Title>Structured Data</Title>
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
}

Data.propTypes = {
    storeValue : PropTypes.object,
    index : PropTypes.number,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = ( state, ownProps) => ({
    storeValue : state.seo.pages[ownProps.index]['Data'] || null,
    selectedLanguage: state.visibility.selectedLanguage
});

export default connect(mapStateToProps)(Data);
