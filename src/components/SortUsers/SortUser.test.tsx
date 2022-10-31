import { fireEvent, render, screen } from '@testing-library/react';
import SorUser from './index';

test.only('Render Sort User component', () => {
  render(
    <SorUser
      onSort={(selected: string) => {
        console.log('selected>> ', selected);
      }}
    />
  );
  fireEvent.click(screen.getByText('Select...'));
  fireEvent.click(screen.getByText('Name'));
});
