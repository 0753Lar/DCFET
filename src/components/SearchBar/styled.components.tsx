import styled from 'styled-components';
import { contentCentered, fontWithPoppins } from '../../styles';
import { InputStatus } from '.';

export const SearchBarContiner = styled.div<{ $status?: InputStatus }>`
  padding: 20px 24px;
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
  border: 3px solid
    ${(p) =>
      p.$status === 'error'
        ? '#ED2E7E'
        : p.$status === 'focusing'
          ? '#6833FF'
          : 'transparent'};
  display: flex;
  align-items: center;
  background-color: #f2f4f8;
  border-radius: 12px;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  background-color: transparent;
  color: #000;
  ${fontWithPoppins}

  &::placeholder {
    font-weight: 400;
    color: #999faa;
  }
`;

export const IconWrapper = styled.div`
  ${contentCentered}
`;
