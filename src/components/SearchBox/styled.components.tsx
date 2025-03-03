import styled from 'styled-components';
import { fontWithPoppins } from '../../styles';

export const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  /* padding-bottom: 0; */
  width: 690px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`;

export const TagsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const BottomBar = styled.div<{ $error?: boolean }>`
  border-top: 1px solid #f2f4f8;
  padding: 8px 24px;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
  font-weight: 500;
  color: ${(p) => (p.$error ? '#ED2E7E' : ' #999faa')};
  ${fontWithPoppins}
`;
