import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Languages, ToogleLanguage } from './styled';
import { connect } from 'react-redux';
import { getCurrentExtension, getCurrentLanguage, toggleLanguage } from '../../actions/index';
import { getCountryISO } from '../../utils/functions';

class LanguageToggle extends Component {
    render () {
        const { dispatch, extension, selectedLanguage, hidden } = this.props;

        if (!extension.locales) return null;
        return (
            <Languages className={hidden ? 'hidden' : ''}>
                {
                    extension.locales.available.map((language, i) => {
                        return <ToogleLanguage
                            key={i}
                            className={selectedLanguage === language ? 'active' : ''}
                            onClick={e => {
                                dispatch(toggleLanguage(language));
                            }}>{getCountryISO(language)}</ToogleLanguage>;
                    })
                }
            </Languages>
        );
    }
};

LanguageToggle.propTypes = {
    hidden: PropTypes.bool,
    selectedLanguage: PropTypes.string
};

const mapStateToProps = state => ({
    extension: getCurrentExtension(state).extension,
    selectedLanguage: getCurrentLanguage(state).language
});

export default connect(mapStateToProps)(LanguageToggle);
