import { render } from '@testing-library/react';
import TableItem, { TableItemColors } from './TableItem';
import { Message, Priority } from '../../Api';

const testMessage1: Message = {
    message: 'Test warning message',
    priority: Priority.Warn
}

test('renders table item', () => {
    const comp = render(<TableItem message={testMessage1} color={TableItemColors.warning} />);
    expect(comp).toBeTruthy();
});
