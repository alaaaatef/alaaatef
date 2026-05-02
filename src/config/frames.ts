export const FRAME_COUNT = 120;
export const FRAME_PAD = 3;
export const FRAME_PATH = "/frames/";
export const FRAME_EXT = "jpg";

export function frameUrl(i: number) {
  return `${FRAME_PATH}${String(i).padStart(FRAME_PAD, "0")}.${FRAME_EXT}`;
}

export const FRAME_URLS = Array.from({ length: FRAME_COUNT }, (_, i) => frameUrl(i + 1));
