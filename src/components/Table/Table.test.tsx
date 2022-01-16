import { render } from '@testing-library/react';
import Table from './Table';

test('renders table', () => {
    const comp = render(<Table />);
    expect(comp).toBeTruthy();
});
