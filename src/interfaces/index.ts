export interface IUser {
  fullName: string;
  phone: string;
  location: string;
  email: string;
  avatar: string;
  id: string;
}

export interface IUserEdit extends IUser {
  onEditUser: Function;
}
