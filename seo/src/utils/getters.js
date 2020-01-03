
const getElementById = (This, id) => {
    return This.props.extension.space.getEntries({
        'sys.id': id
    }).then(result => result.items[0]);
};

const getAssetsUrlById = (This, id, locale) => {
    return This.props.extension.space
        .getAsset(id)
        .then(result => result.fields.file[locale].url);
};

export {
    getElementById,
    getAssetsUrlById
};
