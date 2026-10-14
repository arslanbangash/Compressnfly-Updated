/**
 * Search for the encoding that gets a file as close as possible to (but not
 * over) a target size, keeping quality as high as possible.
 *
 * Pure logic: the actual encoder is injected, so this runs in the browser
 * (canvas) and can be unit-tested in Node.
 */

export type Encoder = (scale: number, quality: number) => Promise<Blob>;

export interface FitOptions {
  /** Starting scale (1 = original pixel size). */
  initialScale?: number;
  minQuality?: number;
  maxQuality?: number;
  /** Don't shrink below this scale. */
  minScale?: number;
  /** Binary-search steps per scale. */
  qualitySteps?: number;
  /** Max number of scale reductions. */
  maxRounds?: number;
}

export interface FitResult {
  blob: Blob;
  scale: number;
  quality: number;
  /** True when the result is at or under the target. */
  hitTarget: boolean;
}

export async function fitToTarget(encode: Encoder, targetBytes: number, opts: FitOptions = {}): Promise<FitResult> {
  const {
    initialScale = 1,
    minQuality = 0.3,
    maxQuality = 0.92,
    minScale = 0.02,
    qualitySteps = 7,
    maxRounds = 10,
  } = opts;

  let scale = Math.min(1, Math.max(minScale, initialScale));
  let smallest: FitResult | null = null;
  /** Best result under the target found so far (at max quality, from a smaller scale). */
  let fitted: FitResult | null = null;
  let grownOnce = false;

  for (let round = 0; round < maxRounds; round++) {
    // Cheapest encoding at this scale: if even this is too big, shrink the image.
    const floor = await encode(scale, minQuality);
    if (!smallest || floor.size < smallest.blob.size) {
      smallest = { blob: floor, scale, quality: minQuality, hitTarget: floor.size <= targetBytes };
    }

    if (floor.size > targetBytes) {
      // Too big even at lowest quality. If an earlier, smaller scale fitted, use it.
      if (fitted) return fitted;
      if (scale <= minScale) break;
      // File size scales roughly with pixel count, i.e. with scale².
      const next = scale * Math.sqrt(targetBytes / floor.size) * 0.9;
      scale = Math.max(minScale, Math.min(next, scale * 0.9));
      continue;
    }

    const top = await encode(scale, maxQuality);
    if (top.size <= targetBytes) {
      fitted = { blob: top, scale, quality: maxQuality, hitTarget: true };
      // Lots of room left and the image was shrunk: grow it once to use the budget.
      if (scale < 1 && !grownOnce && top.size < targetBytes * 0.85) {
        grownOnce = true;
        scale = Math.min(1, scale * Math.sqrt(targetBytes / top.size) * 0.97);
        continue;
      }
      return fitted;
    }

    // It fits at this scale: binary-search the highest quality that still fits.
    let best: FitResult = { blob: floor, scale, quality: minQuality, hitTarget: true };
    let lo = minQuality;
    let hi = maxQuality;
    for (let i = 0; i < qualitySteps; i++) {
      const mid = (lo + hi) / 2;
      const blob = await encode(scale, mid);
      if (blob.size <= targetBytes) {
        best = { blob, scale, quality: mid, hitTarget: true };
        lo = mid;
      } else {
        hi = mid;
      }
    }
    // Prefer the smaller-but-max-quality version if this one is barely better.
    if (fitted && best.quality < 0.6) return fitted;
    return best;
  }

  return fitted ?? smallest!;
}

/**
 * A sensible starting scale so the search lands on good quality instead of
 * a full-size image squeezed to very low quality. Assumes ~1.6 bits per
 * pixel for a typical photo saved as JPEG at good quality.
 */
export function initialScaleFor(width: number, height: number, targetBytes: number): number {
  const pixelBudget = (targetBytes * 8) / 1.6;
  const pixels = width * height;
  if (pixels <= pixelBudget) return 1;
  return Math.sqrt(pixelBudget / pixels);
}
