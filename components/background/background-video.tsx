"use client"

import { useEffect, useRef } from "react"

export function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    // Star field
    const stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = []
    
    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1
      })
    }

    // Satellite orbits
    const orbits = [
      { radius: 150, speed: 0.01, offset: 0 },
      { radius: 200, speed: 0.008, offset: Math.PI / 2 },
      { radius: 250, speed: 0.012, offset: Math.PI }
    ]

    const animate = () => {
      time += 0.01

      // Clear canvas with dark space background
      ctx.fillStyle = 'rgba(11, 15, 26, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star, index) => {
        // Twinkling effect
        const twinkle = Math.sin(time * 2 + index) * 0.3 + 0.7
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()

        // Move stars slowly
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = -star.size
          star.x = Math.random() * canvas.width
        }
      })

      // Draw Earth (simplified)
      const earthX = canvas.width / 2
      const earthY = canvas.height / 2
      const earthRadius = 80

      // Earth glow
      const earthGradient = ctx.createRadialGradient(
        earthX, earthY, earthRadius * 0.8,
        earthX, earthY, earthRadius * 1.5
      )
      earthGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      earthGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

      ctx.beginPath()
      ctx.arc(earthX, earthY, earthRadius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = earthGradient
      ctx.fill()

      // Earth body
      ctx.beginPath()
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'
      ctx.fill()

      // Draw orbital paths
      orbits.forEach((orbit, index) => {
        ctx.beginPath()
        ctx.arc(earthX, earthY, orbit.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 + Math.sin(time + index) * 0.1})`
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])

        // Draw satellite on orbit
        const satX = earthX + Math.cos(time * orbit.speed + orbit.offset) * orbit.radius
        const satY = earthY + Math.sin(time * orbit.speed + orbit.offset) * orbit.radius

        // Satellite glow
        ctx.beginPath()
        ctx.arc(satX, satY, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.3)'
        ctx.fill()

        // Satellite body
        ctx.beginPath()
        ctx.arc(satX, satY, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.9)'
        ctx.fill()

        // Satellite trail
        for (let i = 1; i <= 10; i++) {
          const trailX = earthX + Math.cos(time * orbit.speed + orbit.offset - i * 0.1) * orbit.radius
          const trailY = earthY + Math.sin(time * orbit.speed + orbit.offset - i * 0.1) * orbit.radius
          
          ctx.beginPath()
          ctx.arc(trailX, trailY, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(167, 139, 250, ${0.5 - i * 0.05})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  )
}