import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

// Import required testing libraries
import '@testing-library/jest-dom/extend-expect';

// Create a mock portal container element
const portalContainer = document.createElement('div');
portalContainer.setAttribute('id', 'modal-root');
document.body.appendChild(portalContainer);

// Mock ReactDom.createPortal to render components into the portal container
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node) => {
        return node;
    }
}));
