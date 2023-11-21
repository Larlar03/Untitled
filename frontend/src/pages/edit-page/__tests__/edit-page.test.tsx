import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import EditPage from '../edit-page';
import getAllStudiosApi from '../../../api/get-all-studios';

jest.mock('../../../api/get-all-studios', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Edit Page', () => {
    it('calls get all studios API on render', () => {
        render(
            <Router>
                <EditPage />
            </Router>
        );

        expect(getAllStudiosApi).toHaveBeenCalled();
    });
});
