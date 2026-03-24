import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 border-top">
      <div>
        <span className="fw-bold text-primary">GD Motors</span>
        <span className="ms-1">&copy; 2025.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Made with</span>
        <span style={{ color: '#E31E24' }}>❤️</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
