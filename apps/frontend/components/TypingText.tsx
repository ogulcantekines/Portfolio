'use client'

import { useEffect, useState } from 'react'

const lines = [
  '> Offensive Security Researcher',
  '> DevSecOps Engineer',
  '> Network Engineer',
  '> Penetration Tester',
]

export default function TypingText() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = lines[lineIndex]

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIndex + 1))
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1800)
          } else {
            setCharIndex((c) => c + 1)
          }
        } else {
          setText(current.slice(0, charIndex - 1))
          if (charIndex - 1 === 0) {
            setDeleting(false)
            setLineIndex((l) => (l + 1) % lines.length)
            setCharIndex(0)
          } else {
            setCharIndex((c) => c - 1)
          }
        }
      },
      deleting ? 40 : 70
    )

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, lineIndex])

  return (
    <p className="font-mono text-base text-emerald-400 sm:text-lg">
      {text}
      <span className="cursor-blink text-emerald-300">█</span>
    </p>
  )
}
