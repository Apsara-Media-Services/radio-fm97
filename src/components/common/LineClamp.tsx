import { ILineClampComponentProps } from '@/types/component';
import { isEmpty, isNil } from 'lodash';
import sanitizeHtml from 'sanitize-html';

const LineClamp = ({ content, line = 5 }: ILineClampComponentProps) => {
  const style: any = {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: line,
  };

  if (isNil(content) || isEmpty(content)) return <></>;

  return (
    <span style={style}>{sanitizeHtml(content, { allowedTags: [] })}</span>
  );
};

export default LineClamp;
