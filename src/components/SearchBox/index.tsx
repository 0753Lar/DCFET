import { useMemo, useState } from 'react';
import SearchBar from '../SearchBar';
import Tag from '../Tag';
import {
  BottomBar,
  SearchBoxContainer,
  TagsWrapper,
} from './styled.components';
import { useDebounce } from 'use-debounce';
import ResultBoard from '../ResultBoard';
import { useGetProductListQuery } from '../../services/getProductList';

const presetTags = ['Languages', 'Build', 'Design', 'Cloud'];

export default function SearchBox({ tags = presetTags }: { tags: string[] }) {
  const [value, setValue] = useState('');

  const [debouncedValue] = useDebounce(value, 300);

  const {
    isError,
    error,
    data: productList,
    isFetching,
    isSuccess,
  } = useGetProductListQuery(debouncedValue, {
    skip: !debouncedValue,
  });

  const bottomTip = useMemo(() => {
    if (isSuccess) {
      return productList.length === 1
        ? '1 result'
        : `${productList.length} results`;
    } else if (isFetching) {
      return 'Searching';
    } else if (isError) {
      const isTimeoutError =
        'status' in error && error.status === 'TIMEOUT_ERROR';
      return isTimeoutError
        ? 'The request timed out'
        : 'Something wrong happened but this is not your fault : )';
    } else {
      return 'No result';
    }
  }, [isSuccess, productList?.length, isFetching, isError, error]);

  return (
    <div>
      <SearchBoxContainer>
        <SearchBar
          onChange={(e) => setValue(e.target.value)}
          value={value}
          error={isError}
        />

        <TagsWrapper>
          {tags.map((v, i) => (
            <Tag
              name={v}
              key={`select-tag-${v}${i}`}
              onClick={() => setValue(v)}
              selected={value === v}
            />
          ))}
        </TagsWrapper>

        <ResultBoard
          productList={debouncedValue ? productList : undefined}
          isFetching={isFetching}
          isError={isError}
          scrollToTop={debouncedValue === value && !isFetching}
        />
      </SearchBoxContainer>

      <BottomBar $error={isError}>{bottomTip}</BottomBar>
    </div>
  );
}
