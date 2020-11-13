import mapKeys from 'lodash/mapKeys'

const getLanguageISO = language => language.split('-')[0];
const getCountryISO = language => language.split('-')[1];
const arrayToString = array => array.join('');

const extractAssetUrl = ( seo ) => {
    let urls = [];

    mapKeys(seo.pages, (value, key) => {
        mapKeys(value, (value, key) => {
            if(value.image){
                mapKeys(value.image, (value, key) => {
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
