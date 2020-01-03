import _ from 'lodash';
import { getAssetsUrlById } from './getters';

const createSlug = (name, shade) => (shade !== '') ? name + '-' + shade : name;

const hexToRgb = hex => {
    if (!hex) return false;
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const RGBtoString = rgb => {
    if (!rgb) return false;
    return rgb.r + ',' + rgb.g + ',' + rgb.b;
};

const getShadePosition = (shade, array) => array.indexOf(shade);

const filterActiveSections = dom => dom.filter(section => section.active);

const filterActiveComponents = dom => {
    return dom.map(section => {
        section.components = section.components.filter(component => component.active);
        return section;
    });
};

const filterActiveFields = dom => {
    return dom.map(section => {
        section.components.map(component => {
            _.mapKeys(component.fields, (value, key) => {
                if (!value.active) {
                    _.unset(component.fields, key);
                }
            });
            return component;
        });
        _.mapKeys(section.fields, (value, key) => {
            if (!value.active) {
                _.unset(section.fields, key);
            }
        });
        return section;
    });
};

const extractActiveValue = dom => {
    return filterActiveFields(filterActiveComponents(filterActiveSections(_.cloneDeep(dom))));
};

const getLanguageISO = language => language.split('-')[0];
const getCountryISO = language => language.split('-')[1];
const arrayToString = array => array.join('');

const extractFontValueToCSS = async (This, font, locale) => {
    return `@font-face {
                 font-family: "${ font.fields.name[locale] }";
                 font-style: ${ font.fields.style[locale].toLowerCase() };
                 font-weight: ${ font.fields.weight[locale][1] };
                 src: local('${ font.fields.name[locale] }'), 
                 url('${ await getAssetsUrlById(This, font.fields.fontFile[locale].sys.id, locale) }') 
                 format('truetype');
            }`;
};

const sum = (a, b) => {
    return a + b;
};

const hasNotSamePropertyValue = (defaultValue, currentValue, prop) => {
    if (!defaultValue || !currentValue || !prop || prop === '') {
        return false;
    }
    if (defaultValue[prop] && currentValue[prop] !== defaultValue[prop]) return true;
    return false;
};


const getUrlFromContent = (content) => {
    let urls = [];
    if (content && !_.isEmpty(content)) {
        if(content.images && !_.isEmpty(content.images)){
            content.images.map( img => {
                if(img.asset && !_.isEmpty(img.asset)){
                    _.mapKeys(img.asset, (value, key) => {
                        urls.push(value.url)
                    })
                }
            })
        }
    }
    return urls;
}

const extractAssetUrl = ( dom ) => {
    let urls = [];
    dom.map(section => {
            _.mapKeys(section.fields, (value, key) =>  urls = [...urls, ...getUrlFromContent(value.content)]);

        section.components.map(component => {
            _.mapKeys(component.fields, (value, key) =>  urls = [...urls, ...getUrlFromContent(value.content)]);
        });
    });
    return urls.filter((item, index) => urls.indexOf(item) === index).filter(( element ) => element !== undefined);
}

export {
    getShadePosition,
    extractActiveValue,
    getLanguageISO,
    getCountryISO,
    createSlug,
    hexToRgb,
    RGBtoString,
    arrayToString,
    extractFontValueToCSS,
    sum,
    hasNotSamePropertyValue,
    extractAssetUrl
};
