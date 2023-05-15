import find from 'lodash/find';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CMS_NAME } from '~/lib/constants';
import ReactPlayer from 'react-player';
import sanitizeHtml from 'sanitize-html';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { postPathById } from '~/lib/posts';
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
import PostCategoryTag from './post-category-tag';
import PostDate from './post-date';

export default function PostDetailItem({ post, title }) {
  if (!post) {
    return null;
  }

  const { postFormats = [], videoLink } = post || {};
  const isVideo =
    !!find(postFormats, ['slug', 'post-format-video']) && !!videoLink;
  return (
    <article className="post-detail mt-4 sm:mt-6">
      <div id={post.databaseId}> </div>
      <Head>
        <title>
          {sanitizeHtml(title, { allowedTags: [] })} {CMS_NAME}
        </title>
        <meta property="og:image" content={post.featuredImage?.sourceUrl} />
      </Head>
      <div className="grid sm:grid-cols-3 gap-3 lg:gap-6">
        <div className="col-span-2">
          <h3 className="entry-title text-lg sm:text-3xl px-3 sm:px-0">
            {sanitizeHtml(post.title, { allowedTags: [] })}
          </h3>
          <div className="flex flex-wrap my-3 items-center justify-between">
            <div className="flex flex-wrap items-center">
              <span className="text-sm pl-3 sm:pl-0 mb-3 md:mb-0">
                <PostCategoryTag categories={post.categories} />
              </span>
              <span className="w-0.5 h-4 mx-3 bg-slate-800 dark:bg-white" />
              <span className="text-sm pl-3 sm:pl-0 flex items-center">
                <PostDate dateString={post.date} />
                <span className="w-0.5 h-4 mx-3 bg-slate-800 dark:bg-white" />
                <div className="flex items-center">
                  អត្ថបទដោយ៖
                  <Link href={`/author/${post.author?.slug}`}>
                    <a aria-label={post.author?.name}>
                      <div className="ml-1 font-bold md:text-lg">
                        {post.author?.name}
                      </div>
                    </a>
                  </Link>
                </div>
              </span>
            </div>
            <div className="flex gap-2 mt-3 pl-3 sm:pl-0">
              <FacebookShareButton
                url={`https://ams.page/c/${post.databaseId}`}
                quote={sanitizeHtml(title, { allowedTags: [] })}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TelegramShareButton
                url={`https://ams.page/c/${post.databaseId}`}
                title={sanitizeHtml(title, { allowedTags: [] })}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <TwitterShareButton
                url={`https://ams.page/c/${post.databaseId}`}
                title={sanitizeHtml(title, { allowedTags: [] })}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>

          {isVideo && (
            <div className="player-wrapper mb-5">
              <ReactPlayer
                className="react-player"
                url={videoLink}
                controls
                width="100%"
                height="100%"
              />
            </div>
          )}
          {!isVideo && (
            <div className="relative my-3 sm:my-6 pb-[56%]">
              <Image
                src={post.featuredImage?.sourceUrl}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div
            className="px-3 sm:px-0 md:text-lg"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div className="px-3 sm:px-0">
            <div className="border mb-4 p-5">
              <div className="md:flex items-center text-center md:text-left">
                <div className="relative w-24 h-24 md:w-36 md:h-36 flex-none mx-auto">
                  <Image
                    src={post.author?.amsAvatar}
                    layout="fill"
                    className="rounded-full"
                    alt={post.author?.name}
                  />
                </div>
                <div className="md:ml-4 mt-4 md:mt-0 grow">
                  <Link href={`/author/${post.author?.slug}`}>
                    <a
                      aria-label={post.author?.name}
                      className="font-bold md:text-lg"
                    >
                      {post.author?.name}
                    </a>
                  </Link>
                  <div className="mt-3">{post.author?.description}</div>
                </div>
              </div>
            </div>
            <div className="relative ads my-4">
              <Image
                src="https://asset.ams.com.kh/central/media/2020/07/ads-olatte.jpg"
                layout="fill"
                objectFit="cover"
                alt="ads banner"
              />
            </div>
            <div className="join-telegram relative my-4 border pb-[28%]">
              <Link href="https://t.me/ApsaraMediaServices">
                <a target="_blank">
                  <Image
                    src="https://asset.ams.com.kh/central/media/2020/07/AMS-Telegram-100.jpg"
                    layout="fill"
                    objectFit="contain"
                    className="w-full"
                    alt="ads banner"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex justify-between px-3 sm:px-0 mb-4">
            {post.previous && (
              <Link href={postPathById(post.previous.databaseId)}>
                <a className="p-3 sm:p-4 bg-slate-100 dark:bg-gray-600 shadow focus:outline-none">
                  <ChevronLeftIcon className="h-5 w-5 inline" />
                  អត្ថបទមុន
                </a>
              </Link>
            )}
            {post.next && (
              <Link href={postPathById(post.next.databaseId)}>
                <a className="p-3 sm:p-4 bg-slate-100 dark:bg-gray-600 shadow focus:outline-none">
                  អត្ថបទបន្ទាប់
                  <ChevronRightIcon className="h-5 w-5 inline" />
                </a>
              </Link>
            )}
          </div>
          {/* {post.author} */}
        </div>
        <div className="mb-4 px-3 sm:px-0 col-span-2 sm:col-auto">
          <div className="sticky top-14">
            <div className="ads">
              <Image
                src="https://asset.ams.com.kh/central/media/2021/04/cama-mf-2.jpg"
                layout="fill"
                objectFit="contain"
                className="w-full object-top"
                alt="ads banner"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
