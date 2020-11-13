
const getElementById = (extension, id) => {
    return extension.space.getEntries({
        'sys.id': id
    }).then(result => result.items[0]);
};

const getAssetsUrlById = (extension, id, locale) => {
    return extension.space
        .getAsset(id)
        .then(result => result.fields.file[locale].url);
};

export {
    getElementById,
    getAssetsUrlById
};
