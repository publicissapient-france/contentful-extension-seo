import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from './styled';

export default class ButtonDelete extends Component {
    render () {
        const { label, action } = this.props;

        return (
            <Button onClick={action}>{label}</Button>
        );
    }
}

ButtonDelete.propTypes = {
    label: PropTypes.string.isRequired,
    action: PropTypes.func
};
