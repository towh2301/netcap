import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

export const login = async (email: string, password: string): Promise<UserCredential> => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider);
};

export const logout = async () => {
	return await signOut(auth);
};
