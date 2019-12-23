export const initSEO = object => ({
    type: 'INIT_SEO',
    seo: object
});


export const getCurrentSEO = state => ({
    type: 'GET_SEO',
    seo: state.seo
});

export const updateGlobal = (target, property, value) => ({
    type: 'UPDATE_GLOBAL_SEO',
    target: target,
    property : property,
    value : value
});
