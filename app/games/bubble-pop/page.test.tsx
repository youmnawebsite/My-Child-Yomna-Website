import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePop from './page';

test('renders Bubble Pop component', () => {
	render(<BubblePop />);
	const linkElement = screen.getByText(/Bubble Pop/i);
	expect(linkElement).toBeInTheDocument();
});