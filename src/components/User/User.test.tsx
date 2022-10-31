import * as React from 'react';
import { render, screen } from '@testing-library/react';
import User from './index';
import { IUserEdit } from '../../interfaces';

test('Render User component', () => {
  const mockUser: IUserEdit = {
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    email: 'safa.langholm@example.com',
    fullName: 'Safa Langholm',
    id: '1',
    location: 'Melsomvik, Rogaland',
    phone: '76021920',
    onEditUser: (value: string) => {
      console.log(value);
    },
  };
  render(<User {...mockUser} />);
  screen.getByText(mockUser.fullName);
  screen.getByText(mockUser.email);
  screen.getByText(mockUser.location);
  screen.getByText(mockUser.phone);
});
