import {
  useEffect,
  useRef,
  type MouseEventHandler,
  type ReactNode,
} from 'react'

interface IButtonWithHoverProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ButtonWithHover = ({ children, onClick }: IButtonWithHoverProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const animationRef = useRef<number | null>(null)
  const radiusRef = useRef(0)
  const targetRadiusRef = useRef(0)
  const sizeRef = useRef({ width: 0, height: 0 })

  const pinkColor = '#B08AE8'

  useEffect(() => {
    const button = buttonRef.current
    const canvas = canvasRef.current

    if (!button || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const { width, height } = sizeRef.current
      const radius = radiusRef.current

      ctx.clearRect(0, 0, width, height)

      if (radius <= 0) return

      ctx.beginPath()
      ctx.arc(width / 2, height, radius, 0, Math.PI * 2)
      ctx.fillStyle = pinkColor
      ctx.fill()
    }

    const resizeCanvas = () => {
      const rect = button.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      sizeRef.current = {
        width: rect.width,
        height: rect.height,
      }

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const animate = () => {
      const currentRadius = radiusRef.current
      const targetRadius = targetRadiusRef.current

      const isClosing = targetRadius < currentRadius
      const speed = isClosing ? 0.06 : 0.03

      radiusRef.current += (targetRadius - currentRadius) * speed

      if (Math.abs(targetRadius - radiusRef.current) < 0.5) {
        radiusRef.current = targetRadius
      }

      draw()

      if (radiusRef.current !== targetRadius) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    const animateTo = (nextRadius: number) => {
      targetRadiusRef.current = nextRadius

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => {
      const { width, height } = sizeRef.current
      const maxRadius = Math.sqrt(width ** 2 + height ** 2)
      animateTo(maxRadius)
    }

    const handleMouseLeave = () => {
      animateTo(0)
    }

    resizeCanvas()

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resizeCanvas)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className="group relative h-14 w-full overflow-hidden rounded-[30px] border border-black bg-white p-0 text-base font-semibold text-black transition-colors duration-300 hover:cursor-pointer sm:w-55 sm:text-lg"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />

      <span className="pointer-events-none relative z-10 transition-colors duration-300 font-normal">
        {children}
      </span>
    </button>
  )
}

export default ButtonWithHover
