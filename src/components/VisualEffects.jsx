// VisualEffects.jsx
// Global visual effects wrapper component for the entire application
// Implements: Aurora Shader Background, ClickSpark, TiltedCard, SpotlightCard
// Auto-wraps all elements with class "card" with TiltedCard + SpotlightCard

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Renderer, Camera, Program, Mesh, Plane } from 'ogl';

// ============================================
// AuroraShader Component (Full-Page Background)
// ============================================
const AuroraShader = ({ 
  colorStops = ["#8c7ff0", "#B19EEF", "#5227FF"], 
  blend = 0.75, 
  amplitude = 1.0, 
  speed = 1.6 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Initialize renderer
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    // Create canvas and append
    const canvas = gl.canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    // Camera
    const camera = new Camera(gl, { fov: 35 });
    camera.position.z = 5;

    // Resize handler
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    resize();
    window.addEventListener('resize', resize);

    // Aurora Shader
    const vertex = /* glsl */ `
      attribute vec3 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uBlend;
      uniform float uAmplitude;
      uniform float uSpeed;
      varying vec2 vUv;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uTime * uSpeed * 0.1;
        
        float n1 = snoise(vec2(uv.x * 2.0 + aspect, uv.y * 0.5)) * uAmplitude;
        float n2 = snoise(vec2(uv.x * 3.0 - aspect * 0.7, uv.y * 0.8 + 0.5)) * uAmplitude * 0.5;
        float n3 = snoise(vec2(uv.x * 1.5 + aspect * 0.5, uv.y * 0.3)) * uAmplitude * 0.3;
        
        float combined = (n1 + n2 + n3) * 0.5 + 0.5;
        
        float band1 = smoothstep(0.0, 0.5, combined);
        float band2 = smoothstep(0.3, 0.7, combined);
        float band3 = smoothstep(0.5, 1.0, combined);
        
        vec3 color = mix(uColor1, uColor2, band1);
        color = mix(color, uColor3, band2 * uBlend);
        
        color += vec3(snoise(uv * 5.0 + uTime * 0.2) * 0.05);
        
        float verticalFade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.6, uv.y);
        float horizontalFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
        
        float alpha = verticalFade * horizontalFade * combined * 0.8;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [1, 1, 1];
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new Float32Array(hexToRgb(colorStops[0] || '#8c7ff0')) },
        uColor2: { value: new Float32Array(hexToRgb(colorStops[1] || '#B19EEF')) },
        uColor3: { value: new Float32Array(hexToRgb(colorStops[2] || '#5227FF')) },
        uBlend: { value: blend },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed }
      }
    });

    const geometry = new Plane(gl, { width: 2, height: 2 });
    const mesh = new Mesh(gl, { geometry, program });

    const update = (t) => {
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh, camera });
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none'
      }}
    />
  );
};

// ============================================
// ClickSpark Effect
// ============================================
const ClickSpark = ({ 
  sparkColor = '#fff', 
  sparkSize = 10, 
  sparkRadius = 50, 
  sparkCount = 11, 
  duration = 1000, 
  easing = 'ease-out', 
  extraScale = 1.0 
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const easeFunc = useCallback(t => {
    switch (easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = timestamp => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  useEffect(() => {
    const handleClick = e => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x, y, angle: (2 * Math.PI * i) / sparkCount, startTime: now
      }));
      sparksRef.current.push(...newSparks);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [sparkCount]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-50" />;
};

// ============================================
// TiltedCard Effect
// ============================================
export const TiltedCard = ({ children, rotateAmplitude = 14, scaleOnHover = 1.1 }) => {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100, mass: 2 });
  const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });

  const handleMouse = useCallback(e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    scale.set(scaleOnHover);
  }, [rotateAmplitude, scaleOnHover, rotateX, rotateY, scale]);

  const handleMouseLeave = useCallback(() => { 
    rotateX.set(0); 
    rotateY.set(0); 
    scale.set(1); 
  }, [rotateX, rotateY, scale]);

  return (
    <motion.div 
      ref={ref} 
      className="relative w-full h-full [perspective:800px]" 
      onMouseMove={handleMouse} 
      onMouseLeave={handleMouseLeave} 
      style={{ rotateX, rotateY, scale }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// SpotlightCard Effect
// ============================================
export const SpotlightCard = ({ children, spotlightColor = 'rgba(0,229,255,0.2)' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(e => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);
  
  const handleMouseEnter = useCallback(() => setOpacity(0.6), []);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className="relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-4"
    >
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out" 
        style={{ opacity, background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)` }} 
      />
      {children}
    </div>
  );
};

// ============================================
// PortalWrapper - Dynamically wraps all .card elements
// ============================================
const PortalWrapper = ({ children }) => {
  const [cardContents, setCardContents] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    // Get all .card elements and convert their HTML to React elements
    const nodes = wrapperRef.current.querySelectorAll('.card');
    const contents = Array.from(nodes).map((node, index) => {
      // Get the innerHTML and create a key for React
      const html = node.innerHTML;
      const className = node.className;
      return { html, className, key: `card-${index}` };
    });
    setCardContents(contents);
  }, [children]);

  return (
    <div ref={wrapperRef} className="relative w-full h-full">
      {children}
      {cardContents.map((content, index) =>
        createPortal(
          <SpotlightCard key={content.key}>
            <TiltedCard>
              <div 
                className={content.className} 
                dangerouslySetInnerHTML={{ __html: content.html }} 
              />
            </TiltedCard>
          </SpotlightCard>,
          document.body
        )
      )}
    </div>
  );
};

// ============================================
// Main VisualEffects wrapper
// ============================================
export default function VisualEffects({ children }) {
  return (
    <div className="relative w-full h-full">
      {/* Dark Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-neutral-950" />

      {/* Global ClickSpark */}
      <ClickSpark />

      {/* Wrap all children */}
      <PortalWrapper>{children}</PortalWrapper>
    </div>
  );
}

