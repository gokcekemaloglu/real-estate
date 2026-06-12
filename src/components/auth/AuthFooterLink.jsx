import React from 'react'
import { Link } from 'react-router-dom'

// Reusable footer link component for authentication pages to maintain DRY principles
const AuthFooterLink = ({ text, linkText, to }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-xs text-slate-400 dark:text-slate-500 font-light">
        {text}{' '}
        <Link to={to} className="text-brand-gold hover:text-amber-500 font-medium transition-colors duration-200">
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default AuthFooterLink