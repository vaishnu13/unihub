'use client';

import React, { useRef, useEffect } from 'react';

export const ParticleTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles: Particle[] = [];
    const properties = {
      particleColor: `rgba(138, 43, 226, 0.7)`,
      particleRadius: 3,
      particleCount: 60,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6,
    };

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      life: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
        this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      reDraw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fillStyle = properties.particleColor;
        ctx!.fill();
      }

      reCalculateLife() {
        if (this.life < 1) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.life = Math.random() * properties.particleLife * 60;
        }
        this.life--;
      }
    }

    function reDrawBackground() {
      ctx!.fillStyle = 'hsl(var(--background))';
      ctx!.fillRect(0, 0, width, height);
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2- y1, 2));

                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx!.lineWidth = 0.5;
                    ctx!.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
                    ctx!.beginPath();
                    ctx!.moveTo(x1, y1);
                    ctx!.lineTo(x2, y2);
                    ctx!.closePath();
                    ctx!.stroke();
                }
            }
        }
    }

    function reDrawParticles() {
      for (let i in particles) {
        particles[i].reCalculateLife();
        particles[i].position();
        particles[i].reDraw();
      }
    }

    function loop() {
      reDrawBackground();
      reDrawParticles();
      drawLines();
      animationFrameId.current = requestAnimationFrame(loop);
    }

    function init() {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    init();

    return () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};
