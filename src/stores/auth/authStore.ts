import { AuthState } from "./helpers";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	loading: true,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
}));
