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

export const initPage = (page) => ({
    type: 'INIT_PAGE',
    page : page
});

export const updatePage = (target, property, value, index, locale) => ({
    type: 'UPDATE_PAGE_SEO',
    target: target,
    property : property,
    value : value,
    index : index,
    locale : locale,
});

export const removeDeletedPages = (pages) => ({
    type: 'REMOVE_DELETED_PAGES',
    pages : pages
});
