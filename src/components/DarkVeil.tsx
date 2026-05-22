/**
 * DarkVeil — WebGL animated veil shader.
 * Renders a slow flow-noise field that can be tinted via hueShift.
 * In this project it is wrapped by BridalVeilBackground with light filters,
 * so the output reads as a bright bridal "veil of light".
 */
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

type DarkVeilProps = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  scanlineFrequency?: number;
  speed?: number;
  warpAmount?: number;
  resolutionScale?: number;
};

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uHueShift;
  uniform float uNoise;
  uniform float uScanInt;
  uniform float uScanFreq;
  uniform float uWarp;

  // ---- helpers ---------------------------------------------------------
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float snoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
              dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
          mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
              dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
              dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
          mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
              dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
      u.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec3 hueRotate(vec3 c, float a) {
    const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                            0.587,-0.274,-0.523,
                            0.114,-0.322, 0.312);
    const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                            0.956,-0.272,-1.106,
                            0.621,-0.647, 1.703);
    vec3 yiq = toYIQ * c;
    float cs = cos(a), sn = sin(a);
    yiq.yz = mat2(cs, -sn, sn, cs) * yiq.yz;
    return clamp(toRGB * yiq, 0.0, 1.0);
  }

  // ---- main ------------------------------------------------------------
  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.15;

    // warp the field
    vec2 warp = vec2(fbm(vec3(p * 1.5, t)), fbm(vec3(p * 1.5 + 10.0, t)));
    p += warp * uWarp;

    float n1 = fbm(vec3(p * 1.2, t));
    float n2 = fbm(vec3(p * 2.4 + 5.0, t * 1.2));

    // base palette (kept neutral; outer wrapper handles tinting)
    vec3 a = vec3(0.32, 0.18, 0.42);
    vec3 b = vec3(0.95, 0.78, 0.62);
    vec3 c = vec3(0.55, 0.42, 0.66);

    vec3 col = mix(a, b, smoothstep(-0.4, 0.6, n1));
    col = mix(col, c, smoothstep(0.0, 0.8, n2));

    // hue rotate
    col = hueRotate(col, radians(uHueShift));

    // film grain
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * uNoise;

    // optional scanlines
    if (uScanInt > 0.0 && uScanFreq > 0.0) {
      float s = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
      col *= 1.0 - uScanInt * (1.0 - s);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0.03,
  scanlineIntensity = 0,
  scanlineFrequency = 0,
  speed = 0.5,
  warpAmount = 0.1,
  resolutionScale = 1,
}: DarkVeilProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    host.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScanInt: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(Math.max(1, Math.floor(w * resolutionScale)), Math.max(1, Math.floor(h * resolutionScale)));
      gl.canvas.style.width = w + "px";
      gl.canvas.style.height = h + "px";
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      program.uniforms.uTime.value = ((now - start) / 1000) * speed;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, scanlineFrequency, speed, warpAmount, resolutionScale]);

  return <div ref={ref} className="absolute inset-0 w-full h-full" />;
}
