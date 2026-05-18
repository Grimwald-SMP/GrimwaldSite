// Ember particle configuration for floating background effect
// Each ember rises slowly from the bottom with subtle sway and fade

export interface Ember {
  x: number;           // horizontal position (% of viewport)
  size: number;        // diameter in px
  duration: number;    // rise cycle in seconds
  delay: number;       // animation start offset in seconds
  baseOpacity: number; // peak opacity during cycle
  swayVariant: 1 | 2 | 3; // which sway pattern to use
}

// 22 embers distributed across the viewport with varied properties
// Sizes range 2-5px, durations 12-22s for slow drifting
export const embers: Ember[] = [
  { x: 5,  size: 3, duration: 18, delay: 0,   baseOpacity: 0.25, swayVariant: 1 },
  { x: 12, size: 2, duration: 22, delay: 4,   baseOpacity: 0.20, swayVariant: 2 },
  { x: 18, size: 4, duration: 16, delay: 8,   baseOpacity: 0.28, swayVariant: 3 },
  { x: 24, size: 2, duration: 20, delay: 2,   baseOpacity: 0.18, swayVariant: 1 },
  { x: 31, size: 3, duration: 19, delay: 11,  baseOpacity: 0.24, swayVariant: 2 },
  { x: 38, size: 5, duration: 14, delay: 6,   baseOpacity: 0.30, swayVariant: 3 },
  { x: 44, size: 2, duration: 21, delay: 14,  baseOpacity: 0.19, swayVariant: 1 },
  { x: 50, size: 3, duration: 17, delay: 9,   baseOpacity: 0.26, swayVariant: 2 },
  { x: 56, size: 4, duration: 15, delay: 3,   baseOpacity: 0.27, swayVariant: 3 },
  { x: 62, size: 2, duration: 22, delay: 12,  baseOpacity: 0.20, swayVariant: 1 },
  { x: 68, size: 3, duration: 18, delay: 7,   baseOpacity: 0.23, swayVariant: 2 },
  { x: 74, size: 5, duration: 13, delay: 16,  baseOpacity: 0.29, swayVariant: 3 },
  { x: 80, size: 2, duration: 20, delay: 5,   baseOpacity: 0.21, swayVariant: 1 },
  { x: 86, size: 3, duration: 19, delay: 13,  baseOpacity: 0.25, swayVariant: 2 },
  { x: 92, size: 4, duration: 16, delay: 10,  baseOpacity: 0.26, swayVariant: 3 },
  // Second pass with offset for denser, more natural distribution
  { x: 8,  size: 2, duration: 17, delay: 15,  baseOpacity: 0.18, swayVariant: 3 },
  { x: 27, size: 3, duration: 21, delay: 1,   baseOpacity: 0.22, swayVariant: 2 },
  { x: 41, size: 2, duration: 18, delay: 17,  baseOpacity: 0.19, swayVariant: 1 },
  { x: 58, size: 3, duration: 20, delay: 8,   baseOpacity: 0.24, swayVariant: 3 },
  { x: 71, size: 2, duration: 22, delay: 2,   baseOpacity: 0.20, swayVariant: 2 },
  { x: 84, size: 3, duration: 16, delay: 11,  baseOpacity: 0.23, swayVariant: 1 },
  { x: 96, size: 2, duration: 19, delay: 6,   baseOpacity: 0.21, swayVariant: 3 },
];
