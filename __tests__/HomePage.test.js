import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders the home page with a cube', () => {
    render(<HomePage />);
});