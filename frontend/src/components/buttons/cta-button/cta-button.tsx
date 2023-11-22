interface Props {
    type?: 'button' | 'submit' | 'reset' | undefined;
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    text?: string;
    width?: string;
}

const CtaButton = (props: Props) => {
    return (
        <button
            className={`${
                props.width ? props.width : 'w-full'
            } p-2 font-spacegrotesk text-lg font-medium tracking-wider bg-pale-violet text-cosmic-cobalt h-12 rounded-full hover:bg-medium-slate-blue hover:text-cosmic-cobalt disabled:opacity-50 disabled:cursor-not-allowed`}
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
