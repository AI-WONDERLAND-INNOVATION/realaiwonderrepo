// frontend-builder/app/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Monaco must be dynamically imported for Next.js client usage
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const TOP_ICONS = ['Home', 'Apps', 'Marketplace', 'Sponsors', 'Profile']
const GRID_ICONS = [
  'Models', 'Proposals', 'Duograms',
  'BuilderHub', 'DreamStack', 'Threads',
  'Moutland', 'Bomblers', 'Petivian',
]

function TieDyeIcon({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
      aria-label={label}
    >
      <div
        aria-hidden
        className="w-20 h-20 rounded-lg flex items-center justify-center shadow-lg"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, #ffd3a5, transparent 10%), radial-gradient(circle at 80% 30%, #f8a1e6, transparent 10%), radial-gradient(circle at 50% 80%, #8fe3ff, transparent 18%), linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.06))',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span className="text-white font-semibold text-lg select-none">{label.charAt(0)}</span>
      </div>
      <span className="text-sm text-white/90 uppercase tracking-wide">{label}</span>
    </button>
  )
}

function TopIcon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center shadow"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.04)), radial-gradient(circle at 30% 30%, #ffd3a5, transparent 10%), radial-gradient(circle at 70% 70%, #8fe3ff, transparent 10%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span className="text-white font-medium text-xs uppercase">{label.charAt(0)}</span>
      </div>
      <span className="text-xs text-white/90 mt-2 uppercase tracking-wide">{label}</span>
    </div>
  )
}

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [showImageCard, setShowImageCard] = useState(false)
  const [editorCode, setEditorCode] = useState<string>(`// Example component preview
export default function Hello() {
  return <div style={{padding:20,background:'#fff'}}>Hello from live preview</div>
}`)
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([
    { from: 'ai', text: 'Hi — what can I build for you?' },
  ])
  const [input, setInput] = useState('')

  const editorOptions = useMemo(() => ({ minimap: { enabled: false }, fontSize: 14 }), [])

  function sendMessage() {
    if (!input.trim()) return
    const userMsg = { from: 'user' as const, text: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: `I can help build: ${userMsg.text}` }])
    }, 600)
  }

  return (
    <main className="relative min-h-screen w-full overflow-auto bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/1000015387.png"
          alt="AI Wonderland background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      </div>

      {/* Top bar: icons + chat bubble + image toggle */}
      <header className="max-w-6xl mx-auto px-6 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {TOP_ICONS.map((t) => (
              <TopIcon key={t} label={t} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowImageCard((s) => !s)}
              className="px-3 py-2 rounded-md text-sm bg-white/10 hover:bg-white/20"
              aria-pressed={showImageCard}
            >
              Toggle Image
            </button>

            <button
              onClick={() => setChatOpen(true)}
              className="px-4 py-2 rounded-full shadow-lg text-sm text-black font-semibold"
              style={{
                background: 'linear-gradient(90deg, #ffcf5c, #ff7ab0)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label="Open AI chat"
            >
              What can I build for you?
            </button>
          </div>
        </div>
      </header>

      {/* optional image preview card */}
      {showImageCard && (
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <div className="rounded-lg overflow-hidden shadow-lg bg-white/5 p-3">
            <div className="relative w-full h-56 md:h-80">
              <Image src="/1000015387.png" alt="Preview" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="mt-3 text-sm text-white/90">Background preview (public/1000015387.png)</div>
          </div>
        </div>
      )}

      {/* Center title */}
      <section className="flex flex-col items-center justify-center text-center mt-10 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg tracking-tight">
          AI WONDERLAND
        </h1>
        <p className="mt-2 text-white/80 max-w-2xl">A dreamy, playful space where AI and creativity meet.</p>
      </section>

      {/* Icon grid + editor/preview panel */}
      <section className="max-w-6xl mx-auto px-6 mt-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-3 gap-8">
            {GRID_ICONS.map((label) => (
              <TieDyeIcon key={label} label={label} onClick={() => alert(`${label} clicked`)} />
