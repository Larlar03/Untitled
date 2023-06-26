import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import CtaButton from '../cta-button/cta-button';

test('button renders', () => {
    render(
        <Router>
            <CtaButton type='button' text='Continue' isDisabled={false} onClick={null} />
        </Router>
    );
    expect(screen.getByTestId('cta-button')).toBeInTheDocument();
});
