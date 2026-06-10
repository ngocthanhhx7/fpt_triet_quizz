interface PageTextureProps {
  opacity?: number
}

export function PageTexture({ opacity = 0.22 }: PageTextureProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 pointer-events-none mix-blend-soft-light"
        style={{
          opacity,
          backgroundImage: `url(${import.meta.env.BASE_URL}texture.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="fixed inset-0 z-50 pointer-events-none bg-[#010828]/10" />
    </>
  )
}
