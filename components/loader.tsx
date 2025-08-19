"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const duration = 2000 // Reduced from 2500ms to 2000ms for faster loading
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      const newProgress = (currentStep / steps) * 100
      setProgress(newProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        // Immediately hide loader when complete
        setLoading(false)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!loading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        {/* SVG without animation */}
        <div className="w-32 h-32 relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2666.6667 2666.6667" width="100%" height="100%">
            <g transform="matrix(1.3333333,0,0,-1.3333333,0,2666.6667)">
              <g transform="scale(0.1)">
                <path style={{ fill: "#1a1a1a" }} d="m 10000,3931.7 -6500,780.1 v 9714.6 l 6500,1641.9 V 3931.7" />
                <g transform="scale(1.01227)">
                  <path
                    style={{ fill: "#333333" }}
                    d="M 9878.79,3884.04 16300,4654.69 v 9596.81 l-6421.21,1622 V 3884.04"
                  />
                </g>
                <path style={{ fill: "#d69238" }} d="m 10000,14029.5 v -759.3 L 3500,11628.1 v 759.4 l 6500,1642" />
                <g transform="scale(1.01227)">
                  <path
                    style={{ fill: "#edc64a" }}
                    d="m 16300,12237.3 v -750.1 l -6421.21,1622.1 v 750.2 L 16300,12237.3"
                  />
                </g>
                <path style={{ fill: "#edc64a" }} d="m 10000,12828.8 1146.5,-289.7 v -759.4 l -1146.5,289.7 v 759.4" />
                <path style={{ fill: "#edc64a" }} d="m 11587.8,12427.8 581.9,-147.3 v -759.4 l -581.9,147.3 v 759.4" />
                <path style={{ fill: "#edc64a" }} d="m 12611,12169.2 1278,-322.8 V 11087 l -1278,322.9 v 759.3" />
                <path style={{ fill: "#edc64a" }} d="m 14330.3,11735.1 581.9,-147.3 v -759.4 l -581.9,147.3 v 759.4" />
                <g transform="scale(1.01227)">
                  <path
                    style={{ fill: "#edc64a" }}
                    d="M 16300,11051.2 V 10301 l-1132.6,286.3 v 750.1 l 1132.6,-286.2"
                  />
                </g>
                <path
                  style={{ fill: "#d69238" }}
                  d="m 10000,12828.8 -1146.49,-289.7 v -759.4 l 1146.49,289.7 v 759.4"
                />
                <path
                  style={{ fill: "#d69238" }}
                  d="m 8412.18,12427.8 -581.88,-147.3 v -759.4 l 581.88,147.3 v 759.4"
                />
                <path
                  style={{ fill: "#d69238" }}
                  d="M 7388.96,12169.2 6111.04,11846.4 V 11087 l 1277.92,322.9 v 759.3"
                />
                <path style={{ fill: "#d69238" }} d="m 5669.7,11735.1 -581.88,-147.3 v -759.4 l 581.88,147.3 v 759.4" />
                <path style={{ fill: "#d69238" }} d="m 3500,11186.8 v -759.4 l 1146.49,289.8 v 759.3 L 3500,11186.8" />
              </g>
            </g>
          </svg>

          {/* Circular progress bar */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
