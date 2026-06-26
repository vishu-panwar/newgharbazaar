import React, { useState } from 'react'
import ComingSoonModal from './ComingSoonModal'
import { useNavigate } from 'react-router-dom'

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
    navigate(-1)
  }

  return (
    <div>
      <ComingSoonModal
        isOpen={isOpen}
        onClose={handleClose}
        serviceName="Services"
      />
    </div>
  )
}

export default ServicesSection