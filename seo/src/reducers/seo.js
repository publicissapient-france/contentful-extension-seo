import update from 'react-addons-update';

const seo = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SEO' :
            if(!Array.isArray(action.seo.pages)){
                console.log('this is not an Array !!!!')
                let arrayPage = [];
                Object.keys(action.seo.pages).map((key, index) =>  {
                    let page = action.seo.pages[key];
                    page.id = key;
                    arrayPage.push(page);
                });

                action.seo.pages = arrayPage;
                return action.seo
            }else{
                return action.seo;
            }


        case 'UPDATE_GLOBAL_SEO' :
            if (!state.global[action.target]) {
                const targetValue = {
                    [action.property]: action.value
                }
                return update(state, {
                    global: {
                        $merge: {
                            [action.target]: targetValue
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

        case 'INIT_PAGE' :
            if (state.pages && !state.pages.find(page => page.id === action.page.sys.id)) {
                const newPage = {
                    id: action.page.sys.id,
                    name: action.page.fields.name,
                    slug: action.page.fields.slug
                };
                return update(state, {
                    pages: {
                        $push: [
                            newPage
                        ]
                    }
                });
            }

        case 'REMOVE_DELETED_PAGES' :
            if (action.pages) {
                let ids = action.pages.map(page => page.sys.id);
                let pages = [...state.pages];
                const result = pages.filter( page => ids.find(id => id === page.id))
                return update(state, {
                    pages: {
                        $set: result
                    }
                });
            }

        case 'UPDATE_PAGE_SEO' :
            if (state.pages[action.index] && !state.pages[action.index][action.target]) {
                const newValue = {
                    [action.property]: {
                        [action.locale]: action.value
                    }
                }
                return update(state, {
                    pages: {
                        [action.index]: {
                            $merge: {
                                [action.target]: newValue
                            }
                        }
                    }
                });
            } else if (state.pages[action.index]
                && state.pages[action.index][action.target]
                && !state.pages[action.index][action.target][action.property]) {
                const newValue = {
                    [action.locale]: action.value
                }

                return update(state, {
                    pages: {
                        [action.index]: {
                            [action.target]: {
                                [action.property]: {$set: newValue}
                            }
                        }
                    }
                });
            } else if (state.pages[action.index]
                && state.pages[action.index][action.target]
                && state.pages[action.index][action.target][action.property]) {
                return update(state, {
                    pages: {
                        [action.index]: {
                            [action.target]: {
                                [action.property]: {
                                    [action.locale]: {$set: action.value}
                                }
                            }
                        }
                    }
                });
            }

        default:
            return state;
    }
};

export default seo;
