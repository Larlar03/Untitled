import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchOptions from './SearchOptions';
import OptionButton from '../../buttons/option-button/OptionButton';

// OptionButtons render
// handleOptionClick function
// Styles are applied

// const options = [];
// const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
//     const selection: any = event.currentTarget.textContent;
//     options.push(selection);
// };

test('option buttons render', () => {
    // Arrange
    const selectOptions = (options: string[]) => {};

    render(
        <Router>
            <SearchOptions selectOptions={selectOptions} />
        </Router>
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
    };

    // Act
    const services = ['Aerial Hoop', 'Aerial Silks', 'Pole Fitness'];
    const optionButtons = services.map((service) => (
        <OptionButton serviceName={service} handleClick={handleClick} />
    ));

    // Assert
    expect(optionButtons).toEqual([
        <OptionButton handleClick={handleClick} serviceName='Aerial Hoop' />,
        <OptionButton handleClick={handleClick} serviceName='Aerial Silks' />,
        <OptionButton handleClick={handleClick} serviceName='Pole Fitness' />
    ]);
});
