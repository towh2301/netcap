"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
	Github,
	Film,
	Zap,
	Shield,
	Sparkles,
	ArrowRight,
	Badge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@radix-ui/react-accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Progress } from "@radix-ui/react-progress";

export default function AboutPage() {
	return (
		<div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-900 text-neutral-50">
			{/* Glow background */}
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-3xl" />
				<div className="absolute right-[10%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-indigo-600/10 blur-3xl" />
			</div>

			{/* Hero */}
			<section className="container mx-auto max-w-6xl px-4 pb-16 pt-24 md:pt-28">
				<div className="grid items-center gap-10 md:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<Badge
							className="mb-3 rounded-full px-3 py-1 text-xs"
							// variant="secondary"
						>
							<Sparkles className="mr-1 h-3.5 w-3.5" /> Built for
							developers & movie lovers
						</Badge>
						<h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
							About{" "}
							<span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
								NetCap
							</span>
						</h1>
						<p className="mb-6 max-w-xl text-neutral-300">
							NetCap is a Netflix‑style streaming UI that
							showcases modern web engineering: Next.js App
							Router, TypeScript, Tailwind CSS, and shadcn/ui. It
							features blazing‑fast navigation, accessible
							components, and a sleek, cinematic experience.
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Button size="lg" className="rounded-2xl" asChild>
								<a href="/browse" className="flex items-center">
									Start browsing{" "}
									<ArrowRight className="ml-2 h-4 w-4" />
								</a>
							</Button>
							<Button
								size="lg"
								variant="secondary"
								className="rounded-2xl"
								asChild
							>
								<a
									href="https://github.com/towh2301/netcap"
									target="_blank"
									rel="noreferrer"
								>
									<Github className="mr-2 h-4 w-4" /> View on
									GitHub
								</a>
							</Button>
						</div>
						<div className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-400">
							<span className="inline-flex items-center rounded-full bg-neutral-800/60 px-3 py-1">
								Next.js App Router
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-800/60 px-3 py-1">
								TypeScript
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-800/60 px-3 py-1">
								Tailwind CSS
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-800/60 px-3 py-1">
								shadcn/ui
							</span>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="relative"
					>
						<Card className="overflow-hidden rounded-2xl border-neutral-800 bg-neutral-900/50 backdrop-blur">
							<CardContent className="p-0">
								<div className="relative aspect-[16/10]">
									<Image
										src="/images/about/hero-still.jpg"
										alt="NetCap preview"
										fill
										className="object-cover"
										priority
									/>
								</div>
								<div className="grid grid-cols-3 gap-4 p-5">
									<div className="rounded-xl bg-neutral-800/60 p-4 text-center">
										<Film className="mx-auto mb-2 h-5 w-5" />
										<div className="text-2xl font-semibold">
											10k+
										</div>
										<div className="text-xs text-neutral-400">
											Titles indexed*
										</div>
									</div>
									<div className="rounded-xl bg-neutral-800/60 p-4 text-center">
										<Zap className="mx-auto mb-2 h-5 w-5" />
										<div className="text-2xl font-semibold">
											<span className="tabular-nums">
												<span>~</span>50ms
											</span>
										</div>
										<div className="text-xs text-neutral-400">
											Route transitions
										</div>
									</div>
									<div className="rounded-xl bg-neutral-800/60 p-4 text-center">
										<Shield className="mx-auto mb-2 h-5 w-5" />
										<div className="text-2xl font-semibold">
											JWT
										</div>
										<div className="text-xs text-neutral-400">
											Secure auth ready
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			<Separator className="container mx-auto max-w-6xl border-neutral-800" />

			{/* Our Mission */}
			<section className="container mx-auto max-w-6xl px-4 py-16">
				<div className="grid gap-6 md:grid-cols-3">
					<div className="md:col-span-1">
						<h2 className="text-2xl font-semibold">Our Mission</h2>
						<p className="mt-2 text-neutral-300">
							Build a delightful, accessible streaming experience
							while demonstrating robust, scalable frontend
							patterns.
						</p>
					</div>
					<div className="md:col-span-2 grid gap-4">
						<Card className="rounded-2xl border-neutral-800 bg-neutral-900/50">
							<CardHeader>
								<CardTitle className="text-base">
									Developer‑first architecture
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-neutral-300">
								File‑system routing, server components where
								they shine, and a clear UI kit built on
								shadcn/ui make NetCap easy to extend and
								maintain.
							</CardContent>
						</Card>
						<Card className="rounded-2xl border-neutral-800 bg-neutral-900/50">
							<CardHeader>
								<CardTitle className="text-base">
									Performance by default
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-neutral-300">
								Edge‑ready rendering, image optimization,
								streaming and partial hydration ensure a snappy
								feel even on slow networks.
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Key Features */}
			<section className="container mx-auto max-w-6xl px-4 pb-4">
				<h2 className="mb-6 text-2xl font-semibold">Key Features</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{
							title: "Cinematic UI",
							desc: "Immersive carousels, hover previews, rich metadata cards.",
							icon: <Film className="h-5 w-5" />,
						},
						{
							title: "Powered by shadcn/ui",
							desc: "Composable, accessible primitives with consistent theming.",
							icon: <Sparkles className="h-5 w-5" />,
						},
						{
							title: "Auth‑ready",
							desc: "Pluggable JWT/NextAuth strategies and protected routes.",
							icon: <Shield className="h-5 w-5" />,
						},
					].map((f, i) => (
						<Card
							key={i}
							className="rounded-2xl border-neutral-800 bg-neutral-900/50"
						>
							<CardHeader className="flex flex-row items-center gap-3">
								<div className="rounded-xl bg-neutral-800/80 p-2">
									{f.icon}
								</div>
								<CardTitle className="text-base">
									{f.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-neutral-300">
								{f.desc}
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Tech Stack */}
			<section className="container mx-auto max-w-6xl px-4 py-16">
				<h2 className="mb-6 text-2xl font-semibold">Tech Stack</h2>
				<div className="grid gap-6 md:grid-cols-2">
					<Card className="rounded-2xl border-neutral-800 bg-neutral-900/50">
						<CardHeader>
							<CardTitle className="text-base">
								Frontend
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-neutral-300">
							<ul className="list-inside list-disc space-y-2">
								<li>
									Next.js App Router, React Server Components
								</li>
								<li>TypeScript, ESLint/Prettier</li>
								<li>
									Tailwind CSS with dark theme and CSS
									variables
								</li>
								<li>
									shadcn/ui (Button, Card, Dialog, Dropdown,
									etc.)
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-neutral-800 bg-neutral-900/50">
						<CardHeader>
							<CardTitle className="text-base">
								Backend & Infra (optional)
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-neutral-300">
							<ul className="list-inside list-disc space-y-2">
								<li>
									Next.js Route Handlers or dedicated API
									(Spring Boot / NestJS)
								</li>
								<li>JWT/NextAuth for authentication</li>
								<li>
									PostgreSQL + Prisma (or MongoDB + Mongoose)
								</li>
								<li>Vercel for hosting, Edge/CDN for assets</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				<div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
					<div className="mb-2 flex items-center justify-between text-sm">
						<span className="text-neutral-300">
							Roadmap progress
						</span>
						<span className="tabular-nums text-neutral-400">
							68%
						</span>
					</div>
					<Progress value={68} className="h-2" />
				</div>
			</section>

			{/* Team */}
			<section className="container mx-auto max-w-6xl px-4 py-8">
				<h2 className="mb-6 text-2xl font-semibold">Team</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[
						{
							name: "Bui Hoang Huy",
							role: "Developer",
							avatar: "/images/fox.jpg",
						},
					].map((m) => (
						<Card
							key={m.name}
							className="rounded-2xl border-neutral-800 bg-neutral-900/50"
						>
							<CardContent className="flex items-center gap-4 p-5">
								<Avatar className="h-12 w-12">
									<AvatarImage src={m.avatar} alt={m.name} />
									<AvatarFallback>
										{m.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">{m.name}</div>
									<div className="text-xs text-neutral-400">
										{m.role}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* FAQ */}
			<section className="container mx-auto max-w-6xl px-4 py-16">
				<h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
				<Accordion
					type="single"
					collapsible
					className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-2"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="px-3">
							Is NetCap a real streaming service?
						</AccordionTrigger>
						<AccordionContent className="px-3 text-sm text-neutral-300">
							NetCap is a demo/learning project and Netflix UI
							clone. It integrates with public movie APIs for
							metadata. No copyrighted content is hosted.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="px-3">
							Can I use NetCap for my portfolio?
						</AccordionTrigger>
						<AccordionContent className="px-3 text-sm text-neutral-300">
							Yes. Fork it, customize the UI, wire your own
							backend or use route handlers, and deploy.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="px-3">
							Which components come from shadcn/ui?
						</AccordionTrigger>
						<AccordionContent className="px-3 text-sm text-neutral-300">
							Buttons, Cards, Badge, Accordion, Avatar, Progress,
							Separator, and more—styled to match the NetCap
							theme.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			{/* CTA */}
			<section className="container mx-auto max-w-6xl px-4 pb-24">
				<Card className="overflow-hidden rounded-2xl border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800">
					<CardContent className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
						<div>
							<h3 className="text-2xl font-semibold">
								Ready to build your own streaming app?
							</h3>
							<p className="mt-2 text-neutral-300">
								Use NetCap as a foundation, connect your API,
								and ship a polished experience in days—not
								weeks.
							</p>
							<div className="mt-4 flex gap-3">
								<Button className="rounded-2xl" asChild>
									<a href="/docs/get-started">Get started</a>
								</Button>
								<Button
									variant="secondary"
									className="rounded-2xl"
									asChild
								>
									<a href="/contact">Contact us</a>
								</Button>
							</div>
						</div>
						<div className="relative">
							<div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
								<Image
									src="/images/about/showcase.jpg"
									alt="Feature showcase"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<footer className="container mx-auto max-w-6xl px-4 pb-12 text-center text-xs text-neutral-500">
				* Demo metrics.
			</footer>
		</div>
	);
}
