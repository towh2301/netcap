import { Suspense } from "react";
import SearchPage from "@/components/common/SearchPage";

export default function Page() {
	return (
		<Suspense fallback={<div className="text-white p-6">Loading search...</div>}>
			<SearchPage />
		</Suspense>
	);
}
