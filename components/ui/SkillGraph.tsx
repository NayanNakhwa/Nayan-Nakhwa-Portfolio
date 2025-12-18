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
  length: number;
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

  // Initialize Data
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;

    const newNodes: Node[] = [];
    const newLinks: Link[] = [];

    // 1. Root Node
    newNodes.push({
      id: "root",
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 30,
      color: "#f1f5f9", // text-slate-100
      label: "Nayan",
      type: "root",
    });

    // 2. Category Nodes
    resumeData.skills.forEach((category, i) => {
      const angle = (i / resumeData.skills.length) * 2 * Math.PI;
      const dist = 100;
      
      newNodes.push({
        id: category.title,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: 20,
        color: i === 0 ? "#38bdf8" : i === 1 ? "#10b981" : "#a855f7", // Primary, Secondary, Purple
        label: category.title,
        type: "category",
      });

      newLinks.push({ source: "root", target: category.title, length: 120 });

      // 3. Skill Nodes
      category.skills.forEach((skill, j) => {
        // Spread skills out around their category
        const subAngle = angle + (j / category.skills.length - 0.5) * 2; 
        const subDist = 60;

        newNodes.push({
          id: skill,
          x: cx + Math.cos(angle) * dist + Math.cos(subAngle) * subDist,
          y: cy + Math.sin(angle) * dist + Math.sin(subAngle) * subDist,
          vx: 0,
          vy: 0,
          radius: 8,
          color: "#94a3b8", // muted
          label: skill,
          type: "skill",
        });

        newLinks.push({ source: category.title, target: skill, length: 70 });
      });
    });

    setNodes(newNodes);
    setLinks(newLinks);
  }, []);

  // Physics & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      // --- Physics Step ---
      
      // 1. Repulsion (Nodes push away)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy || 1;
          const force = 3000 / distSq; // Repulsion strength

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
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = (dist - link.length) * 0.05; // Spring stiffness

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (source !== draggingNode.current) { source.vx += fx; source.vy += fy; }
        if (target !== draggingNode.current) { target.vx -= fx; target.vy -= fy; }
      });

      // 3. Center Gravity (Keep in view)
      const cx = width / 2;
      const cy = height / 2;
      nodes.forEach((node) => {
        const dx = cx - node.x;
        const dy = cy - node.y;
        if (node !== draggingNode.current) {
          node.vx += dx * 0.005; // Center pull
          node.vy += dy * 0.005;
        }
      });

      // 4. Update Positions & Damping
      nodes.forEach((node) => {
        if (node === draggingNode.current) {
            // Smoothly move towards mouse
            node.vx = (mousePos.current.x - node.x) * 0.2;
            node.vy = (mousePos.current.y - node.y) * 0.2;
        }

        node.x += node.vx;
        node.y += node.vy;
        
        // Friction
        node.vx *= 0.92;
        node.vy *= 0.92;

        // Boundaries
        const padding = node.radius + 10;
        if (node.x < padding) node.x = padding;
        if (node.x > width - padding) node.x = width - padding;
        if (node.y < padding) node.y = padding;
        if (node.y > height - padding) node.y = height - padding;
      });

      // --- Render Step ---
      ctx.clearRect(0, 0, width, height);

      // Draw Links
      ctx.lineWidth = 1;
      links.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source);
        const target = nodes.find((n) => n.id === link.target);
        if (!source || !target) return;

        // Highlight logic
        const isConnected = hoverNode.current && 
           (hoverNode.current.id === source.id || hoverNode.current.id === target.id);
        const isHovered = hoverNode.current && 
           (hoverNode.current.id === source.id && hoverNode.current.id === target.id);

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
        
        // Fill
        if (node.type === "root") {
             ctx.fillStyle = node.color;
             ctx.shadowBlur = 20;
             ctx.shadowColor = node.color;
        } else if (node.type === "category") {
             ctx.fillStyle = node.color; 
             ctx.shadowBlur = isHovered ? 15 : 0;
             ctx.shadowColor = node.color;
        } else {
             // Skills
             ctx.fillStyle = isHovered ? "#f1f5f9" : node.color;
             ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Labels
        // Improved visibility: Show labels with background pill and high contrast
        const isNeighbor = hoverNode.current?.type === "category" && 
                           links.some(l => l.source === hoverNode.current?.id && l.target === node.id);

        const shouldShowLabel = 
            node.type !== "skill" || // Always show Root and Category
            isHovered ||             // Show if hovered
            isNeighbor;              // Show if parent category is hovered

        if (shouldShowLabel) {
            const isRoot = node.type === "root";
            const isCategory = node.type === "category";
            
            // Font Config
            const fontSize = isRoot ? 14 : isCategory ? 12 : 11;
            ctx.font = `${isRoot ? "700" : "500"} ${fontSize}px ${node.type === "skill" ? "JetBrains Mono" : "Inter"}`;
            
            const text = node.label;
            const metrics = ctx.measureText(text);
            const textWidth = metrics.width;
            const textHeight = fontSize + 4;
            const paddingX = 8;
            const paddingY = 4;

            // Position: Root centered, others offset below
            let textY = node.y;
            if (!isRoot) {
                textY = node.y + node.radius + 14;
            }

            // Draw Background Pill for contrast
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)"; // Surface dark with high opacity
            ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
            ctx.lineWidth = 1;
            
            const boxX = node.x - textWidth / 2 - paddingX;
            const boxY = textY - textHeight / 2 - paddingY;
            const boxW = textWidth + paddingX * 2;
            const boxH = textHeight + paddingY * 2;
            const radius = 6;

            ctx.beginPath();
            // Draw rounded rect manually or via API
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(boxX, boxY, boxW, boxH, radius);
            } else {
                ctx.rect(boxX, boxY, boxW, boxH);
            }
            ctx.fill();
            ctx.stroke();

            // Draw Text
            ctx.fillStyle = "#ffffff"; // Pure white text
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

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.scale(dpr, dpr);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Event Handlers
  const getMousePos = (e: React.MouseEvent) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
      };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    // Find clicked node
    const clicked = nodes.find(node => {
        const dist = Math.hypot(node.x - x, node.y - y);
        return dist < node.radius + 5;
    });

    if (clicked) {
        draggingNode.current = clicked;
        mousePos.current = { x, y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    mousePos.current = { x, y };

    // Hover detection
    const hovered = nodes.find(node => {
        const dist = Math.hypot(node.x - x, node.y - y);
        return dist < node.radius + 5;
    });
    
    hoverNode.current = hovered || null;
    
    if (draggingNode.current) {
        // Prevent default selection while dragging
        e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    draggingNode.current = null;
  };

  return (
    <div ref={containerRef} className="w-full h-[600px] bg-background/50 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-sm cursor-grab active:cursor-grabbing">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="block relative z-10"
        />
        
        <div className="absolute bottom-4 right-6 pointer-events-none text-right">
             <p className="text-[10px] text-muted font-mono uppercase tracking-widest">Interactive Graph</p>
             <p className="text-[10px] text-muted/50">Drag nodes to explore</p>
        </div>
    </div>
  );
};
