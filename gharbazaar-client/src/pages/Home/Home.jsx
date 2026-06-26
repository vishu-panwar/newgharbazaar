import Hero from '../../components/Home/hero/Hero';
import BrokerSection from '../../components/Home/properties/BrokerSection';
import HeroBanner from '../../components/Home/hero/HeroBanner';
import QuerySection from '../../components/Home/query/QuerySection';

function Home() {
  return (
    <>
      <Hero />
      
      <BrokerSection />
      <QuerySection/>
    </>
  );
}

export default Home;
