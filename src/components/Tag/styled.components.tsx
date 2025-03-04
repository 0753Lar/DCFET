import styled from 'styled-components';
import { contentCentered, fontWithPoppins } from '../../styles';

export const TagContainer = styled.div<{
  $highlight?: boolean;
  $focus?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border-radius: 40px;
  border: 2px solid ${(p) => (p.$focus ? '#999FAA' : 'transparent')};
  color: ${(p) => (p.$highlight ? '#fff' : '#6833FF')};
  background-color: ${(p) => (p.$highlight ? '#6833FF' : '#F2F4F8')};
  cursor: pointer;

  &:hover {
    background-color: #865cff;
  }
  ${fontWithPoppins}
`;

export const TagWrapper = styled.span`
  ${contentCentered}
  width: 20px;
  height: 20px;
`;

export const TagName = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
`;
