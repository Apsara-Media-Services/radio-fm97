import app from '@/configs/app';
import { Program } from '@/gql/graphql';
import { IComponentProps } from '@/types/component';
import { getMediaUrl } from '@/utils/wp';
import { Image } from '@heroui/react';

import { Container } from '../common';

interface IProps extends IComponentProps {
  program: Program;
}

const PodcastHero = ({ className, program }: IProps) => {
  return (
    <div className={className}>
      <div className="min-h-96 flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={getMediaUrl(program?.radio?.thumbnail?.node)}
          fallbackSrc={app.logo}
        />

        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-48 md:h-60">
              <Image
                removeWrapper
                alt="Card background"
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={getMediaUrl(program?.radio?.thumbnail?.node)}
                fallbackSrc={app.logo}
              />
            </div>
            <div className="text-white w-full md:w-auto">
              <div className="text-2xl md:text-3xl font-semibold">
                <span
                  className={
                    'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-primary relative'
                  }
                >
                  {program.name}
                </span>
              </div>
              <h5 className="my-5 line-clamp-5 text-lg text-slate-200">
                {program.description}
              </h5>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PodcastHero;
