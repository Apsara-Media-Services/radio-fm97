import FallbackImage from '@/components/common/FallbackImage';
import { IAuthorCardComponentProps } from '@/types/component';

const AuthorCard = ({ user, className }: IAuthorCardComponentProps) => {
  const { name: _name, firstName, lastName, description, avatar } = user;
  const name = _name || [firstName, lastName].filter(Boolean).join(' ');

  return (
    <div
      className={`bg-ams-light p-5 text-center shadow dark:bg-zinc-800 ${className}`}
    >
      <div className="relative">
        <FallbackImage
          alt={name}
          src={avatar?.url as string}
          width="200"
          height="200"
          className="mx-auto rounded-full"
        />
      </div>
      <div className="text-xl font-bold mt-3">{name}</div>
      {description && <div className="mt-3">{description}</div>}
    </div>
  );
};

export default AuthorCard;
