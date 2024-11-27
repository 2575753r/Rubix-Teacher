import { render, fireEvent } from '@testing-library/react';
import Cube from './Cube';

test('renders the cube', () => {
    const { container } = render(<Cube />);
});