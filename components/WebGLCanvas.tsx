'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Vertex Shader ─────────────────────────────────────────────────────────────
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// ── Fragment Shader ───────────────────────────────────────────────────────────
const frag = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;    // 0–1 full-page progress
  uniform float uLight;     // 0=dark, 1=light
  uniform vec2  uMouse;     // normalized 0–1
  uniform float uMouseVel;  // 0–1 speed
  uniform vec3  uClick0;    // xy=pos, z=timestamp  (-1 = inactive)
  uniform vec3  uClick1;
  uniform vec3  uClick2;

  varying vec2 vUv;

  // Smooth quintic blob
  float blob(vec2 uv, vec2 c, float r) {
    float d = length(uv - c) / r;
    float t = clamp(1.0 - d, 0.0, 1.0);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  // Ink bloom — expanding soft glow from click point
  // Returns 0–1 intensity; call with vUv (no prior warp)
  float inkBloom(vec2 uv, vec3 click) {
    if (click.z < 0.0) return 0.0;
    float age = uTime - click.z;
    if (age > 3.0 || age < 0.0) return 0.0;
    float d    = length(uv - click.xy);
    float r    = 0.48 * (1.0 - exp(-age * 2.4));  // expands 0 → 0.48
    float glow = exp(-pow(d / max(r + 0.015, 0.02), 2.0) * 1.6);
    float env  = exp(-age * 1.3) * min(1.0, age * 10.0);
    return glow * env;
  }

  void main() {
    vec2 uv  = vUv;
    float t  = uTime * 0.058;
    float s  = clamp(uScroll, 0.0, 1.0);
    float sd = uScroll * 0.10;

    // ── Mouse lens warp ──────────────────────────────────────────
    vec2  dm    = uv - uMouse;
    float mdist = length(dm);
    float mwarp = uMouseVel * 0.020 * exp(-mdist * 5.5);
    if (mdist > 0.001) uv += normalize(dm) * mwarp;

    // ── Blobs ────────────────────────────────────────────────────
    vec2 p1 = vec2(0.13 + sin(t*0.70)*0.11,  0.64 + cos(t*0.50)*0.09 - sd*0.25);
    vec2 p2 = vec2(0.87 + cos(t*0.55)*0.09,  0.36 + sin(t*0.62)*0.10 - sd*0.45);
    vec2 p3 = vec2(0.50 + sin(t*0.82)*0.13,  0.76 + cos(t*0.44)*0.08 - sd*0.18);
    vec2 p4 = vec2(0.40 + cos(t*0.60)*0.14,  0.22 + sin(t*0.72)*0.10 - sd*0.38);
    vec2 p5 = vec2(0.75 + sin(t*0.48)*0.12,  0.54 + cos(t*0.38)*0.11 - sd*0.28);

    float b1 = blob(uv, p1, 0.72);
    float b2 = blob(uv, p2, 0.64);
    float b3 = blob(uv, p3, 0.78);
    float b4 = blob(uv, p4, 0.58);
    float b5 = blob(uv, p5, 0.68);

    float bA = b1*0.55 + b3*0.35 + b5*0.25;
    float bB = b2*0.60 + b4*0.42;

    // Mouse glow (grows with speed)
    float mGlow = blob(uv, uMouse, 0.22) * uMouseVel * 0.32
                + blob(uv, uMouse, 0.09) * 0.16;

    // ── Chapter transitions ───────────────────────────────────────
    float t01 = smoothstep(0.08, 0.26, s);
    float t12 = smoothstep(0.26, 0.50, s);
    float t23 = smoothstep(0.50, 0.72, s);
    float t34 = smoothstep(0.72, 0.90, s);

    // ════════════════════════ LIGHT MODE ═════════════════════════
    vec3 lb0 = vec3(0.976, 0.970, 0.958);  // Hero:     warm white
    vec3 lb1 = vec3(0.978, 0.963, 0.936);  // About:    amber-warm
    vec3 lb2 = vec3(0.940, 0.950, 0.975);  // Work:     cool steel
    vec3 lb3 = vec3(0.934, 0.945, 0.966);  // Projects: tech blue
    vec3 lb4 = vec3(0.970, 0.964, 0.952);  // Contact:  warm neutral

    vec3 lBase = lb0;
    lBase = mix(lBase, lb1, t01);
    lBase = mix(lBase, lb2, t12);
    lBase = mix(lBase, lb3, t23);
    lBase = mix(lBase, lb4, t34);

    vec3 la0 = vec3(0.82, 0.79, 0.99);   // lavender
    vec3 la1 = vec3(0.99, 0.83, 0.62);   // amber
    vec3 la2 = vec3(0.66, 0.82, 0.99);   // sky blue
    vec3 la3 = vec3(0.65, 0.95, 0.80);   // mint
    vec3 la4 = vec3(0.80, 0.95, 0.85);   // sage

    vec3 lc0 = vec3(0.74, 0.90, 0.99);   // icy blue
    vec3 lc1 = vec3(0.99, 0.76, 0.80);   // rose
    vec3 lc2 = vec3(0.72, 0.68, 0.99);   // indigo
    vec3 lc3 = vec3(0.99, 0.74, 0.85);   // pink
    vec3 lc4 = vec3(0.99, 0.93, 0.78);   // warm cream

    vec3 lcA = la0;
    lcA = mix(lcA, la1, t01);
    lcA = mix(lcA, la2, t12);
    lcA = mix(lcA, la3, t23);
    lcA = mix(lcA, la4, t34);

    vec3 lcB = lc0;
    lcB = mix(lcB, lc1, t01);
    lcB = mix(lcB, lc2, t12);
    lcB = mix(lcB, lc3, t23);
    lcB = mix(lcB, lc4, t34);

    float lIA = mix(0.18, mix(0.24, mix(0.20, mix(0.30, 0.14, t34), t23), t12), t01);
    float lIB = mix(0.13, mix(0.18, mix(0.16, mix(0.26, 0.11, t34), t23), t12), t01);

    vec3 light = lBase;
    light = mix(light, lcA, bA * lIA);
    light = mix(light, lcB, bB * lIB);
    light = mix(light, mix(la0, la1, t01*0.6 + t12*0.3), mGlow * 0.30);

    // ════════════════════════ DARK MODE ══════════════════════════
    vec3 db0 = vec3(0.033, 0.029, 0.052);
    vec3 db1 = vec3(0.042, 0.026, 0.038);
    vec3 db2 = vec3(0.018, 0.026, 0.058);
    vec3 db3 = vec3(0.024, 0.028, 0.050);
    vec3 db4 = vec3(0.028, 0.026, 0.040);

    vec3 dBase = db0;
    dBase = mix(dBase, db1, t01);
    dBase = mix(dBase, db2, t12);
    dBase = mix(dBase, db3, t23);
    dBase = mix(dBase, db4, t34);

    vec3 da0 = vec3(0.10, 0.06, 0.36);
    vec3 da1 = vec3(0.30, 0.07, 0.22);
    vec3 da2 = vec3(0.02, 0.08, 0.46);
    vec3 da3 = vec3(0.02, 0.22, 0.18);
    vec3 da4 = vec3(0.06, 0.16, 0.14);

    vec3 dc0 = vec3(0.02, 0.06, 0.40);
    vec3 dc1 = vec3(0.28, 0.05, 0.14);
    vec3 dc2 = vec3(0.06, 0.04, 0.38);
    vec3 dc3 = vec3(0.28, 0.04, 0.28);
    vec3 dc4 = vec3(0.08, 0.06, 0.20);

    vec3 dcA = da0;
    dcA = mix(dcA, da1, t01);
    dcA = mix(dcA, da2, t12);
    dcA = mix(dcA, da3, t23);
    dcA = mix(dcA, da4, t34);

    vec3 dcB = dc0;
    dcB = mix(dcB, dc1, t01);
    dcB = mix(dcB, dc2, t12);
    dcB = mix(dcB, dc3, t23);
    dcB = mix(dcB, dc4, t34);

    float dIA = mix(0.88, mix(0.84, mix(0.90, mix(0.84, 0.76, t34), t23), t12), t01);
    float dIB = mix(0.76, mix(0.80, mix(0.84, mix(0.76, 0.70, t34), t23), t12), t01);

    vec3 dark = dBase;
    dark = mix(dark, dcA, bA * dIA);
    dark = mix(dark, dcB, bB * dIB);
    dark = mix(dark, mix(da0, da1, t01*0.5) + vec3(0.06, 0.02, 0.10), mGlow * 0.50);
    dark = clamp(dark, 0.0, 1.0);

    // ── Composite ────────────────────────────────────────────────
    vec3 col = mix(dark, light, uLight);

    // ── Ink blooms (computed on original vUv, not warped uv) ──────
    float bloom = clamp(
      inkBloom(vUv, uClick0) +
      inkBloom(vUv, uClick1) +
      inkBloom(vUv, uClick2),
      0.0, 1.0
    );

    // Bloom color = vivid version of current chapter palette
    vec3 bloomColorL = mix(lcA * 1.05, lcB,     0.35);  // warm tinted
    vec3 bloomColorD = mix(dcA + 0.14, dcB + 0.10, 0.4);
    vec3 bloomColor  = mix(bloomColorD, bloomColorL, uLight);

    col = mix(col, bloomColor, bloom * 0.55);
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function WebGLCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geo    = new THREE.PlaneGeometry(2, 2)
    const mat    = new THREE.ShaderMaterial({
      vertexShader:   vert,
      fragmentShader: frag,
      uniforms: {
        uTime:     { value: 0 },
        uScroll:   { value: 0 },
        uLight:    { value: 1 },
        uMouse:    { value: new THREE.Vector2(0.5, 0.5) },
        uMouseVel: { value: 0 },
        uClick0:   { value: new THREE.Vector3(-1, -1, -1) },
        uClick1:   { value: new THREE.Vector3(-1, -1, -1) },
        uClick2:   { value: new THREE.Vector3(-1, -1, -1) },
      },
    })
    scene.add(new THREE.Mesh(geo, mat))

    const clock = new THREE.Clock()

    // ── Scroll ────────────────────────────────────────────────────
    let scrollTarget  = 0
    let scrollCurrent = 0
    const getScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      return total > 0 ? window.scrollY / total : 0
    }
    scrollTarget = getScroll()
    window.addEventListener('scroll', () => { scrollTarget = getScroll() }, { passive: true })

    // ── Theme ─────────────────────────────────────────────────────
    let lightTarget  = 1
    let lightCurrent = 1
    const readTheme = () => {
      lightTarget = document.documentElement.dataset.theme === 'dark' ? 0 : 1
    }
    const themeObserver = new MutationObserver(readTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    readTheme()

    // ── Mouse ─────────────────────────────────────────────────────
    const mouseTarget  = new THREE.Vector2(0.5, 0.5)
    const mouseCurrent = new THREE.Vector2(0.5, 0.5)
    let mouseVelTarget  = 0
    let mouseVelCurrent = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
      mouseVelTarget = Math.min(
        Math.hypot(e.movementX / window.innerWidth, e.movementY / window.innerHeight) * 40,
        1,
      )
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Ink bloom clicks ──────────────────────────────────────────
    const clickSlots = [mat.uniforms.uClick0, mat.uniforms.uClick1, mat.uniforms.uClick2]
    let clickHead = 0

    const spawnBloom = (x: number, y: number) => {
      clickSlots[clickHead % 3].value.set(x, y, clock.getElapsedTime())
      clickHead++
    }

    window.addEventListener('click',      (e: MouseEvent)  => spawnBloom(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight))
    window.addEventListener('touchstart', (e: TouchEvent)  => {
      const t = e.touches[0]
      spawnBloom(t.clientX / window.innerWidth, 1 - t.clientY / window.innerHeight)
      mouseTarget.set(t.clientX / window.innerWidth, 1 - t.clientY / window.innerHeight)
      mouseVelTarget = 0.45
    }, { passive: true })
    window.addEventListener('touchmove', (e: TouchEvent) => {
      const t = e.touches[0]
      mouseTarget.set(t.clientX / window.innerWidth, 1 - t.clientY / window.innerHeight)
      mouseVelTarget = 0.4
    }, { passive: true })

    // ── Resize ────────────────────────────────────────────────────
    window.addEventListener('resize', () => renderer.setSize(window.innerWidth, window.innerHeight))

    // ── Render loop ───────────────────────────────────────────────
    let animId = 0
    const tick = () => {
      animId = requestAnimationFrame(tick)
      scrollCurrent   += (scrollTarget    - scrollCurrent)   * 0.04
      lightCurrent    += (lightTarget     - lightCurrent)    * 0.055
      mouseCurrent.lerp(mouseTarget, 0.10)
      mouseVelCurrent += (mouseVelTarget  - mouseVelCurrent) * 0.12
      mouseVelTarget  *= 0.90

      mat.uniforms.uTime.value     = clock.getElapsedTime()
      mat.uniforms.uScroll.value   = scrollCurrent
      mat.uniforms.uLight.value    = lightCurrent
      mat.uniforms.uMouse.value.copy(mouseCurrent)
      mat.uniforms.uMouseVel.value = mouseVelCurrent
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      geo.dispose(); mat.dispose(); renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
      themeObserver.disconnect()
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
}
