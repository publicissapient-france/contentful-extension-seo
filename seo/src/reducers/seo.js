import update from 'react-addons-update';

const seo = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SEO' :
            return action.seo;

        case 'GET_SEO' :
            return action.state;

        case 'UPDATE_GLOBAL_SEO' :
            console.log('UPDATE_GLOBAL_SEO state', state);
            if (!state.global[action.target]) {
                console.log('target not exist')
                const targetValue = {
                    [action.property] : action.value
                }
                return update(state, {
                    global: {
                        $merge: {
                            [action.target]:  targetValue
                        }
                    }
                });

            } else {
                return update(state, {
                    global: {
                        [action.target]: {
                            [action.property]: {$set: action.value}
                        }
                    }
                });
            }


        default:
            return state;
    }
};

export default seo;
