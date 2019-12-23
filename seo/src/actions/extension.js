export const initExtensionInformation = object => ({
    type: 'INIT_EXTENSION_INFORMATION',
    extension: object

});
export const getCurrentExtension = state => ({
    type: 'GET_EXTENSION',
    extension: state.extension
});
