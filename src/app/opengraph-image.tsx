import { ImageResponse } from 'next/og'

export const alt = 'EL PARAISO — コミュニティブランド'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #1a1410 0%, #2e2419 55%, #4a3a26 100%)',
          color: '#f3ece0',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-180px',
            width: '620px',
            height: '620px',
            borderRadius: '9999px',
            background:
              'radial-gradient(circle, rgba(214,158,90,0.30) 0%, rgba(214,158,90,0) 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            letterSpacing: '0.42em',
            color: '#d69e5a',
            fontWeight: 600,
          }}
        >
          COMMUNITY BRAND · EST. 2021
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '150px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            EL&nbsp;<span style={{ color: '#d69e5a' }}>PARAISO</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: 'rgba(243,236,224,0.72)',
              lineHeight: 1.5,
              maxWidth: '960px',
            }}
          >
            染め・プリント・グラフィックデザインで、日々の感情や情景をプロダクトに反映する。
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          {['DYEING', 'PRINT', 'GRAPHIC DESIGN'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '12px 26px',
                borderRadius: '9999px',
                border: '1px solid rgba(214,158,90,0.45)',
                color: '#d69e5a',
                fontSize: '22px',
                letterSpacing: '0.08em',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
