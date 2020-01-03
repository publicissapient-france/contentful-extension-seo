import update from 'react-addons-update';

const visibility = (state = [], action) => {
    switch (action.type) {
    case 'INIT_VISIBILITY' :
        return {
            selectedLanguage: action.locale,
            view: {}
        };


    case 'TOGGLE_SELECTED_LANGUAGE':
        return update(state, {
            selectedLanguage: { $set: action.language }
        });



    default:
        return state;
    }
};

export default visibility;
