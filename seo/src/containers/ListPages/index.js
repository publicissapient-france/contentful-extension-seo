import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Banner, Contain} from "./styled";
import PageSEO from '../PageSEO'

class ListPages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: ''
        };
    }

    getSelectedPage = (id) => this.props.pages.find( page => page.id === id)

    getIndexOnStore = (page) => this.props.pages.indexOf(page)

     render () {
        const { pages, defaultLocale } = this.props;
        return (
            <Container>
                <Banner>
                    <h4>Pages SEO </h4>
                </Banner>

                <Contain>
                    <label>Select Page</label>
                    <select value={this.state.selectedPage}
                            onChange={(e) => this.setState({selectedPage: e.target.value})}
                    >
                        <option value={''}></option>
                        {
                            pages ?
                                pages.sort((a, b) => a.name[defaultLocale].localeCompare(b.name[defaultLocale])).map(page => <option key={page.id} value={page.id}>{page.name[defaultLocale]}</option>)
                                : null
                        }
                    </select>
                    {
                        this.state.selectedPage && this.state.selectedPage !== '' ?
                            <PageSEO page={this.getSelectedPage(this.state.selectedPage)} index={this.getIndexOnStore(this.getSelectedPage(this.state.selectedPage))}  /> : null
                    }
                </Contain>


                {
                    /*pages ?
                        pages.map( (page, index) => {
                            return <PageSEO key={index} page={page} index={index}  />
                        })
                        : null*/
                }
            </Container>
        );
    }
}

ListPages.propTypes = {
    pages : PropTypes.array
};

const mapStateToProps = ({ seo, extension }) => ({
    pages: seo.pages,
    defaultLocale : extension && extension.locales ? extension.locales.default : null
});
export default connect(mapStateToProps)(ListPages);
