import { useState, useEffect } from 'react';
import ServicesSection from '../components/ServicesSection';
import ComingSoonModal from '../components/ComingSoonModal';

function Services() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a short delay for better UX
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ServicesSection />
      {/* {showModal && <ComingSoonModal onClose={() => setShowModal(false)} />} */}
    </div>
  );
}

export default Services;
