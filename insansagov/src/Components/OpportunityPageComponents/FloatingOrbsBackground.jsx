import React from 'react'

const FloatingOrbsBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-200 opacity-50 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-blue-200 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
        </div>
      )
}

export default FloatingOrbsBackground