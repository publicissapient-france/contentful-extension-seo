import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Title, Field} from './styled'
import {updateGlobal} from '../../../actions/index'

const OGP = ({dispatch, storeValue}) => {
    return (
        <Container>
            <Title>Open Graph protocol (OGP)</Title>
            <Field>
                <label>namespace</label>
                <input type={'text'}
                       defaultValue={storeValue && storeValue.namespace ? storeValue.namespace : ''}
                       onChange={e => {
                           dispatch(updateGlobal('OGP', 'namespace', e.target.value))
                       }}/>
            </Field>
        </Container>
    );
}

OGP.propTypes = {
    storeValue: PropTypes.object
};

const mapStateToProps = ({seo}) => ({
    storeValue: seo.global['OGP'] || null
});

export default connect(mapStateToProps)(OGP);
