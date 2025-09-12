import { User } from "firebase/auth";

export interface AuthState {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
}
