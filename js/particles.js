function setupParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  document.querySelector("header").appendChild(canvas);
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getRainbowColor(opacity = 0.3) {
    // Generate a random hue value (0-360)
    const hue = Math.floor(Math.random() * 360);
    // Keep saturation high for vibrant colors but lightness high for subtlety
    const saturation = 80 + Math.random() * 20; // 80-100%
    const lightness = 60 + Math.random() * 20; // 60-80%
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
  }

  function createParticles() {
    particles = [];
    const particleCount = Math.floor(window.innerWidth / 20);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: getRainbowColor(0.3), // Use subtle rainbow colors
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  resizeCanvas();
  createParticles();
  drawParticles();
}

export { setupParticles };
