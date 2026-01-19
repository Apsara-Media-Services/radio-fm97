'use client';

import PodcastPlayButton from '@/components/podcast/PodcastPlayButton';
import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { getAcfMediaUrl } from '@/utils/wp';
import { Image } from '@heroui/react';
import NextImage from 'next/image';

import { Container } from '../common';

interface IProps extends IComponentProps {
  program: WP_REST_API_ACF_Program;
  post: WP_REST_API_ACF_Post;
}

const PodcastHero = ({ className, program, post }: IProps) => {
  return (
    <div className={className}>
      <div className="w-full min-h-[400px] flex items-center relative py-8 dark">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />
        <Image
          fill
          as={NextImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          removeWrapper
          alt={program.name}
          className="object-cover opacity-100 z-0 absolute inset-0"
          src={getAcfMediaUrl(program.acf.thumbnail)}
        />

        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-48 md:h-60">
              <Image
                fill
                as={NextImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                removeWrapper
                alt={program.name}
                className="object-cover opacity-100 rounded-full"
                src={getAcfMediaUrl(program.acf.thumbnail)}
                fallbackSrc={app.logo}
              />
            </div>
            <div className="w-full md:w-auto">
              <div className="text-2xl md:text-3xl font-semibold text-title">
                <h1
                  className={
                    'before:absolute before:-bottom-3 before:h-1 before:w-16 before:bg-ams-primary relative'
                  }
                >
                  {program.name}
                </h1>
              </div>
              <p
                className="my-5 md:text-lg text-body line-clamp-4"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
              <PodcastPlayButton
                program={program}
                post={post}
                label="ស្តាប់វគ្គចុងក្រោយ"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PodcastHero;
