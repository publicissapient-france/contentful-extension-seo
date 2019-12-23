import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from './styled';

export default class ButtonValidate extends Component {
    render () {
        const { label, disabled, action, type } = this.props;
        let className = !disabled ? 'active' : '';
        return (
            <Button type={type} disabled={disabled} className={className} onClick={action}
            >{ label }</Button>
        );
    }
}

ButtonValidate.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
};
