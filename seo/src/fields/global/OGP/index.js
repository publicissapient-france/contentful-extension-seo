import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Container, Title, Field } from './styled'

import { updateGlobal } from '../../../actions/index'

class OGP extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount(){}

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        const { dispatch, storeValue } = this.props;

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
}

const mapStateToProps = ({ seo }) => ({
    storeValue : seo.global['OGP'] || null
});

export default connect(mapStateToProps)(OGP);
