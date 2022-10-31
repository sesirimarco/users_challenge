import { IUser } from '../interfaces';

export const mapUsers = (users: any[]) => {
  return users.map((user: any) => ({
    location: `${user.location.city}, ${user.location.state}`,
    fullName: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    avatar: user.picture.large,
    email: user.email,
    id: user.login.uuid,
  }));
};

export const sortUsers = (users: IUser[], prop: string) => {
  return users.sort(
    (userA: { [key: string]: any }, userB: { [key: string]: any }) => {
      const valueA = userA[prop];
      const valueB = userB[prop];
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    }
  );
};

export const searchUsers = (users: IUser[], value: string) => {
  const lowerCaseValue: string = value.toLocaleLowerCase();
  return users.filter((user: IUser) => {
    return (
      user.fullName.toLowerCase().includes(lowerCaseValue) ||
      user.phone.toLowerCase().includes(lowerCaseValue) ||
      user.email.toLowerCase().includes(lowerCaseValue) ||
      user.location.toLowerCase().includes(lowerCaseValue)
    );
  });
};
