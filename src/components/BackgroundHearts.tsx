import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
}

const COLORS = [
  'rgba(244, 63, 94, ',   // rose
  'rgba(236, 72, 153, ',  // pink
  'rgba(168, 85, 247, ',  // purple
  'rgba(251, 113, 133, ', // light rose
  'rgba(217, 70, 239, ',  // fuchsia
  'rgba(255, 107, 107, ', // warm coral
];

export const BackgroundHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Helper to draw a heart path
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.beginPath();
      context.fillStyle = `${color}${opacity})`;

      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // top right curve
      context.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);

      context.closePath();
      context.fill();
      context.restore();
    };

    // Initialize floating hearts
    const heartCount = Math.min(Math.floor(width / 35), 45);
    const hearts: HeartParticle[] = [];

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 16 + 8,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.45 + 0.15,
        fadeSpeed: (Math.random() - 0.5) * 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: (Math.random() - 0.5) * 45,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Initialize twinkling sparkles
    const sparkleCount = Math.min(Math.floor(width / 20), 70);
    const sparkles: SparkleParticle[] = [];

    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7,
        maxOpacity: Math.random() * 0.6 + 0.2,
        fadeSpeed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.4 ? 'rgba(255, 255, 255, ' : 'rgba(254, 205, 211, ',
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.opacity += s.fadeSpeed;
        if (s.opacity > s.maxOpacity || s.opacity < 0.05) {
          s.fadeSpeed = -s.fadeSpeed;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${Math.max(0, s.opacity)})`;
        ctx.fill();
      }

      // Render hearts
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];

        h.y -= h.speedY;
        h.swing += h.swingSpeed;
        h.x += Math.sin(h.swing) * 0.5 + h.speedX;
        h.rotation += h.rotationSpeed;

        // Reset if off top or sides
        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x < -30) h.x = width + 20;
        if (h.x > width + 30) h.x = -20;

        drawHeart(ctx, h.x, h.y, h.size, h.color, h.opacity, h.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Rich multi-stop radial & linear romantic background gradient */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(244, 63, 94, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.18) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(30, 10, 45, 0.8) 0%, transparent 100%),
            linear-gradient(135deg, #09030e 0%, #170822 40%, #1f0b27 70%, #0d0413 100%)
          `
        }}
      />
      
      {/* Subtle animated glowing ambient orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-pink-600/10 blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Floating Canvas for Hearts & Sparkles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10"
      />
    </>
  );
};
