'use client';

import app from '@/configs/app';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import sanitizeHtml from 'sanitize-html';

const PostSocialSharing = (props: IPostComponentProps) => {
  const { className, post } = props;
  const title = sanitizeHtml(post?.title?.rendered as string, {
    allowedTags: [],
  });

  return (
    <div className={classNames('py-5', className)}>
      <div className="border-t ams-border" />
      <div
        className={classNames('flex items-center justify-center gap-4 py-5')}
      >
        <FacebookShareButton
          url={`${app.url}/news/detail/${post.id}`}
          hashtag={`#AMS #${app.name_en.replaceAll(' ', '')}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TelegramShareButton
          url={`${app.url}/news/detail/${post.id}`}
          title={title}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={`${app.url}/news/detail/${post.id}`}
          title={title}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${app.url}/news/detail/${post.id}`}
          title={title}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={`${app.url}/news/detail/${post.id}`}
          title={title}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div className="border-b ams-border" />
    </div>
  );
};

export default PostSocialSharing;
