const CtaButton = (props: any) => {
    return (
        <button
            className='w-full p-2 font-spacegrotesk text-lg font-medium tracking-wider bg-pale-violet text-cosmic-cobalt h-12 rounded-full hover:bg-medium-slate-blue hover:text-cosmic-cobalt disabled:opacity-50 disabled:cursor-not-allowed'
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
