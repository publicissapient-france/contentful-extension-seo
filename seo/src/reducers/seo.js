import update from 'react-addons-update';
import isEqual from 'lodash/isEqual'

const seo = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SEO' :
            if(!Array.isArray(action.seo.pages)){
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
            console.log('action.page', action.page);
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
            }else if(state.pages && state.pages.find(page => page.id === action.page.sys.id)){
                const pageOnStore = state.pages.find(page => page.id === action.page.sys.id);
               if(!isEqual(pageOnStore.name, action.page.fields.name ) || !isEqual(pageOnStore.slug, action.page.fields.slug )){
                   return update(state, {
                       pages: {
                           [state.pages.indexOf(pageOnStore)]: {
                               name: { $set:  action.page.fields.name },
                               slug: { $set: action.page.fields.slug }
                           }
                       }
                   });
               }
            }

          case 'INIT_PAGE_FORMATION' :
            console.log('action.page', action.page);
            if (state.pages && !state.pages.find(page => page.id === action.page.sys.id)) {
                const newFormation = {
                    id: action.page.sys.id,
                    name: action.page.fields.name,
                    slug: action.page.fields.slug,
                    type : 'formation'
                };
                return update(state, {
                    pages: {
                        $push: [
                            newFormation
                        ]
                    }
                });
            }else if(state.pages && state.pages.find(page => page.id === action.page.sys.id)){
                const formationOnStore = state.pages.find(page => page.id === action.page.sys.id);
               if(!isEqual(formationOnStore.name, action.page.fields.name ) || !isEqual(formationOnStore.slug, action.page.fields.slug )){
                   return update(state, {
                       pages: {
                           [state.pages.indexOf(formationOnStore)]: {
                               name: { $set:  action.page.fields.name },
                               slug: { $set: action.page.fields.slug }
                           }
                       }
                   });
               }
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
                if(action.locale){
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
                }else{
                    const newValue = {
                        [action.property]: action.value
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
                }

            } else if (state.pages[action.index]
                && state.pages[action.index][action.target]
                && !state.pages[action.index][action.target][action.property]) {
                if(action.locale){
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
                }else{
                    return update(state, {
                        pages: {
                            [action.index]: {
                                [action.target]: {
                                    [action.property]: {$set: action.value}
                                }
                            }
                        }
                    });
                }




            } else if (state.pages[action.index]
                && state.pages[action.index][action.target]
                && state.pages[action.index][action.target][action.property]) {
                if(action.locale){
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
                }else{
                    return update(state, {
                        pages: {
                            [action.index]: {
                                [action.target]: {
                                    [action.property]: {$set: action.value}
                                }
                            }
                        }
                    });
                }

            }

        default:
            return state;
    }
};

export default seo;
