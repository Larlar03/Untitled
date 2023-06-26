import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import CtaButton from '../cta-button/cta-button';

// test button is rendering
// test button can't be clicked when disabled
// test onclick works

test('button renders', () => {
    render(
        <Router>
            <CtaButton type='button' text='Continue' isDisabled={false} onClick={null} />
        </Router>
    );
});
