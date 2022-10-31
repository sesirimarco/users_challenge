import * as React from 'react';
type Props = {
  onSort: Function;
};
type Option = {
  [key: string]: string;
};
const options: Option[] = [
  {
    name: 'Select...',
    value: '',
  },
  {
    name: 'Name',
    value: 'fullName',
  },
  {
    name: 'Email',
    value: 'email',
  },
  {
    name: 'Location',
    value: 'location',
  },
  {
    name: 'Phone',
    value: 'phone',
  },
];
const SortUsers: React.FC<Props> = ({ onSort }) => {
  const [value, setValue] = React.useState<string>(options[0].value);
  return (
    <div>
      <select
        onChange={(event: any) => {
          onSort(event.target.value);
          setValue(event.target.value);
        }}
        className="filter-search"
        value={value}
      >
        {options.map((option: Option, index: number) => (
          <option
            value={option.value}
            key={option.value}
            disabled={index === 0 ? true : false}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortUsers;
