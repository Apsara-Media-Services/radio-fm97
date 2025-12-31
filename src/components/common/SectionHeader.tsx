import { ISectionHeaderComponentProps } from '@/types/component';
import classNames from 'classnames';
import Link from 'next/link';

const SectionHeader = ({
  className = 'text-xl text-gray-700 dark:text-slate-300',
  type = 'primary',
  title,
  link,
  lineColor = 'bg-gray-100',
  // lineHighlightColor = 'bg-red-900 dark:bg-zinc-400',
}: ISectionHeaderComponentProps) => {
  if (!title) return <></>;

  // const primaryClass = classNames('h-1', 'flex-1', lineColor);
  // const secondaryClass = {
  //   line: classNames('absolute h-0.5 w-full', lineColor),
  //   highlight: classNames('absolute h-0.5 w-14', lineHighlightColor),
  // };
  const tertiaryClass = classNames('w-1 h-auto', lineColor);

  if (type === 'primary') {
    return (
      <h2 className={`flex items-center gap-3 ${className}`}>
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
      </h2>
    );
  }

  if (type === 'secondary') {
    return (
      <h2 className={`${className}`}>
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
      </h2>
    );
  }

  if (type === 'tertiary') {
    return (
      <h2 className={classNames('flex gap-3', className)}>
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
      </h2>
    );
  }

  return <></>;
};

export default SectionHeader;
