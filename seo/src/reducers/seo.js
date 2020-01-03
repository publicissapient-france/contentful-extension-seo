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
            if (!state.pages[action.page.sys.id]) {
                console.log('ADD PAGE', action.page.sys.id)
                const newPage = {
                    name: action.page.fields.name,
                    slug: action.page.fields.slug
                };
                return update(state, {
                    pages: {
                        $merge: {
                            [action.page.sys.id]: newPage
                        }

                    }
                });
            } else {
                console.log('PAGE EXIST', action.page.sys.id);
            }

        case 'UPDATE_PAGE_SEO' :
            console.log('UPDATE_PAGE_SEO state', state);
            console.log('UPDATE_PAGE_SEO', action)


            if (state.pages[action.id] && !state.pages[action.id][action.target]) {
                console.log('target not exist')
                const newValue = {
                    [action.property]: {
                        [action.locale]: action.value
                    }
                }
                console.log('new targetValue', newValue)
                return update(state, {
                    pages: {
                        [action.id]: {
                            $merge: {
                                [action.target]: newValue
                            }
                        }

                    }
                });
            } else if (state.pages[action.id]
                && state.pages[action.id][action.target]
                && !state.pages[action.id][action.target][action.property]) {
                const newValue = {
                    [action.locale]: action.value
                }

                return update(state, {
                    pages: {
                        [action.id]: {
                            [action.target]: {
                                [action.property]:  {$set: newValue}
                            }
                        }
                    }
                });
            }else if(state.pages[action.id]
                && state.pages[action.id][action.target]
                && state.pages[action.id][action.target][action.property]){
                return update(state, {
                    pages: {
                        [action.id]: {
                            [action.target]: {
                                [action.property]: {
                                    [action.locale]: {$set: action.value}
                                }
                            }
                        }
                    }
                });
            }

        /*if (!state.pages[action.id][action.target]) {
            console.log('target not exist')
            const targetValue = {
                [action.property]: {
                    [action.locale]: action.value
                }
            }
            return update(state, {
                pages: {
                    [action.id]: {
                        $merge: {
                            [action.target]: targetValue
                        }
                    }

                }
            });

        } else {
            return update(state, {
                pages: {
                    [action.id]: {
                        [action.target]: {
                            [action.property]: {
                                [action.locale]: {$set: action.value}
                            }

                        }
                    }
                }
            });
        }*/

        default:
            return state;
    }
};

export default seo;
