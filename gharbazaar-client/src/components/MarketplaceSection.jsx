import React, { useState } from 'react'
import ComingSoon from './ComingSoonModal'

const MarketplaceSection = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <ComingSoon
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceName="Marketplace"
      />
    </div>
  )
}

export default MarketplaceSection