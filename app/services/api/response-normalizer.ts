import { normalizeArray } from "@/utils/normalize-array";
import { normalizeObject } from "@/utils/normalize-object";

export const responseNormalizer = {
  array<T>(response: unknown) {
    return normalizeArray<T>(response);
  },

  object<T>(response: unknown) {
    return normalizeObject<T>(response);
  },
};