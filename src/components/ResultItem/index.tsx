import { HTMLAttributes } from 'react';
import { Product } from '../../services/getProductList';
import {
  ContentWrapper,
  Description,
  IconWrapper,
  ImageWrapper,
  ResultItemContainer,
  StyledImg,
  Title,
} from './styled.components';

import { ImArrowUpRight } from 'react-icons/im';

type ResultItemProps = Omit<Product, 'url' | 'category'>;

export default function ResultItem({
  title,
  description,
  image,
  ...rest
}: ResultItemProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <ResultItemContainer {...rest}>
      <ImageWrapper>
        <StyledImg src={image} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentWrapper>
      <IconWrapper>
        <ImArrowUpRight color="#F2F4F8" />
      </IconWrapper>
    </ResultItemContainer>
  );
}
