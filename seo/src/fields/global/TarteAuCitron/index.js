import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Title, Field , Row, Column} from './styled'
import { updateGlobal } from '../../../actions/index'

class TarteAuCitron extends Component {
    render() {
        const { dispatch, storeValue } = this.props;

        return (
            <Container>
                <Title>TarteAuCitron</Title>
                <Field>
                    <Row>
                        <Column>
                            <label>{ 'to <head>' }</label>
                            <textarea type={'text'}
                                      defaultValue={storeValue && storeValue.head ? storeValue.head : ''}
                                      onChange={e => {
                                          dispatch(updateGlobal('TarteAuCitron', 'head', e.target.value))
                                      }}/>
                        </Column>
                        <Column>
                            <label>{ 'to <body>' }</label>
                            <textarea type={'text'}
                                      defaultValue={storeValue && storeValue.body ? storeValue.body : ''}
                                      onChange={e => {
                                          dispatch(updateGlobal('TarteAuCitron', 'body', e.target.value))
                                      }}/>
                        </Column>
                    </Row>
                </Field>
            </Container>
        );
    }
}

TarteAuCitron.propTypes = {
    storeValue : PropTypes.object
};

const mapStateToProps = ({ seo }) => ({
    storeValue : seo.global['TarteAuCitron'] || null
});

export default connect(mapStateToProps)(TarteAuCitron);
