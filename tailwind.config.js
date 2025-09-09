/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"], // Enable dark mode for Netflix-like theme
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./components/ui/**/*.{js,ts,jsx,tsx}", // Include Shadcn/UI components
	],
	theme: {
		extend: {
			// Netflix-inspired colors
			colors: {
				netflix: {
					black: "#141414", // Dark background
					dark: "#1F1F1F", // Secondary dark shade
					red: "#E50914", // Accent color
					gray: "#8C8C8C", // Subtle text/icons
				},
			},
			// Font sizes for cinematic titles
			fontSize: {
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
			},
			// Spacing for consistent padding
			spacing: {
				14: "3.5rem",
				15: "3.75rem",
			},
			// Smooth transitions for hover effects
			transitionProperty: {
				"transform-opacity": "transform, opacity, brightness",
			},
			// Aspect ratio for movie posters
			aspectRatio: {
				"2/3": "2 / 3",
			},
		},
	},
	plugins: [
		require("tailwind-scrollbar-hide"), // For hiding scrollbars
		require("@tailwindcss/aspect-ratio"), // For aspect ratio utility
	],
};
