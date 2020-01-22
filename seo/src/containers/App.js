import debounce from 'debounce-fn';
import React from 'react';
import {connect} from 'react-redux';
import {Extension, MainContainer} from '../style/styledComponents';
import isEqual from 'lodash/isEqual';
import {initSEO, initExtensionInformation, initPage, getCurrentSEO, initVisibility, removeDeletedPages} from '../actions';
import GlobalSEO from './GlobalSEO'
import ListPages from './ListPages'
import { extractAssetUrl } from '../utils/functions'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openAddSectionTop: false
        };

        this.onViewingEntryUpdated = debounce(this.onViewingEntryUpdated, {
            wait: 250
        });
    }

    componentDidMount = async () => {
        if (this.props.extension.field && this.props.extension.field.getValue()) {
            console.log('SEO VALUE ON MOUNT', this.props.extension.field.getValue())
            this.props.dispatch(initSEO(JSON.parse(this.props.extension.field.getValue().value)));
            this.props.dispatch(initExtensionInformation(this.props.extension));
            this.props.dispatch(initVisibility(this.props.extension.locales.default));

        }

        this.detachFns = [];

        const fields = this.props.extension.entry.fields;
        for (let key in fields) {
            this.detachFns.push(
                fields[key].onValueChanged(this.onViewingEntryUpdated)
            );
        }
        this.detachFns.push(
            this.props.extension.entry.onSysChanged(this.onViewingEntryUpdated)
        );

        this.props.extension.window.startAutoResizer();
        const pagesOfSpace = await this.getPagesOfSpace();
        this.props.dispatch(removeDeletedPages(pagesOfSpace))
        pagesOfSpace.map( page => this.props.dispatch(initPage(page)));
        this.props.dispatch(removeDeletedPages(pagesOfSpace))

    }

    componentDidUpdate = prevProps => {
        if (!isEqual(prevProps.seo, this.props.seo)) {

            if (!this.props.extension.field.getValue()) {
                this.setFieldValue();
            }

            if (this.props.extension.field.getValue() &&
                this.props.extension.field.getValue().value &&
                !isEqual(this.props.seo, JSON.parse(this.props.extension.field.getValue().value))) {
                this.setFieldValue();
            }

        }
    }

    componentWillUnmount = () => {
        this.detachFns.forEach(detach => detach());
        this.props.extension.window.stopAutoResizer();
    }

    setFieldValue = () => {
        this.props.extension.field.removeValue().then(() => {
            const seo = this.props.store.getState().seo;
            const staticResources = extractAssetUrl(seo);

            this.props.extension.field.setValue({
                value: JSON.stringify(seo),
                staticResources : staticResources.length !== 0 ? staticResources : ['no-static-resources']
            }).then(() => {
                console.log('NEW SEO VALUE', this.props.extension.field.getValue())
            });
        });

    }


    getElementById = id => {
        return this.props.extension.space.getEntries({
            'sys.id': id
        }).then(function (result) {
            return result.items[0];
        });
    }


    getAssetsUrlById = id => {
        return this.props.extension.space
            .getAsset(id)
            .then(result => {
                return result.fields.file[this.props.extension.locales.default].url;
            });
    }

    getPagesOfSpace  = async () => {

        return this.props.extension.space
            .getEntries({
                'content_type': 'page'
            })
            .then(result => {
                let pages = result.items.map(entry => entry)
                    .filter(page => page.fields.type[this.props.extension.locales.default] === 'internal')
                   // .map( page => this.props.dispatch(initPage(page)))
                return pages;
            });
    }



    onError = error => {
        this.props.extension.notifier.error(error.message);
    }

    onViewingEntryUpdated = async () => {
        const latestSys = this.props.extension.entry.getSys();
    }

    openEntry = entryId => {
        return () => {
            this.props.extension.navigator.openEntry(entryId, {
                slideIn: true
            });
        };
    }

    render = () => {
        return (
            <Extension>
                <MainContainer className={'container'}>
                    {this.renderGlobalSEO()}
                    <ListPages/>
                </MainContainer>
            </Extension>
        );
    }

    renderGlobalSEO = () => {
        return (
            <section>
                <GlobalSEO/>
            </section>
        );
    }

}

const mapStateToProps = ({ seo }) => ({
    seo: seo,
});
export default connect(mapStateToProps)(App);
