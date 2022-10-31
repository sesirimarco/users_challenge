import { IUser } from '../interfaces';
import { mapUsers, searchUsers, sortUsers } from './';
const mockRawUser = {
  gender: 'female',
  name: {
    title: 'Mrs',
    first: 'Sara',
    last: 'Nevala',
  },
  location: {
    street: {
      number: 6528,
      name: 'Hämeentie',
    },
    city: 'Nurmijärvi',
    state: 'Satakunta',
    country: 'Finland',
    postcode: 37338,
    coordinates: {
      latitude: '-24.8428',
      longitude: '57.3220',
    },
    timezone: {
      offset: '+3:00',
      description: 'Baghdad, Riyadh, Moscow, St. Petersburg',
    },
  },
  email: 'sara.nevala@example.com',
  login: {
    uuid: 'e958a49a-4b91-4b79-94af-da0e8d60aad1',
    username: 'yellowswan704',
    password: 'oxygen',
    salt: 'UKgSCMhr',
    md5: '2d325efb93255e418dea3724693b189f',
    sha1: 'feb875d1689dac7f5fd075137bddb720c436e8de',
    sha256: '3c49b7ba55d92c765668ceebd642c0e8990bf9f2e0b0cdfd500a76b0d811675f',
  },
  dob: {
    date: '1946-04-26T21:14:54.728Z',
    age: 76,
  },
  registered: {
    date: '2021-01-31T04:20:03.670Z',
    age: 1,
  },
  phone: '08-406-680',
  cell: '043-182-25-95',
  id: {
    name: 'HETU',
    value: 'NaNNA946undefined',
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/women/52.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
  },
  nat: 'FI',
};

describe('Map users', () => {
  it('Given an array of users return a mapped array with the necessary properties', () => {
    const mappedUsers: IUser[] = mapUsers([mockRawUser]);
    expect(mappedUsers[0]).toEqual(
      expect.objectContaining({
        fullName: expect.any(String),
        phone: expect.any(String),
        location: expect.any(String),
        email: expect.any(String),
        avatar: expect.any(String),
        id: expect.any(String),
      })
    );
  });
});

describe('Search users', () => {
  it('Given an array of users search by name', () => {
    const mappedUsers: IUser[] = mapUsers([mockRawUser]);
    const searchedUsers: IUser[] = searchUsers(mappedUsers, 'sara');
    expect(searchedUsers.length).toEqual(1);
  });
  it('Given an array of users search by location', () => {
    const mappedUsers: IUser[] = mapUsers([mockRawUser]);
    const searchedUsers: IUser[] = searchUsers(mappedUsers, 'Nurmijärvi');
    expect(searchedUsers.length).toEqual(1);
  });
  it('Given an array of users search by phone', () => {
    const mappedUsers: IUser[] = mapUsers([mockRawUser]);
    const searchedUsers: IUser[] = searchUsers(mappedUsers, '08-406-680');
    expect(searchedUsers.length).toEqual(1);
  });
  it('Given an array of users search by email', () => {
    const mapedUsers: IUser[] = mapUsers([mockRawUser]);
    const searchedUsers: IUser[] = searchUsers(
      mapedUsers,
      'sara.nevala@example.com'
    );
    expect(searchedUsers.length).toEqual(1);
  });
});

const mockSortUsers: IUser[] = [
  {
    id: '1',
    fullName: 'Amit Saniel',
    email: 'amit.saniel@example.com',
    phone: '7973557859',
    location: 'Deoghar, Meghalaya',
    avatar: '',
  },
  {
    id: '2',
    fullName: 'Victoria Santos',
    email: 'victoria.santos@example.com',
    phone: '111-552-636',
    location: 'Alicante, Castilla la Mancha',
    avatar: '',
  },
];
describe('Sort users', () => {
  it('Given an array of users return an array of users sorted by name', () => {
    const sortedUsers: IUser[] = sortUsers(mockSortUsers, 'name');
    expect(sortedUsers[0].id).toEqual('1');
  });
  it('Given an array of users return an array user sorted by email', () => {
    const sortedUsers: IUser[] = sortUsers(mockSortUsers, 'email');
    expect(sortedUsers[0].id).toEqual('1');
  });
  it('Given an array of users return an array user sorted by phone', () => {
    const sortedUsers: IUser[] = sortUsers(mockSortUsers, 'phone');
    expect(sortedUsers[0].id).toEqual('2');
  });
  it('Given an array of users return an array user sorted by location', () => {
    const sortedUsers: IUser[] = sortUsers(mockSortUsers, 'location');
    expect(sortedUsers[0].id).toEqual('2');
  });
});
