import MobileBottomMenu from '@/components/layout/MobileBottomMenu';
import Player from '@/components/layout/Player';
import { IComponentProps } from '@/types/component';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

const MainLayout = ({ children }: IComponentProps) => {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-black">{children}</main>
      <Footer />
      <div className="sticky bottom-0 z-10">
        <Player />
        <MobileBottomMenu />
      </div>
    </>
  );
};

export default MainLayout;
