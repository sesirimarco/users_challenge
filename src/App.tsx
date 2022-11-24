import * as React from 'react';
import SearchUsers from './components/SearchUsers';
import SortUsers from './components/SortUsers';
import User from './components/User';
import { IUser } from './interfaces';
import { mapUsers, sortUsers, searchUsers } from './utils';
import SpinnerIcon from './components/Icons/SpinnerIcon';
import Alert from './components/Alert';

/* TODO:  
    - Implementation of ellipsis for long texts
    - Inputs validation
*/

export default function App() {
  const [currentSearch, setCurrentSearch] = React.useState<string>('');
  const [currentSort, setCurrentSort] = React.useState<string>('');
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);
  /* Handling load status */
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  /* Handling error status */
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setUsers(mapUsers(data.results));
        setFilteredUsers(mapUsers(data.results));
      } catch (e: any) {
        setHasError(true);
        const errorMessage = `Error calling the API: ${e.message}`;
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      }
      setIsLoading(false);
    };
    getUsers();
  }, []);

  const onSearchUsers = (value: string) => {
    setCurrentSearch(value);
    setFilteredUsers(searchUsers(users, value));
  };

  const onSortUsers = (value: string) => {
    setCurrentSort(value);
    const searchedUsers = searchUsers(users, currentSearch);
    const orderedUsers = sortUsers(searchedUsers, value);
    setFilteredUsers(orderedUsers);
  };
  const onEditUser = (editedUser: IUser) => {
    const updatedUsers = users.map((user: IUser) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(
      searchUsers(sortUsers(updatedUsers, currentSort), currentSearch)
    );
  };
  const showContent = () => {
    if (filteredUsers.length > 0) {
      return filteredUsers.map((user: IUser) => (
        <User
          key={user.id}
          fullName={user.fullName}
          email={user.email}
          location={user.location}
          phone={user.phone}
          avatar={user.avatar}
          id={user.id}
          onEditUser={onEditUser}
        />
      ));
    } else if (hasError) {
      return (
        <Alert type='error'>
          <h5>{errorMessage}</h5>
        </Alert>
      );
    } else {
      return (
        <Alert type='info'>
          <h5>There is not content</h5>
        </Alert>
      );
    }
  };
  return (
    <div>
      <div className='filter-users'>
        <span className='filter-search'> Search:</span>
        <SearchUsers onSearch={onSearchUsers} />
        <span className='filter-search'> Sort by:</span>
        <SortUsers onSort={onSortUsers} />
      </div>
      <div className='users-container' data-cy='users-container'>
        {isLoading ? <SpinnerIcon /> : showContent()}
      </div>
    </div>
  );
}
