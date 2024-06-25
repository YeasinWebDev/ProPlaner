'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }) {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}

export default AuthProvider