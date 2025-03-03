import styled from 'styled-components';
import { contentCentered } from '../../styles';

export const Centered = styled.div`
  ${contentCentered}
`;
export const ResultBoardContainer = styled.div`
  position: 'relative';
  height: 406px;
`;

export const Img = styled.img`
  cursor: pointer;
  width: 247px;
`;

export const ItemsWrapper = styled.div<{ $mask?: boolean }>`
  opacity: ${(p) => (p.$mask ? 0.4 : 1)};
  overflow-y: scroll;
  height: 100%;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  ${contentCentered}
`;
