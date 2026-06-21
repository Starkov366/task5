export function generateCover(title: string, artist: string, seed: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
  
    const ctx = canvas.getContext("2d")!;
  
   
    const hue = seed * 360;
  
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, `hsl(${hue}, 70%, 40%)`);
    gradient.addColorStop(1, `hsl(${hue + 40}, 70%, 20%)`);
  
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
  
  
    for (let i = 0; i < 10; i++) {
      ctx.strokeStyle = `rgba(255,255,255,0.05)`;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * 400);
      ctx.lineTo(400, Math.random() * 400);
      ctx.stroke();
    }
  
  
    ctx.fillStyle = "white";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(title.slice(0, 18), 20, 300);
  

    ctx.font = "16px sans-serif";
    ctx.fillText(artist, 20, 340);
  
    return canvas.toDataURL("image/png");
  }