/**
 * Type-safe LocalStorage wrapper.
 * All read/write operations are guarded for SSR (server-side rendering).
 */

/** Get a value from LocalStorage */
export function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  } catch {
    console.warn(`Failed to read localStorage key "${key}"`);
    return defaultValue;
  }
}

/** Set a value in LocalStorage */
export function setStoredValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to write localStorage key "${key}"`);
  }
}

/** Remove a value from LocalStorage */
export function removeStoredValue(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`Failed to remove localStorage key "${key}"`);
  }
}

/** Append to an array stored in LocalStorage */
export function appendToStoredArray<T>(key: string, item: T): void {
  const existing = getStoredValue<T[]>(key, []);
  existing.push(item);
  setStoredValue(key, existing);
}

/** Get the size of stored data in bytes (approximate) */
export function getStorageSize(key: string): number {
  if (typeof window === "undefined") return 0;

  const stored = localStorage.getItem(key);
  if (!stored) return 0;
  return new Blob([stored]).size;
}
