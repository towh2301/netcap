import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
	apiKey:
		process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
		"AIzaSyDemoDummyKeyForNetCapMock123456",
	authDomain:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
		"netcap-demo.firebaseapp.com",
	projectId:
		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "netcap-demo",
	storageBucket:
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
		"netcap-demo.appspot.com",
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
	appId:
		process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
		"1:123456789012:web:mockappid123456",
};

// Ensure Firebase is initialized only on the client and only once
const app = typeof window !== "undefined" ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : ({} as any);

export const auth = typeof window !== "undefined" ? getAuth(app) : ({} as any);

// Set persistence to local (IndexedDB) in the browser for better UX
if (typeof window !== "undefined") {
	setPersistence(auth, browserLocalPersistence).catch(() => {
		// no-op: persistence might fail in unsupported environments (e.g., private mode)
	});
}
