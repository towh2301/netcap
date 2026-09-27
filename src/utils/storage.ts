/**
 * Safe client-side storage utility that mirrors AsyncStorage async interface
 * using window.localStorage in browser, with in-memory fallback for SSR/server.
 */
class MemoryStorage {
	private data = new Map<string, string>();
	async getItem(key: string): Promise<string | null> {
		return this.data.get(key) ?? null;
	}
	async setItem(key: string, value: string): Promise<void> {
		this.data.set(key, value);
	}
	async removeItem(key: string): Promise<void> {
		this.data.delete(key);
	}
}

class LocalStorageAdapter {
	async getItem(key: string): Promise<string | null> {
		if (typeof window === "undefined") return null;
		try {
			return window.localStorage.getItem(key);
		} catch {
			return null;
		}
	}
	async setItem(key: string, value: string): Promise<void> {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(key, value);
		} catch {
			// ignore
		}
	}
	async removeItem(key: string): Promise<void> {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.removeItem(key);
		} catch {
			// ignore
		}
	}
}

export const safeStorage =
	typeof window !== "undefined" && typeof window.localStorage !== "undefined"
		? new LocalStorageAdapter()
		: new MemoryStorage();

export default safeStorage;
