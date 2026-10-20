"use client";

import { ShaderFill } from "@/lib/custom-effect-runtime";
import {
  manifest,
  render,
  setup,
} from "@/lib/custom-effects/CodeComponentId_8ce92017e53431a2f04b3574f4ba7c98f6f55f1e_625";

// The "Moving gradient" fill behind 1st place, with the params from the Figma file.
// Its first two stops are the P1 and Pp3 variables, the last one is a raw green.
const MOVING_GRADIENT = {
  setup,
  render,
  manifest,
  params: {
    intensity: 3.3499999046325684,
    gradient: {
      stops: [
        { position: 0, color: { r: 0x25 / 255, g: 0x15 / 255, b: 0x3b / 255, a: 1 } },
        { position: 0.5, color: { r: 0xb6 / 255, g: 0x79 / 255, b: 0xff / 255, a: 1 } },
        { position: 1, color: { r: 0, g: 0.9332932829856873, b: 0.419305682182312, a: 1 } },
      ],
    },
    gradientBalance: 0,
    material: 0,
    morphSpeed: 2.3899998664855957,
    detail: 1,
    twist: 0,
    zoom: 72,
    gradientMethod: 1,
    warp: 0.6200000047683716,
    rotationSpeed: 69,
  },
};

/** Renders nothing where WebGPU is unavailable, leaving whatever is underneath visible. */
export function WinnerShader({ className }: { className?: string }) {
  return <ShaderFill shader={MOVING_GRADIENT} className={className} />;
}
