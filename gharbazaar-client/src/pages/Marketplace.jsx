import React, { useState } from 'react'
import ComingSoon from '../components/common/ComingSoon'
import ComingSoonModal from '../components/ComingSoonModal'
import { useNavigate } from 'react-router-dom'

const MarketplaceSection = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
    navigate(-1) // goes back to previous page when modal is closed
  }

  return (
    <div>
      <ComingSoonModal
        isOpen={isOpen}
        onClose={handleClose}
        serviceName="Marketplace"
      />
    </div>
  )
}

export default MarketplaceSection