import _ from 'lodash';

const getLanguageISO = language => language.split('-')[0];
const getCountryISO = language => language.split('-')[1];
const arrayToString = array => array.join('');

const extractAssetUrl = ( seo ) => {
    let urls = [];

    _.mapKeys(seo.pages, (value, key) => {
        _.mapKeys(value, (value, key) => {
            if(value.image){
                _.mapKeys(value.image, (value, key) => {
                    urls.push(value)
                })
            }
        });
    });

    return urls.filter((item, index) => urls.indexOf(item) === index)
               .filter(( element ) => element !== undefined)
               .filter(( element ) => element !== '');
}

export {
    getLanguageISO,
    getCountryISO,
    arrayToString,
    extractAssetUrl
};
