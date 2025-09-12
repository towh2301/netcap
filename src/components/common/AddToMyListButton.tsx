"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Check } from "lucide-react";
import { MovieBasic } from "@/types";
import { useAuthStore } from "@/stores";
import { loginWithGoogle } from "@/services";

export type AddToMyListButtonProps = {
  movie: Pick<MovieBasic, "_id" | "name" | "poster_url" | "thumb_url" | "year" | "slug">;
  size?: "sm" | "md";
  className?: string;
};

export function AddToMyListButton({ movie, size = "md", className }: AddToMyListButtonProps) {
  const { user } = useAuthStore();
  const [inList, setInList] = useState(false);
  const [busy, setBusy] = useState(false);

  const storageKey = useMemo(() => (user ? `mylist:${user.uid}` : ""), [user]);

  useEffect(() => {
    if (!storageKey) {
      setInList(false);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      const arr: MovieBasic[] = raw ? JSON.parse(raw) : [];
      setInList(arr.some((m) => m._id === movie._id));
    } catch {
      setInList(false);
    }
  }, [storageKey, movie._id]);

  const toggle = async () => {
    if (!user) {
      // Gentle nudge: sign in to use My List
      try {
        await loginWithGoogle();
      } catch {
        // ignore
      }
      return;
    }
    if (!storageKey || busy) return;
    setBusy(true);
    try {
      const raw = localStorage.getItem(storageKey);
      const arr: MovieBasic[] = raw ? JSON.parse(raw) : [];
      const exists = arr.some((m) => m._id === movie._id);
      const next = exists
        ? arr.filter((m) => m._id !== movie._id)
        : [...arr, movie as MovieBasic];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setInList(!exists);
    } catch {
      // no-op
    } finally {
      setBusy(false);
    }
  };

  const base =
    "inline-flex items-center gap-2 rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500";
  const sizes =
    size === "sm"
      ? "px-2 py-1 text-xs"
      : "px-3 py-1.5 text-sm";
  const styles = inList
    ? "bg-red-600 border-red-600 text-white hover:bg-red-500"
    : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700";

  return (
    <button
      type="button"
      aria-pressed={inList}
      aria-label={inList ? "Remove from My List" : "Add to My List"}
      disabled={busy}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={[base, sizes, styles, className].filter(Boolean).join(" ")}
      title={inList ? "Remove from My List" : "Add to My List"}
    >
      {inList ? <Check size={16} /> : <Plus size={16} />}
      <span className="hidden sm:inline">My List</span>
    </button>
  );
}
