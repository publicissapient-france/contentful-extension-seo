import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Contain} from "./styled";
import PageSEO from '../PageSEO'

const ListPagesFormations = ({pages, defaultLocale, extension}) => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        async function initialization() {
            if (extension && extension.space) {
                await initRessources();
            }
        }
        initialization();
    }, [extension]);

    const initRessources = async () => {
        await extension.space.getEntries({
            'content_type': 'formation',
        }).then(async result => {
            await result.items.map(async item => {
                let categoriesID = item.fields.category[defaultLocale].map(category => category.sys.id);

                let formation = {
                    id: item.sys.id,
                    name: item.fields.name[defaultLocale],
                    categories: await getCategoryNameByID(categoriesID)
                }

                setFormations([...formations, formation])

                formation.categories.map(category => {
                    if (!categories.includes(category)) {
                        setCategories([...categories, category])
                    }
                })
                return formation
            })
        });
    }

    const getCategoryNameByID = (ids) => {
        return extension.space.getEntries({
            'sys.id[in]': ids.join(',')
        }).then(result => {
            return result.items.map(item => item.fields.name[defaultLocale])
        })
    }

    const getFilteredFormation = () => {
        return formations.map(formation => formation.categories.includes(categoryFilter) ? formation : null)
            .filter(el => el);
    }

    const getIndexOnStore = (page) => pages.indexOf(page);

    const getPageFormationFromStoreByID = (id) => pages.find(page => page.id === id);

    return (
        <Contain>
            <label>Select Category</label>
            <select value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value={''}></option>
                {
                    categories &&
                    categories.map(category => <option key={category} value={category}>{category}</option>)
                }
            </select>
            {
                getFilteredFormation() &&
                getFilteredFormation().map(formation => {
                    const pageFormation = getPageFormationFromStoreByID(formation.id)
                    return (<PageSEO key={formation.id} page={pageFormation}
                                     index={getIndexOnStore(pageFormation)}/>)
                })
            }
        </Contain>
    );
}

ListPagesFormations.propTypes = {
    pages: PropTypes.array,
    defaultLocale: PropTypes.string
};

const mapStateToProps = ({seo, extension}) => ({
    pages: seo.pages,
    extension: extension,
    defaultLocale: extension && extension.locales ? extension.locales.default : null
});
export default connect(mapStateToProps)(ListPagesFormations);
