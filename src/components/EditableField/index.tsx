import * as React from 'react';
type Props = {
  onEditFinish: Function;
  onChangeValue: Function;
  value: string;
  children: JSX.Element;
  className: string;
  maxLength: number;
};
const EditableField: React.FC<Props> = ({
  onEditFinish,
  onChangeValue,
  value,
  children,
  className,
  maxLength,
}) => {
  const [currentValue, setCurrentValue] = React.useState<string>(value);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  /**
   * I am using useRef to put the focus on the Input
   * to avoid more than one editable Input at the same moment
   */
  const inputRef = React.useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };
  React.useEffect(() => {
    if (isEditing) focusInput();
  }, [isEditing]);
  /**
   * Use case: user sets an empty value in an editable field
   */
  const checkForEmptyValue = () => {
    if (currentValue.length > 0) {
      onChangeValue(currentValue);
    } else {
      onChangeValue(value);
      setCurrentValue(value);
    }
  };
  return (
    <React.Fragment>
      {isEditing ? (
        <input
          data-cy={className}
          maxLength={maxLength}
          ref={inputRef}
          className={className}
          type='text'
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEditFinish(true);
            checkForEmptyValue();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false);
              onEditFinish(true);
              checkForEmptyValue();
            }
          }}
        />
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            onEditFinish(false);
          }}
        >
          {children}
        </span>
      )}
    </React.Fragment>
  );
};

export default EditableField;
