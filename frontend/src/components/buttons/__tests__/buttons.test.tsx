import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import CtaButton from '../cta-button/cta-button';
import OptionButton from '../option-button/option-button';
import mockServices from '../../../utils/mock-objects/mock-services';

describe('CTA Button', () => {
    it('renders cta button', () => {
        render(
            <Router>
                <CtaButton type='button' text='Continue' isDisabled={false} />
            </Router>
        );
        expect(screen.getByTestId('cta-button')).toBeInTheDocument();
    });

    it('applies width prop to cta button', () => {
        render(
            <Router>
                <CtaButton type='button' text='Continue' isDisabled={false} width={'w-2/3'} />
            </Router>
        );

        expect(screen.getByTestId('cta-button')).toHaveClass('w-2/3');
    });
});

describe('Option Button', () => {
    it('renders option button', () => {
        render(
            <Router>
                <OptionButton optionData={mockServices[0]} />
            </Router>
        );
        expect(screen.getByTestId('option-button')).toBeInTheDocument();
    });
});
