import { Product } from '../../services/getProductList';
import ResultItem from '../ResultItem';
import { Spinner } from '../Spinner';
import {
  Centered,
  Img,
  ItemsWrapper,
  ResultBoardContainer,
  SpinnerWrapper,
} from './styled.components';
import searchingImg from './assets/searching-illustration.png';
import errorImg from './assets/error-illustration.png';
import { createRef, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface ResultBoardProps {
  isError?: boolean;
  isFetching?: boolean;
  productList?: Product[];
  scrollToTop?: boolean;
  enableHotkey?: boolean;
  onHotkeyOverUp?: () => void;
  onHotkeyOverDown?: () => void;
}
export default function ResultBoard({
  productList,
  isError,
  isFetching,
  scrollToTop,
  enableHotkey,
  onHotkeyOverUp,
  onHotkeyOverDown,
}: ResultBoardProps) {
  const ref = createRef<HTMLDivElement>();

  const [hotkeyIndex, setHotkeyIndex] = useState<number | null>(null);

  useEffect(() => {
    if (enableHotkey) {
      setHotkeyIndex(0);
    }
  }, [enableHotkey]);

  const scrollIntoView = (index: number) => {
    if (ref.current) {
      ref.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  useHotkeys(
    ['up', 'down', 'enter'],
    (_, hotkey) => {
      if (!productList?.length) {
        setHotkeyIndex(null);
        return;
      }

      switch (hotkey.hotkey) {
        case 'up':
          if (typeof hotkeyIndex === 'number') {
            if (hotkeyIndex === 0 && onHotkeyOverUp) {
              onHotkeyOverUp();
              setHotkeyIndex(null);
              return;
            }
            const newIndex = Math.max(0, hotkeyIndex - 1);
            setHotkeyIndex(newIndex);
            scrollIntoView(newIndex);
          }
          break;
        case 'down':
          if (typeof hotkeyIndex === 'number') {
            if (hotkeyIndex === 0 && onHotkeyOverDown) {
              onHotkeyOverDown();
              setHotkeyIndex(null);
              return;
            }
            const newIndex = Math.min(productList.length - 1, hotkeyIndex + 1);
            setHotkeyIndex(newIndex);
            scrollIntoView(newIndex);
          }
          break;
        case 'enter':
          if (typeof hotkeyIndex === 'number') {
            redirect(productList[hotkeyIndex].url);
          }
          break;
      }
    },
    { enableOnFormTags: true, enabled: enableHotkey },
    [hotkeyIndex, productList, scrollIntoView],
  );

  const redirect = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    if (scrollToTop) {
      ref.current?.scrollTo({ top: 0 });
    }
  }, [ref.current, scrollToTop]);

  const showProdList = Boolean(productList?.length && !isError);

  return (
    <ResultBoardContainer>
      {showProdList ? (
        <ItemsWrapper $mask={isFetching} ref={ref}>
          {productList?.map((v, i) => (
            <ResultItem
              key={`result-item-${v.title}${i}`}
              onClick={() => redirect(v.url)}
              title={v.title}
              description={v.description}
              image={v.image}
              selected={hotkeyIndex === i}
              onMouseEnter={() => setHotkeyIndex(i)}
            />
          ))}
        </ItemsWrapper>
      ) : (
        !isFetching && (
          <Centered style={{ height: '100%' }}>
            {isError ? (
              <Img src={errorImg} width={247} alt="error" />
            ) : (
              <Img src={searchingImg} width={247} alt="searching" />
            )}
          </Centered>
        )
      )}

      {isFetching && (
        <SpinnerWrapper>
          <Spinner
            $frontgroundColor="#6833FF"
            $diameter={20}
            $strokeWidth={8}
          />
        </SpinnerWrapper>
      )}
    </ResultBoardContainer>
  );
}
