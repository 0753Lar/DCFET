import {
  IconWrapper,
  SearchBarContiner,
  StyledInput,
} from './styled.components';
import { FiSearch } from 'react-icons/fi';
import { forwardRef, InputHTMLAttributes, ReactElement, useState } from 'react';

export type InputStatus = 'focusing' | 'error' | 'normal';

interface SearchBarProps {
  icon?: ReactElement;
  className?: string;
  error?: boolean;
}

export default forwardRef<
  HTMLInputElement,
  SearchBarProps & InputHTMLAttributes<HTMLInputElement>
>(function SearchBar(
  {
    icon,
    error,
    className,
    placeholder = 'Search technologies we use at DC...',
    ...inputProps
  },
  ref,
) {
  const [isFocusing, setIsFocusing] = useState(false);

  return (
    <SearchBarContiner
      className={className}
      $status={isFocusing ? 'focusing' : error ? 'error' : 'normal'}
    >
      <IconWrapper>
        {icon ?? <FiSearch color="#000" fontSize="20px" />}
      </IconWrapper>
      <StyledInput
        ref={ref}
        type="text"
        onFocus={() => setIsFocusing(true)}
        onBlur={() => setIsFocusing(false)}
        placeholder={placeholder}
        {...inputProps}
      />
    </SearchBarContiner>
  );
});
