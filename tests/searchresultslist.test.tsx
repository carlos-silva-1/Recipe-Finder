import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from '../components/List';

const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
];

describe('Search Results List', () => {
  it('renders the list of items', () => {
    render(<List items={items} itemKey="name" renderItem={(item) => <>{item.name}</>} />);

    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('sorts the list in ascending order by default', () => {
    render(<List items={items} itemKey="name" renderItem={(item) => <>{item.name}</>} />);

    const sortedItems = items.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(sortedItems[index].name);
    });
  });

  it('toggles the sort order when the button is clicked', () => {
    render(<List items={items} itemKey="name" renderItem={(item) => <>{item.name}</>} />);

    const button = screen.getByText('Sort Descending');
    fireEvent.click(button);

    const sortedItems = items.sort((a, b) =>
      b.name.localeCompare(a.name)
    );

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(sortedItems[index].name);
    });

    expect(button).toHaveTextContent('Sort Ascending');
  });
});
