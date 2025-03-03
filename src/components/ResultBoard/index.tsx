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
import { createRef, useEffect } from 'react';

interface ResultBoardProps {
  isError?: boolean;
  isFetching?: boolean;
  productList?: Product[];
  scrollToTop?: boolean;
}
export default function ResultBoard({
  productList,
  isError,
  isFetching,
  scrollToTop,
}: ResultBoardProps) {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (scrollToTop) {
      ref.current?.scrollTo({ top: 0 });
    }
  }, [ref, scrollToTop]);

  const showProdList = Boolean(productList?.length && !isError);

  return (
    <ResultBoardContainer>
      {showProdList ? (
        <ItemsWrapper $mask={isFetching} ref={ref}>
          {productList?.map((v, i) => (
            <ResultItem
              key={`result-item-${v.title}${i}`}
              onClick={() => (window.location.href = v.url)}
              title={v.title}
              description={v.description}
              image={v.image}
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
