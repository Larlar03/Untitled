import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../navbar';

describe('Navbar', () => {
    beforeEach(() => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });

    afterEach(() => {
        cleanup(); // Reset all user events
    });
});
