import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchOptions from './SearchOptions';
import OptionButton from '../../buttons/option-button/OptionButton';
import { mockHandleOptionClick } from './mockFunctions';

// OptionButtons render
// handleOptionClick function
// Styles are applied

test('test that the option button renders', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const selectOptions = (options: string[]) => {};

    render(
        <Router>
            <SearchOptions selectOptions={selectOptions} />
        </Router>
    );

    const mockHandleClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
    };

    // Act
    const services = ['Aerial Hoop', 'Aerial Silks', 'Pole Fitness'];
    const optionButtons = services.map((service, i) => (
        <OptionButton serviceName={service} handleClick={mockHandleClick} />
    ));

    // Assert
    expect(optionButtons).toEqual([
        <OptionButton handleClick={mockHandleClick} serviceName='Aerial Hoop' />,
        <OptionButton handleClick={mockHandleClick} serviceName='Aerial Silks' />,
        <OptionButton handleClick={mockHandleClick} serviceName='Pole Fitness' />
    ]);
});

// test('given an option is clicked once, the option is added to the options array', async () => {
//     // Arrange
//     const selectOptions = (options: string[]) => {};

//     render(
//         <Router>
//             <SearchOptions selectOptions={selectOptions} />
//         </Router>
//     );

//     // Act
//     const mockOptions = [];
//     const mockSelections = ['Aerial Hoop', 'Aerial Silks', 'Pole Fitness'];
//     const optionButtons = services.map((service) => (
//         <OptionButton
//             serviceName={service}
//             handleClick={mockHandleOptionClick(mockOptions, mockSelections)}
//         />
//     ));

//     // Assert
// }, 10000);
