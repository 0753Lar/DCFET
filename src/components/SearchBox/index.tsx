import { createRef, useCallback, useMemo, useState } from 'react';
import SearchBar from '../SearchBar';
import Tag from '../Tag';
import {
  BottomBar,
  SearchBoxContainer,
  TagsWrapper,
} from './styled.components';
import { useDebounce } from 'use-debounce';
import ResultBoard from '../ResultBoard';
import { useHotkeys } from 'react-hotkeys-hook';

import { useGetProductListQuery } from '../../services/getProductList';

const tags = ['Languages', 'Build', 'Design', 'Cloud'] as const;
const eligibleHotkeyTargets = [...tags, '_Input'] as const;
type Tag = (typeof tags)[number];
type HotkeyTarget = (typeof eligibleHotkeyTargets)[number];

export default function SearchBox() {
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 300);
  const inputRef = createRef<HTMLInputElement>();
  const [hotkeyFocusOn, setHotkeyFocusOn] = useState<HotkeyTarget>('_Input');

  const [isBoardFocsing, setIsBoardFocusing] = useState(false);

  const {
    isError,
    error,
    data: productList,
    isFetching,
    isSuccess,
  } = useGetProductListQuery(debouncedValue, {
    skip: !debouncedValue,
  });

  useHotkeys(
    ['up', 'down', 'left', 'right', 'enter'],
    (_, hotkey) => {
      switch (hotkey.hotkey) {
        case 'up':
          inputRef.current?.focus();
          setHotkeyFocusOn('_Input');
          break;
        case 'down':
          if (hotkeyFocusOn === '_Input') {
            inputRef.current?.blur();
            setHotkeyFocusOn(tags[0]);
          } else if (
            eligibleHotkeyTargets.includes(hotkeyFocusOn) &&
            productList?.length
          ) {
            setIsBoardFocusing(true);
          }
          break;
        case 'left':
          if (eligibleHotkeyTargets.includes(hotkeyFocusOn)) {
            setHotkeyFocusOn(
              eligibleHotkeyTargets[
                Math.max(0, eligibleHotkeyTargets.indexOf(hotkeyFocusOn) - 1)
              ],
            );
          }
          break;
        case 'right':
          if (eligibleHotkeyTargets.includes(hotkeyFocusOn)) {
            setHotkeyFocusOn(
              eligibleHotkeyTargets[
                Math.min(
                  eligibleHotkeyTargets.length - 1,
                  eligibleHotkeyTargets.indexOf(hotkeyFocusOn) + 1,
                )
              ],
            );
          }
          break;
        case 'enter':
          if (eligibleHotkeyTargets.includes(hotkeyFocusOn)) {
            setValue(hotkeyFocusOn);
            setIsBoardFocusing(false);
          }
          break;
      }
    },
    { enableOnFormTags: true, enabled: !isBoardFocsing },
    [inputRef, hotkeyFocusOn, isBoardFocsing],
  );

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

  const onTagSelect = (v: Tag) => {
    setValue(v);
    setHotkeyFocusOn(v);
  };

  const onBoardHotkeyOverUp = useCallback(() => {
    setIsBoardFocusing(false);
  }, []);

  return (
    <div>
      <SearchBoxContainer>
        <SearchBar
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          error={isError}
        />

        <TagsWrapper>
          {tags.map((v, i) => (
            <Tag
              name={v}
              key={`select-tag-${v}${i}`}
              onClick={() => onTagSelect(v)}
              selected={value === v}
              focused={!isBoardFocsing && hotkeyFocusOn === v}
            />
          ))}
        </TagsWrapper>

        <ResultBoard
          productList={debouncedValue ? productList : undefined}
          isFetching={isFetching}
          isError={isError}
          scrollToTop={debouncedValue === value && !isFetching}
          enableHotkey={isBoardFocsing}
          onHotkeyOverUp={onBoardHotkeyOverUp}
        />
      </SearchBoxContainer>

      <BottomBar $error={isError}>{bottomTip}</BottomBar>
    </div>
  );
}
