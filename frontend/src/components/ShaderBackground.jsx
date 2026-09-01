import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   NEXORA — Live WebGL Diagonal Architectural Shader Background
   Real-time GLSL shader: layered diagonal surfaces, flowing light
   streaks, edge illumination, mouse parallax, scroll velocity
   ───────────────────────────────────────────────────────────── */

const VERT = /* glsl */`
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */`
precision highp float;

varying vec2 v_uv;
uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;        // normalised [0,1]
uniform float u_scroll;       // scroll velocity energy [0,1]
uniform float u_mobile;       // 1.0 mobile, 0.0 desktop

// ── Hash & Noise ─────────────────────────────────────────────
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.1 + shift;
    a *= 0.5;
  }
  return v;
}

// ── Diagonal Surface Layer ───────────────────────────────────
// Generates layered stepped diagonal planes with illuminated edges
void evaluateDiagonalLayer(
  vec2 uv,
  float angle,
  float freq,
  float speed,
  float t,
  vec3 baseCol,
  vec3 edgeCol,
  float edgePower,
  float distortion,
  inout vec3 outColor,
  inout float outLuminance
) {
  vec2 dir = vec2(cos(angle), sin(angle));
  vec2 perp = vec2(-dir.y, dir.x);

  // Projected coordinate along the diagonal axis
  float proj = dot(uv, dir) * freq + t * speed + distortion;
  float perpProj = dot(uv, perp);

  // Stepped plane calculation
  float cell = floor(proj);
  float fractPart = fract(proj);

  // Plane surface shading (gives 3D relief / architectural facet look)
  float surfaceShade = 0.25 + 0.75 * smoothstep(0.0, 0.85, fractPart);
  
  // Sharp edge detection along the stepped boundaries
  float edgeDist = min(fractPart, 1.0 - fractPart);
  float edgeGlow = pow(1.0 - edgeDist * 2.0, edgePower);

  // Traveling light streak along the edge
  float travelStreak = sin(perpProj * 2.5 + t * (speed * 1.8) + cell * 1.7) * 0.5 + 0.5;
  travelStreak = pow(travelStreak, 4.0);

  // Composite layer color
  vec3 layerCol = baseCol * surfaceShade * 0.4;
  layerCol += edgeCol * edgeGlow * (0.6 + 1.8 * travelStreak);

  outColor += layerCol;
  outLuminance += (surfaceShade * 0.2 + edgeGlow * (0.5 + travelStreak));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Aspect-corrected centered coordinates
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Time & speeds
  float t = u_time * 0.35;
  float tSlow = u_time * 0.12;

  // Mouse interaction — smooth perspective shift
  vec2 m = (u_mouse - 0.5) * (1.0 - u_mobile * 0.7);
  st += m * 0.08;

  // Scroll velocity energy boost
  float scrollBoost = u_scroll * 0.7;

  // Organic wave distortion
  float n1 = fbm(st * 1.6 + vec2(tSlow * 0.4, -tSlow * 0.2));
  float n2 = fbm(st * 2.2 + vec2(-tSlow * 0.3, tSlow * 0.5));
  float distortion = (n1 - 0.5) * 0.35 + (n2 - 0.5) * 0.2 + scrollBoost * 0.15;

  // Base background: deep cinematic space
  vec3 color = vec3(0.02, 0.03, 0.08);
  float totalLuma = 0.0;

  // Primary diagonal angle (~38 degrees)
  float angle1 = radians(38.0);
  float angle2 = radians(42.0);
  float angle3 = radians(34.0);

  // ── Layer 1: Deep Electric Blue Structural Planes (Broad, base depth) ──
  evaluateDiagonalLayer(
    st,
    angle1,
    3.2,              // Frequency
    0.45,             // Speed
    t,
    vec3(0.04, 0.12, 0.35), // Base Electric Blue
    vec3(0.15, 0.45, 0.95), // Edge Cyan-Blue
    8.0,              // Edge sharpness
    distortion * 0.8,
    color,
    totalLuma
  );

  // ── Layer 2: Glowing Cyan High-Frequency Diagonal Ribbons ──
  evaluateDiagonalLayer(
    st + vec2(0.05, -0.03),
    angle2,
    5.8,              // Frequency
    0.70,             // Speed
    t,
    vec3(0.02, 0.18, 0.28), // Base Teal-Cyan
    vec3(0.00, 0.85, 1.00), // Brilliant Cyan Edge
    14.0,             // Crisp edge
    distortion * 1.2,
    color,
    totalLuma
  );

  // ── Layer 3: Violet & Magenta Accents (Cinematic Tech Energy) ──
  evaluateDiagonalLayer(
    st - vec2(0.04, 0.06),
    angle3,
    7.5,              // Frequency
    0.95,             // Speed
    t,
    vec3(0.12, 0.04, 0.22), // Base Violet
    vec3(0.75, 0.20, 0.95), // Glowing Magenta-Violet Edge
    18.0,             // Sharp edge
    distortion * 1.5,
    color,
    totalLuma
  );

  // ── Layer 4: Occasional High-Speed White-Hot Light Streaks ──
  float sweepProj = dot(st, vec2(cos(angle1), sin(angle1))) * 12.0 + t * 1.8 + distortion * 2.0;
  float sweepPerp = dot(st, vec2(-sin(angle1), cos(angle1)));
  float streak = pow(sin(sweepProj) * 0.5 + 0.5, 32.0);
  float streakGlow = pow(sin(sweepPerp * 3.0 + t * 2.4) * 0.5 + 0.5, 6.0);
  vec3 whiteStreak = vec3(0.85, 0.95, 1.0) * streak * streakGlow * 1.4;
  color += whiteStreak;

  // ── Ambient Glow Field ──
  float ambientWave = sin(st.x * 2.0 + st.y * 3.0 + t) * 0.5 + 0.5;
  vec3 ambientGlow = mix(
    vec3(0.04, 0.08, 0.22), // Deep blue
    vec3(0.14, 0.04, 0.25), // Deep violet
    ambientWave
  ) * 0.35;
  color += ambientGlow;

  // ── Scroll Reactivity Luminance Boost ──
  color += (color * scrollBoost * 0.6);

  // ── Center Vignette (Ensures 100% Foreground Readability) ──
  // Keeps the center comfortably dark while preserving dynamic motion
  float centerDist = length(st * vec2(0.9, 1.2));
  float centerVignette = smoothstep(0.1, 0.95, centerDist);
  color = mix(color * 0.55, color, centerVignette);

  // Tone mapping and soft contrast clamp
  color = color / (color + vec3(0.35));
  color = pow(color, vec3(0.95));

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[NEXORA Shader Compile Error]:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertSrc, fragSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[NEXORA Shader Link Error]:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    scrollEnergy: 0,
    targetScrollEnergy: 0,
    lastScrollY: 0,
    rafId: null,
    startTime: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL Context
    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('[NEXORA WebGL] WebGL not supported on this browser.');
      return;
    }

    const program = createProgram(gl, VERT, FRAG);
    if (!program) return;

    // Full-screen Quad buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');
    const uMobile = gl.getUniformLocation(program, 'u_mobile');

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const isMobileDevice = window.innerWidth < 768;
    const DPR = Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.0 : 1.5);

    const handleResize = () => {
      const w = Math.floor(window.innerWidth * DPR);
      const h = Math.floor(window.innerHeight * DPR);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.useProgram(program);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uMobile, window.innerWidth < 768 ? 1.0 : 0.0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const state = stateRef.current;
    state.startTime = performance.now();
    state.lastScrollY = window.scrollY;

    // Mouse tracker
    const handleMouseMove = (e) => {
      state.targetMouse.x = e.clientX / window.innerWidth;
      state.targetMouse.y = e.clientY / window.innerHeight;
    };

    // Scroll energy tracker
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - state.lastScrollY);
      state.lastScrollY = currentScrollY;
      const velocity = Math.min(delta / 60.0, 1.0);
      state.targetScrollEnergy = Math.min(state.targetScrollEnergy + velocity * 0.5, 1.0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Continuous Animation Render Loop ──
    const render = (now) => {
      if (!canvas || !canvas.isConnected) return;

      const elapsed = (now - state.startTime) * 0.001;

      // Smooth mouse interpolation
      state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.05;
      state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.05;

      // Smooth scroll decay
      state.scrollEnergy += (state.targetScrollEnergy - state.scrollEnergy) * 0.06;
      state.targetScrollEnergy *= 0.92;

      gl.useProgram(program);
      gl.uniform1f(uTime, prefersReducedMotion ? 0.0 : elapsed);
      gl.uniform2f(uMouse, state.mouse.x, 1.0 - state.mouse.y);
      gl.uniform1f(uScroll, prefersReducedMotion ? 0.0 : state.scrollEnergy);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      state.rafId = requestAnimationFrame(render);
    };

    state.rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      gl.deleteProgram(program);
      gl.deleteBuffer(quadBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
        background: '#050816',
      }}
    />
  );
}
