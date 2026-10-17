// Bridge to the native Android / iOS shell (Capacitor). Everything here is
// null-safe so the app still starts if a plugin or the bridge is missing.
const Cap = typeof window !== 'undefined' ? window.Capacitor : null;

export const isNative = !!Cap?.isNativePlatform?.();

/** Returns a native plugin proxy, or null when unavailable. */
export function plugin(name) {
  if (!isNative) return null;
  try {
    if (typeof Cap.registerPlugin === 'function') return Cap.registerPlugin(name);
    return Cap.Plugins?.[name] || null;
  } catch {
    return null;
  }
}

export function platform() {
  return Cap?.getPlatform?.() || 'web';
}
