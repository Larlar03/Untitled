import { useEffect } from 'react';

import './cta-button.css';

const CtaButton = (props: any) => {
    return (
        <button
            id='cta-button'
            data-testid='cta-button'
            type={props.type}
            onClick={props.handleClick}
            disabled={props.isDisabled}
        >
            {props.text}
        </button>
    );
};

export default CtaButton;