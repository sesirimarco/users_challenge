import * as React from 'react';
import { IUserEdit } from '../../interfaces';
import UserEditIcon from '../Icons/UserEditIcon';
import EditableField from '../EditableField';

const User: React.FC<IUserEdit> = ({
  fullName,
  phone,
  location,
  email,
  avatar,
  id,
  onEditUser,
}) => {
  const [userFullName, setUserFullName] = React.useState<string>(fullName);
  const [userEmail, setUserEmail] = React.useState<string>(email);
  const [userPhone, setUserPhone] = React.useState<string>(phone);
  const [userLocation, setUserLocation] = React.useState<string>(location);
  const [editFinished, setEditFinished] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (editFinished) {
      onEditUser({
        id,
        fullName: userFullName,
        email: userEmail,
        phone: userPhone,
        location: userLocation,
        avatar,
      });
    }
  }, [editFinished]);
  return (
    <div className='card-user' data-cy='card-user'>
      <UserEditIcon />
      <div className='header'></div>
      <div className='user-name'>
        <EditableField
          onEditFinish={(value: boolean) => setEditFinished(value)}
          onChangeValue={(value: string) => {
            setUserFullName(value);
          }}
          value={userFullName}
          className='user-name-editable'
          maxLength={18}
        >
          <h3 className='user-name' data-cy='user-name'>
            {userFullName}
          </h3>
        </EditableField>
      </div>
      <div className='avatar'>
        <img src={avatar} alt='...' />
      </div>
      <div className='card-body'>
        <EditableField
          onEditFinish={(value: boolean) => setEditFinished(value)}
          onChangeValue={(value: string) => {
            setUserEmail(value);
          }}
          value={userEmail}
          className='card-body-item-editable'
          maxLength={35}
        >
          <p className='card-body-item'>{userEmail}</p>
        </EditableField>
        <EditableField
          onEditFinish={(value: boolean) => setEditFinished(value)}
          onChangeValue={(value: string) => {
            setUserPhone(value);
          }}
          value={userPhone}
          className='card-body-item-editable'
          maxLength={35}
        >
          <p className='card-body-item'>{phone}</p>
        </EditableField>
        <EditableField
          onEditFinish={(value: boolean) => setEditFinished(value)}
          onChangeValue={(value: string) => {
            setUserLocation(value);
          }}
          value={userLocation}
          className='card-body-item-editable'
          maxLength={35}
        >
          <p className='card-body-item'>{location}</p>
        </EditableField>
      </div>
    </div>
  );
};

export default User;
