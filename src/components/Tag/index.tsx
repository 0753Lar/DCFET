import { LuTag } from 'react-icons/lu';
import { TagContainer, TagName, TagWrapper } from './styled.components';
import { HTMLAttributes } from 'react';

interface TagProps {
  name?: string;
  selected?: boolean;
  focused?: boolean;
}
export default function Tag({
  name,
  focused,
  selected,
  ...rest
}: TagProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <TagContainer $highlight={selected} $focus={focused} {...rest}>
      <TagWrapper>
        <LuTag />
      </TagWrapper>
      {name && <TagName>{name}</TagName>}
    </TagContainer>
  );
}
