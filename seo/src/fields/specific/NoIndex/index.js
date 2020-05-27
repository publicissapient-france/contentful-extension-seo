import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePage} from "../../../actions";
import {Container} from './styled'

class NoIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, storeValue, index} = this.props;
        return (
            <Container>
                <input type={'checkbox'}
                       checked={storeValue && storeValue.noIndex ? storeValue.noIndex : false}
                       onChange={e => {
                           dispatch(updatePage('Base', 'noIndex', e.target.checked, index))
                       }}/>
                <label>noindex</label>
            </Container>
        );
    }
}

NoIndex.propTypes = {
    storeValue: PropTypes.object,
    index: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
    storeValue: state.seo.pages[ownProps.index]['Base'] || null,
});

export default connect(mapStateToProps)(NoIndex);
