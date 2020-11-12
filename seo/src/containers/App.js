import debounce from 'debounce-fn';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Extension, MainContainer} from '../style/styledComponents';
import isEqual from 'lodash/isEqual';
import {
    initSEO,
    initExtensionInformation,
    initPage,
    initPageFormation,
    initVisibility,
    removeDeletedPages
} from '../actions';
import GlobalSEO from './GlobalSEO'
import ListPages from './ListPages'
import {extractAssetUrl} from '../utils/functions'

const App = ({seo, extension, dispatch}) => {

    useEffect(() => {
        if (extension.field && extension.field.getValue()) {
            dispatch(initSEO(JSON.parse(extension.field.getValue().value)));
            dispatch(initExtensionInformation(extension));
            dispatch(initVisibility(extension.locales.default));
        }

        debounce(onViewingEntryUpdated, {wait: 250});

        let detachFns = [];

        const fields = extension.entry.fields;
        for (let key in fields) {
            detachFns.push(
                fields[key].onValueChanged(onViewingEntryUpdated)
            );
        }
        detachFns.push(
            extension.entry.onSysChanged(onViewingEntryUpdated)
        );

        extension.window.startAutoResizer();

        async function initialization() {
            const pagesOfSpace = await getPagesOfSpace();
            pagesOfSpace.map(page => dispatch(initPage(page)));

            const formationsOfSpace = await getFormationsOfSpace();
            formationsOfSpace.map(page => dispatch(initPageFormation(page)));

            dispatch(removeDeletedPages([...pagesOfSpace, ...formationsOfSpace]))

        }    // Execute the created function directly
        initialization();

        return () => {
            // Anything in here is fired on component unmount.
            detachFns.forEach(detach => detach());
            extension.window.stopAutoResizer();
        }

    }, []);

    useEffect(() => {
        if (!extension.field.getValue()) {
            setFieldValue();
        }

        if (extension.field.getValue() && extension.field.getValue().value && !isEqual(seo, JSON.parse(extension.field.getValue().value))) {
            setFieldValue();
        }
    }, [seo])

    const getPagesOfSpace = async () => {

        return extension.space
            .getEntries({
                'content_type': 'page'
            })
            .then(result => {
                let pages = result.items.map(entry => entry)
                    .filter(page => page.fields.type[extension.locales.default] === 'internal')
                return pages;
            });
    }

    const getFormationsOfSpace = async () => {
        return extension.space
            .getEntries({
                'content_type': 'formation'
            })
            .then(result => {
                let formations = result.items.map(entry => entry)
                return formations;
            });
    }

    const setFieldValue = () => {
        extension.field.removeValue().then(() => {
            const staticResources = extractAssetUrl(seo);

            extension.field.setValue({
                value: JSON.stringify(seo),
                staticResources: staticResources.length !== 0 ? staticResources : ['no-static-resources']
            }).then(() => {
                console.log('NEW SEO VALUE', extension.field.getValue())
            });
        });
    }

    const getElementById = id => {
        return extension.space.getEntries({
            'sys.id': id
        }).then(function (result) {
            return result.items[0];
        });
    }

    const getAssetsUrlById = id => {
        return extension.space
            .getAsset(id)
            .then(result => {
                return result.fields.file[extension.locales.default].url;
            });
    }

    const onError = error => {
        extension.notifier.error(error.message);
    }

    const onViewingEntryUpdated = async () => {
        const latestSys = extension.entry.getSys();
    }

    const openEntry = entryId => {
        return () => {
            extension.navigator.openEntry(entryId, {
                slideIn: true
            });
        };
    }

    return (
        <Extension>
            <MainContainer>
                <GlobalSEO/>
                <ListPages/>
            </MainContainer>
        </Extension>
    );
}

const mapStateToProps = ({seo}) => ({
    seo: seo,
});
export default connect(mapStateToProps)(App);
