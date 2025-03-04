import styled from 'styled-components';
import { contentCentered } from '../../styles';

export const IconWrapper = styled.div`
  flex-shrink: 0;
  ${contentCentered}
  width:26px;
  height: 26px;
  background-color: #999faa;
  border-radius: 2px;
  opacity: 0;
`;

export const ResultItemContainer = styled.div<{ $select?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  background-color: ${(p) => (p.$select ? '#f2f4f8' : '#fff')};
  border-radius: 12px;
  cursor: pointer;
  ${IconWrapper} {
    opacity: ${(p) => (p.$select ? 0.2 : 1)};
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 76px;
  height: 76px;
  border-radius: 10px;
  background-color: #fff;
  ${contentCentered}
`;

export const StyledImg = styled.img`
  width: 58px;
  height: 58px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 26px;
`;

export const Description = styled.span`
  font-size: 16px;
  font-weight: 26px;
  color: #999faa;
`;
