import { useEffect, useRef } from 'react'
import { createRenderer } from './black-hole-utils/renderer'

export function BlackHole() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const renderer = createRenderer({ canvas })
    void renderer.ready

    return () => renderer.dispose()
  }, [])

  return (
    <div className="black-hole" aria-hidden="true">
      <canvas ref={canvasRef} className="black-hole-canvas" />
    </div>
  )
}

export default BlackHole
