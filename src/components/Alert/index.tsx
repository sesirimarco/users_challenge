import * as React from 'react';
type Props = {
  children: JSX.Element;
  type: string;
};

const Alert: React.FC<Props> = ({ type, children }) => {
  return <div className={`alert alert-${type}`}>{children}</div>;
};

export default Alert;
