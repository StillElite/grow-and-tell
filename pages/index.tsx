import {
  FeatureSection,
  Footer,
  Header,
  Hero,
  SeedToHarvest,
} from '../src/components';

const HomePage = () => {
  return (
    <>
      <Header />
      <main id='main-content' className='bg-white min-h-screen'>
        <Hero />
        <FeatureSection />
        <SeedToHarvest />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
