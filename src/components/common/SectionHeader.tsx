import { ISectionHeaderComponentProps } from '@/types/component';
import classNames from 'classnames';
import Link from 'next/link';

const SectionHeader = ({
  className = 'text-xl dark:text-neutral-50',
  type = 'primary',
  title,
  link,
  lineColor = 'bg-gray-100',
  lineHighlightColor = 'bg-red-900 dark:bg-zinc-400',
}: ISectionHeaderComponentProps) => {
  if (!title) return <></>;

  const primaryClass = classNames('h-1', 'flex-1', lineColor);
  const secondaryClass = {
    line: classNames('absolute h-0.5 w-full', lineColor),
    highlight: classNames('absolute h-0.5 w-14', lineHighlightColor),
  };
  const tertiaryClass = classNames('w-1 h-auto', lineColor);

  if (type === 'primary') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {link ? (
          <>
            <Link href={link}>{title}</Link>
            {/* <div className={primaryClass} /> */}
          </>
        ) : (
          <>
            <div>{title}</div>
            {/* <div className={primaryClass} /> */}
          </>
        )}
      </div>
    );
  }

  if (type === 'secondary') {
    return (
      <div className={`${className}`}>
        {link ? (
          <>
            <Link href={link}>{title}</Link>
            {/* <div className="relative mt-2">
              <div className={`${secondaryClass.line}`}></div>
              <div className={`${secondaryClass.highlight}`}></div>
            </div> */}
          </>
        ) : (
          <>
            <div>{title}</div>
            {/* <div className="relative mt-2">
              <div className={secondaryClass.line}></div>
              <div className={secondaryClass.highlight}></div>
            </div> */}
          </>
        )}
      </div>
    );
  }

  if (type === 'tertiary') {
    return (
      <div className={classNames('flex gap-3', className)}>
        {link ? (
          <>
            <div className={tertiaryClass}>{title}</div>
            <Link href={link}>{title}</Link>
          </>
        ) : (
          <>
            <div className={tertiaryClass}></div>
            <div>{title}</div>
          </>
        )}
      </div>
    );
  }

  return <></>;
};

export default SectionHeader;
