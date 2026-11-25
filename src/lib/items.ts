import { useSyncExternalStore } from "react";

export type ItemStatus = "lost" | "found";
export const CATEGORIES = ["Electronics", "Books & Notes", "ID & Cards", "Bags", "Clothing", "Accessories", "Keys", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Item {
  id: string;
  name: string;
  category: Category;
  description: string;
  location: string;
  date: string;
  status: ItemStatus;
  claimed: boolean;
  contactName: string;
  email: string;
  phone: string;
  image: string;
  createdAt: number;
}

const KEY = "findit.items.v1";
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;
const day = 86400000;
const base = Date.UTC(2026, 10, 24);
const d = (n: number) => new Date(base - n * day).toISOString().slice(0, 10);

export const SEED: Item[] = [
  { id: "s1", name: "Black AirPods Pro Case", category: "Electronics", description: "White AirPods Pro inside a matte black silicone case with a small scratch on the lid.", location: "Central Library, 2nd Floor", date: d(0), status: "lost", claimed: false, contactName: "Aarav Sharma", email: "aarav.s@college.edu", phone: "9876543210", image: img("photo-1606220588913-b3aacb4d2f46"), createdAt: base - 1 },
  { id: "s2", name: "Blue Hydro Flask Bottle", category: "Accessories", description: "Navy blue 32oz bottle with stickers of mountains and a coding logo.", location: "Sports Complex", date: d(1), status: "found", claimed: false, contactName: "Priya Nair", email: "priya.n@college.edu", phone: "9123456780", image: img("photo-1602143407151-7111542de6e8"), createdAt: base - day },
  { id: "s3", name: "Student ID Card – Rohan M.", category: "ID & Cards", description: "College ID card, B.Sc. Computer Science, found near the canteen entrance.", location: "Main Canteen", date: d(1), status: "found", claimed: false, contactName: "Security Office", email: "security@college.edu", phone: "9000011111", image: img("photo-1633265486064-086b219458ec"), createdAt: base - day - 5 },
  { id: "s4", name: "Grey JanSport Backpack", category: "Bags", description: "Contains a calculus textbook, a charger and a pencil pouch. Has a keychain of a cat.", location: "Lecture Hall B-204", date: d(2), status: "lost", claimed: false, contactName: "Sneha Patel", email: "sneha.p@college.edu", phone: "9988776655", image: img("photo-1553062407-98eeb64c6a62"), createdAt: base - 2 * day },
  { id: "s5", name: "Casio Scientific Calculator", category: "Electronics", description: "fx-991EX, name engraved on the back: 'K.V.'", location: "Physics Lab", date: d(3), status: "found", claimed: true, contactName: "Kabir Verma", email: "kabir.v@college.edu", phone: "9811122233", image: img("photo-1564466809058-bf4114d55352"), createdAt: base - 3 * day },
  { id: "s6", name: "Set of Hostel Keys", category: "Keys", description: "Three keys on a red lanyard with a small brass bell.", location: "Hostel Block C Corridor", date: d(4), status: "lost", claimed: false, contactName: "Ishaan Gupta", email: "ishaan.g@college.edu", phone: "9765432109", image: img("photo-1582139329536-e7284fece509"), createdAt: base - 4 * day },
  { id: "s7", name: "Organic Chemistry Notes", category: "Books & Notes", description: "Spiral-bound A4 notebook with handwritten notes for Semester 3.", location: "Chemistry Dept. Corridor", date: d(5), status: "found", claimed: false, contactName: "Meera Iyer", email: "meera.i@college.edu", phone: "9345678901", image: img("photo-1531346878377-a5be20888e57"), createdAt: base - 5 * day },
  { id: "s8", name: "Denim Jacket", category: "Clothing", description: "Light-wash denim jacket, size M, with a pin badge on the collar.", location: "Auditorium", date: d(6), status: "lost", claimed: true, contactName: "Ananya Rao", email: "ananya.r@college.edu", phone: "9234567812", image: img("photo-1551537482-f2075a1d41f2"), createdAt: base - 6 * day },
  { id: "s9", name: "Silver Analog Watch", category: "Accessories", description: "Fossil silver watch with a metal strap, found on a bench.", location: "Campus Garden", date: d(7), status: "found", claimed: false, contactName: "Dev Malhotra", email: "dev.m@college.edu", phone: "9456123789", image: img("photo-1524592094714-0f0654e20314"), createdAt: base - 7 * day },
];

let cache: Item[] | null = null;
const listeners = new Set<() => void>();

function read(): Item[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Item[]) : SEED;
  } catch {
    cache = SEED;
  }
  return cache;
}

function write(items: Item[]) {
  cache = items;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; l(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

export function useItems(): Item[] {
  return useSyncExternalStore(subscribe, read, () => SEED);
}

export function addItem(data: Omit<Item, "id" | "createdAt" | "claimed">): Item {
  const item: Item = { ...data, id: crypto.randomUUID(), createdAt: Date.now(), claimed: false };
  write([item, ...read()]);
  return item;
}
export function setClaimed(id: string, claimed: boolean) {
  write(read().map((i) => (i.id === id ? { ...i, claimed } : i)));
}
export function deleteItem(id: string) {
  write(read().filter((i) => i.id !== id));
}
export function resetDemo() { write(SEED); }

export function getStats(items: Item[]) {
  return {
    total: items.length,
    lost: items.filter((i) => i.status === "lost").length,
    found: items.filter((i) => i.status === "found").length,
    recovered: items.filter((i) => i.claimed).length,
  };
}

export function formatDate(s: string) {
  return new Date(s + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Resize an uploaded image to a compact JPEG data URL so it fits in browser storage. */
export function fileToDataUrl(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Invalid image"));
      image.onload = () => {
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        const c = document.createElement("canvas");
        c.width = Math.round(image.width * scale);
        c.height = Math.round(image.height * scale);
        c.getContext("2d")?.drawImage(image, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.75));
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
