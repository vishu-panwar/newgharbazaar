import { Star, MapPin, Phone, MessageCircle, BadgeCheck, TrendingUp, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '../hero/HeroBanner';
import CategoriesSection from './categories/CategoriesSection';
import OffersSection from './offers/OffersSection';
import RecentPropertiesSection from "../../../components/Home/properties/Recentsection/RecentPropertiesSection"
import HomeSection from './PropertyTypeSection/HomeSection';
import PGSection from './PropertyTypeSection/PGSection';


export default function BrokerSection() {
  const navigate = useNavigate();
  
  return (
    <main className="broker-page">
      <HeroBanner/>
     <RecentPropertiesSection/>
     <CategoriesSection/>
      <HomeSection/>
      <PGSection/>
     <OffersSection/>
    </main>
  );
}
