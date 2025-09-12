"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores";
import { auth } from "@/config/firebaseConfig";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { setUser, setLoading } = useAuthStore();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [setUser, setLoading]);

	return <>{children}</>;
};
