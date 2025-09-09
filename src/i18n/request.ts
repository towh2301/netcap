export default async function getRequestConfig() {
	const localeValue = "en"; // static for now

	return {
		locale: localeValue,
		messages: (await import(`./messages/${localeValue}.json`)).default,
	};
}
