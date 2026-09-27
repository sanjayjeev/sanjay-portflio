const TAU = Math.PI * 2

export function createRenderer({ canvas }) {
  const context = canvas.getContext('2d')
  if (!context) return { ready: Promise.resolve(), dispose() {} }

  let frame = 0
  let disposed = false
  let width = 0
  let height = 0
  let particles = []
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const bounds = canvas.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    canvas.width = width * ratio
    canvas.height = height * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    particles = Array.from({ length: Math.max(90, Math.floor(width / 7)) }, (_, index) => ({
      angle: (index / 120) * TAU + Math.random(),
      radius: 70 + Math.random() * Math.min(width, height) * 0.5,
      speed: 0.001 + Math.random() * 0.002,
      size: 0.4 + Math.random() * 1.4,
      alpha: 0.15 + Math.random() * 0.65,
    }))
  }

  const draw = (time) => {
    if (disposed) return
    const centerX = width * 0.5
    const centerY = height * 0.5
    const scale = Math.min(width, height) / 620
    context.clearRect(0, 0, width, height)
    context.fillStyle = '#030504'
    context.fillRect(0, 0, width, height)

    const halo = context.createRadialGradient(centerX, centerY, 12 * scale, centerX, centerY, 240 * scale)
    halo.addColorStop(0, 'rgba(216, 250, 112, 0.16)')
    halo.addColorStop(0.35, 'rgba(133, 219, 226, 0.08)')
    halo.addColorStop(0.72, 'rgba(216, 250, 112, 0.02)')
    halo.addColorStop(1, 'transparent')
    context.fillStyle = halo
    context.fillRect(0, 0, width, height)

    context.save()
    context.translate(centerX, centerY)
    context.rotate(-0.22)
    context.scale(1, 0.4)
    const disk = context.createRadialGradient(0, 0, 35 * scale, 0, 0, 210 * scale)
    disk.addColorStop(0, '#020302')
    disk.addColorStop(0.22, 'rgba(216, 250, 112, 0.9)')
    disk.addColorStop(0.38, 'rgba(133, 219, 226, 0.38)')
    disk.addColorStop(0.58, 'rgba(216, 250, 112, 0.12)')
    disk.addColorStop(1, 'transparent')
    context.fillStyle = disk
    context.fillRect(-250 * scale, -250 * scale, 500 * scale, 500 * scale)
    context.restore()

    particles.forEach((particle) => {
      const angle = particle.angle + (reduceMotion ? 0 : time * particle.speed)
      const x = centerX + Math.cos(angle) * particle.radius * scale
      const y = centerY + Math.sin(angle) * particle.radius * scale * 0.42
      context.beginPath()
      context.fillStyle = `rgba(216, 250, 112, ${particle.alpha})`
      context.arc(x, y, particle.size * scale, 0, TAU)
      context.fill()
    })

    context.beginPath()
    context.fillStyle = '#010201'
    context.shadowColor = 'rgba(216, 250, 112, 0.8)'
    context.shadowBlur = 28 * scale
    context.arc(centerX, centerY, 42 * scale, 0, TAU)
    context.fill()
    context.shadowBlur = 0
    frame = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener('resize', resize)
  frame = requestAnimationFrame(draw)

  return {
    ready: Promise.resolve(),
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    },
  }
}
