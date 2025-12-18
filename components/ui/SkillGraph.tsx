import React, { useEffect, useRef, useState } from "react";
import { resumeData } from "../../data/resume";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
  type: "root" | "category" | "skill";
}

interface Link {
  source: string;
  target: string;
  baseLength: number; // Renamed to baseLength to imply dynamic scaling
}

export const SkillGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  
  // Interaction State
  const draggingNode = useRef<Node | null>(null);
  const hoverNode = useRef<Node | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Logic Dimensions (CSS Pixels) for Physics
  const dimensions = useRef({ width: 0, height: 0 });

  // Initialize Data
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    dimensions.current = { width, height };

    const cx = width / 2;
    const cy = height / 2;
    const isMobile = width < 768;

    const newNodes: Node[] = [];
    const newLinks: Link[] = [];

    // 1. Root Node
    newNodes.push({
      id: "root",
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: isMobile ? 25 : 30,
      color: "#f1f5f9",
      label: "Nayan",
      type: "root",
    });

    // 2. Category Nodes
    resumeData.skills.forEach((category, i) => {
      const angle = (i / resumeData.skills.length) * 2 * Math.PI;
      // Initial spread - increased for better start
      const dist = isMobile ? 100 : 150;
      
      newNodes.push({
        id: category.title,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: isMobile ? 18 : 22,
        color: i === 0 ? "#38bdf8" : i === 1 ? "#10b981" : "#a855f7",
        label: category.title,
        type: "category",
      });

      newLinks.push({ source: "root", target: category.title, baseLength: 130 });

      // 3. Skill Nodes
      category.skills.forEach((skill, j) => {
        const subAngle = angle + (j / category.skills.length - 0.5) * 2; 
        const subDist = isMobile ? 50 : 80;

        newNodes.push({
          id: skill,
          x: cx + Math.cos(angle) * dist + Math.cos(subAngle) * subDist,
          y: cy + Math.sin(angle) * dist + Math.sin(subAngle) * subDist,
          vx: 0,
          vy: 0,
          radius: isMobile ? 6 : 8,
          color: "#94a3b8", 
          label: skill,
          type: "skill",
        });

        newLinks.push({ source: category.title, target: skill, baseLength: 80 });
      });
    });

    setNodes(newNodes);
    setLinks(newLinks);
  }, []);

  // Handle Resize (Updates Canvas Resolution & Physics Boundaries)
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Update logical dimensions for physics
        dimensions.current = { width: rect.width, height: rect.height };

        // Update physical dimensions for rendering
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
        
        // Style must match logical dimensions
        canvasRef.current.style.width = `${rect.width}px`;
        canvasRef.current.style.height = `${rect.height}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.scale(dpr, dpr);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Physics & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      // Use Logical Dimensions
      const { width, height } = dimensions.current;
      const isMobile = width < 640;
      
      // Dynamic Physics Config - Tuned for stability and separation
      const repulsionStrength = isMobile ? 2200 : 3500; // Stronger repulsion
      const springLengthScale = isMobile ? 0.6 : 1.0; // Slightly larger scale for mobile
      const centerPull = isMobile ? 0.008 : 0.005; // Gentle center pull
      const friction = 0.85; // Higher damping (lower value) for stability
      const springStiffness = 0.03; // Looser springs to allow repulsion to work

      // --- Physics Step ---
      
      // 1. Repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy || 1;
          
          // Optimization: Ignore far away nodes
          if (distSq > 50000 && !isMobile) continue; 

          const force = repulsionStrength / distSq;

          const fx = (dx / Math.sqrt(distSq)) * force;
          const fy = (dy / Math.sqrt(distSq)) * force;

          if (a !== draggingNode.current) { a.vx -= fx; a.vy -= fy; }
          if (b !== draggingNode.current) { b.vx += fx; b.vy += fy; }
        }
      }

      // 2. Attraction (Springs)
      links.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source);
        const target = nodes.find((n) => n.id === link.target);
        if (!source || !target) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        // Scale target length based on device size
        const targetLen = link.baseLength * springLengthScale;
        const force = (dist - targetLen) * springStiffness;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (source !== draggingNode.current) { source.vx += fx; source.vy += fy; }
        if (target !== draggingNode.current) { target.vx -= fx; target.vy -= fy; }
      });

      // 3. Center Gravity
      const cx = width / 2;
      const cy = height / 2;
      nodes.forEach((node) => {
        const dx = cx - node.x;
        const dy = cy - node.y;
        if (node !== draggingNode.current) {
          node.vx += dx * centerPull;
          node.vy += dy * centerPull;
        }
      });

      // 4. Update & Boundaries
      nodes.forEach((node) => {
        if (node === draggingNode.current) {
            node.vx = (mousePos.current.x - node.x) * 0.3;
            node.vy = (mousePos.current.y - node.y) * 0.3;
        }

        node.x += node.vx;
        node.y += node.vy;
        
        node.vx *= friction;
        node.vy *= friction;

        const padding = node.radius + 5;
        if (node.x < padding) { node.x = padding; node.vx *= -0.5; }
        if (node.x > width - padding) { node.x = width - padding; node.vx *= -0.5; }
        if (node.y < padding) { node.y = padding; node.vy *= -0.5; }
        if (node.y > height - padding) { node.y = height - padding; node.vy *= -0.5; }
      });

      // --- Render Step ---
      // Clear using logical dimensions (since we scaled context)
      ctx.clearRect(0, 0, width, height);

      // Draw Links
      ctx.lineWidth = isMobile ? 0.5 : 1;
      links.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source);
        const target = nodes.find((n) => n.id === link.target);
        if (!source || !target) return;

        const isConnected = hoverNode.current && 
           (hoverNode.current.id === source.id || hoverNode.current.id === target.id);
        
        ctx.strokeStyle = isConnected ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const isHovered = hoverNode.current?.id === node.id;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.radius * 1.3 : node.radius, 0, Math.PI * 2);
        
        if (node.type === "root") {
             ctx.fillStyle = node.color;
             ctx.shadowBlur = 20;
             ctx.shadowColor = node.color;
        } else if (node.type === "category") {
             ctx.fillStyle = node.color; 
             ctx.shadowBlur = isHovered ? 15 : 0;
             ctx.shadowColor = node.color;
        } else {
             ctx.fillStyle = isHovered ? "#f1f5f9" : node.color;
             ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Labels
        const isNeighbor = hoverNode.current?.type === "category" && 
                           links.some(l => l.source === hoverNode.current?.id && l.target === node.id);

        const shouldShowLabel = 
            node.type !== "skill" || 
            isHovered ||             
            isNeighbor ||
            !isMobile; // On desktop, show all labels? Or keeps it clean? Let's keep logic: Root/Category always, Skill on interaction.
                       // Actually, let's show all on Desktop if not cluttered, but let's stick to strict cleanliness.
                       // Reverting to: Root/Category always. Skill only on hover/neighbor.

        const forceShow = node.type === "root" || node.type === "category";

        if (forceShow || shouldShowLabel) {
            const isRoot = node.type === "root";
            const isCategory = node.type === "category";
            
            const fontSize = isRoot ? (isMobile ? 12 : 14) : isCategory ? (isMobile ? 10 : 12) : 10;
            ctx.font = `${isRoot ? "700" : "500"} ${fontSize}px ${node.type === "skill" ? "JetBrains Mono" : "Inter"}`;
            
            const text = node.label;
            const metrics = ctx.measureText(text);
            const textWidth = metrics.width;
            const textHeight = fontSize + 4;
            const paddingX = 6;
            const paddingY = 3;

            let textY = node.y;
            if (!isRoot) {
                textY = node.y + node.radius + (isMobile ? 10 : 14);
            }

            // Draw Background Pill
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            
            const boxX = node.x - textWidth / 2 - paddingX;
            const boxY = textY - textHeight / 2 - paddingY;
            const boxW = textWidth + paddingX * 2;
            const boxH = textHeight + paddingY * 2;
            const radius = 4;

            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(boxX, boxY, boxW, boxH, radius);
            } else {
                ctx.rect(boxX, boxY, boxW, boxH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, node.x, textY);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, links]);

  // Event Handlers
  const getMousePos = (e: React.MouseEvent) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      // Mouse event is already in logical pixels usually
      return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
      };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    const clicked = nodes.find(node => {
        const dist = Math.hypot(node.x - x, node.y - y);
        return dist < node.radius + 10; // Wider hit area
    });

    if (clicked) {
        draggingNode.current = clicked;
        mousePos.current = { x, y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    mousePos.current = { x, y };

    const hovered = nodes.find(node => {
        const dist = Math.hypot(node.x - x, node.y - y);
        return dist < node.radius + 5;
    });
    
    hoverNode.current = hovered || null;
    if (draggingNode.current) e.preventDefault();
  };

  const handleMouseUp = () => { draggingNode.current = null; };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] bg-background/50 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-sm cursor-grab active:cursor-grabbing">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="block relative z-10 w-full h-full"
        />
        <div className="absolute bottom-4 right-6 pointer-events-none text-right">
             <p className="text-[10px] text-muted font-mono uppercase tracking-widest">Interactive Graph</p>
             <p className="text-[10px] text-muted/50">Drag nodes to explore</p>
        </div>
    </div>
  );
};
