import React, { useEffect, useRef } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Performance: Don't scale for high-DPI (Retina) screens on low-end devices.
    // Instead of scaling canvas based on devicePixelRatio, we stick to 1:1 CSS pixels
    // which drastically improves framerate on mobile and integrated GPUs.
    canvas.width = width;
    canvas.height = height;

    let particles = [];

    let mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    let resizeTimeout;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          init();
        }, 200); // Debounce resize
      },
      { passive: true },
    );

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Boundary check
        if (this.x > width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > height || this.y < 0) this.directionY = -this.directionY;

        // Fast bounding box check before expensive Math.sqrt
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;

          // Fast absolute check
          if (Math.abs(dx) < mouse.radius && Math.abs(dy) < mouse.radius) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
              let forceDirectionX = dx / distance;
              let forceDirectionY = dy / distance;
              let force = (mouse.radius - distance) / mouse.radius;
              let directionX = forceDirectionX * force * this.density;
              let directionY = forceDirectionY * force * this.density;
              this.x -= directionX;
              this.y -= directionY;
            }
          }
        }

        // Return to normal
        if (this.x !== this.baseX) {
          this.x -= (this.x - this.baseX) / 20;
        }
        if (this.y !== this.baseY) {
          this.y -= (this.y - this.baseY) / 20;
        }

        this.baseX += this.directionX;
        this.baseY += this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    function init() {
      particles = [];
      // Optimization: Cap particles to a max of 60.
      let calcParticles = Math.floor((width * height) / 12000);
      let numberOfParticles = Math.min(calcParticles, 60);

      const colors = [
        "rgba(16, 185, 129, 0.8)",
        "rgba(52, 211, 153, 0.8)",
        "rgba(251, 191, 36, 0.7)",
      ];

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 1.5 + 0.5;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
      // Fast spatial limit
      const maxDistance = 12000;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          // Fast bounding box check
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          if (Math.abs(dx) > 110 || Math.abs(dy) > 110) continue;

          let distanceSquare = dx * dx + dy * dy;
          if (distanceSquare < maxDistance) {
            let opacity = 1 - distanceSquare / maxDistance;
            ctx.strokeStyle = `rgba(52, 211, 153, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
    />
  );
};

export default ParticleNetwork;
