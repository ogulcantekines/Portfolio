import { ImageResponse } from 'next/og'

export const alt = 'Oğulcan Tekineş — Offensive Security & Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded Open Graph image (dark + emerald), generated at request time.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 90,
        background: '#0a0a0a',
        backgroundImage:
          'radial-gradient(circle at 22% 24%, rgba(16,185,129,0.20), transparent 55%)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 8, color: '#10b981' }}>
        {'> AVAILABLE FOR WORK'}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 92,
          fontWeight: 800,
          color: 'white',
          marginTop: 28,
        }}
      >
        {'Oğulcan Tekineş'}
      </div>
      <div style={{ display: 'flex', fontSize: 36, color: '#a1a1aa', marginTop: 26 }}>
        {'Offensive Security & Full-Stack Developer'}
      </div>
      <div
        style={{ display: 'flex', marginTop: 50, height: 5, width: 190, background: '#10b981' }}
      />
    </div>,
    { ...size }
  )
}
