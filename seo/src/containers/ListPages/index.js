import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Banner, Contain} from "./styled";
import PageSEO from '../PageSEO'
import ListPagesFormations from '../ListPagesFormations'

const ListPages = ({pages, defaultLocale, extension}) => {
    const [selectedPage, setSelectedPage] = useState('');
    const [displayPagesFormations, setDisplayPagesFormations] = useState(false);

    useEffect(() => {

        async function initialization() {
            if (extension && extension.space) {
                await checkContentTypes();
            }
        }
        initialization();
    }, [extension]);

    const checkContentTypes = async () => {
        await extension.space.getContentTypes().then(result => {
            if ((result.items.find(item => item.name === 'Category')) && (result.items.find(item => item.name === 'Formation'))) {
                setDisplayPagesFormations(true);
            }
        });
    }

    const getSelectedPage = (id) => pages.find(page => page.id === id);

    const getIndexOnStore = (page) => pages.indexOf(page);

    return (
        <Container>
            <Banner>
                <h4>Pages SEO </h4>
            </Banner>
            <Contain>
                <label>Select Page</label>
                <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
                    <option value={''}>select page</option>
                    {
                        pages &&
                        pages.filter(page => page.type !== 'formation')
                            .sort((a, b) => a.name[defaultLocale].localeCompare(b.name[defaultLocale])).map(page =>
                            <option key={page.id} value={page.id}>{page.name[defaultLocale]}</option>)
                    }
                </select>
                {
                    selectedPage && selectedPage !== '' ?
                        <PageSEO page={getSelectedPage(selectedPage)}
                                 index={getIndexOnStore(getSelectedPage(selectedPage))}/> : null
                }
            </Contain>
            {
                displayPagesFormations && <ListPagesFormations/>
            }
        </Container>
    );
}


ListPages.propTypes = {
    pages: PropTypes.array,
    defaultLocale: PropTypes.string
};

const mapStateToProps = ({seo, extension}) => ({
    pages: seo.pages,
    extension: extension,
    defaultLocale: extension && extension.locales ? extension.locales.default : null
});
export default connect(mapStateToProps)(ListPages);
