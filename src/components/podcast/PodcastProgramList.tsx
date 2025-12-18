import { SectionHeader } from '@/components/common';
import PodcastCard from '@/components/podcast/PodcastCard';
import app from '@/configs/app';
import { IPodcastProgramListComponentProps } from '@/types/component';
import { getAcfMediaUrl } from '@/utils/wp';

const PodcastProgramList = (props: IPodcastProgramListComponentProps) => {
  const { className, programs, title } = props;

  return (
    <section className={className}>
      <div className="mb-5 md:mb-10">
        <SectionHeader
          type="primary"
          title={title}
          className="text-2xl md:text-3xl font-semibold"
        />
      </div>
      <div className="mb-3 xl:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program, key) => {
            return (
              <PodcastCard
                key={key}
                title={program.name as string}
                tag={app.tag}
                imageUrl={getAcfMediaUrl(program.acf.thumbnail)}
                to={`audio/${program.slug}`}
                className="h-[300px]"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PodcastProgramList;
