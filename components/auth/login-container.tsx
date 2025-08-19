"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

export default function LoginContainer() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="w-full max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <SignupForm onToggleForm={() => setIsLogin(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
