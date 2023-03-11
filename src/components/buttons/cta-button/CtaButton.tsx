import React from 'react';
import './CtaButton.css';

interface Props {}
const CtaButton = (props: any) => {
    return (
        <button
            id='cta-button'
            type={props.type}
            onClick={props.handleClick}
            disabled={props.isDisabled}
        >
            {props.text}
        </button>
    );
};

export default CtaButton;
