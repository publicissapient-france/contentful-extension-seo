const extension = (state = [], action) => {
    switch (action.type) {
    case 'INIT_EXTENSION_INFORMATION' :
        return action.extension;

    case 'GET_EXTENSION' :
        return action.state;

    default:
        return state;
    }
};

export default extension;
