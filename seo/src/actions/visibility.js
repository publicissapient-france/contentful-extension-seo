export const initVisibility = (locale) => ({
    type: 'INIT_VISIBILITY',
    locale : locale
});
export const toggleLanguage = locale => ({
    type: 'TOGGLE_SELECTED_LANGUAGE',
    language: locale
});

export const getCurrentLanguage = state => ({
    type: 'GET_LANGUAGE',
    language: state.visibility.selectedLanguage
});
