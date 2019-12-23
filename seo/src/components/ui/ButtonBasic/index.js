import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from './styled';

export default class ButtonBasic extends Component {
    render () {
        const { label, disabled, action } = this.props;
        let className = disabled ? 'disable' : '';
        return (
            <Button disabled={disabled} className={className} onClick={action}
            >{ label }</Button>
        );
    }
}

ButtonBasic.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};
