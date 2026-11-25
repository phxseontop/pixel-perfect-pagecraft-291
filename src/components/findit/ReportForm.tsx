import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addItem, CATEGORIES, fileToDataUrl, type Category, type ItemStatus } from "@/lib/items";

type Errors = { [K in "name" | "category" | "description" | "location" | "date" | "contactName" | "email" | "phone"]?: string };
const field = "w-full rounded-xl border border-input bg-secondary/60 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground";

export function ReportForm({ status }: { status: ItemStatus }) {
  const navigate = useNavigate();
  const lost = status === "lost";
  const [image, setImage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  async function onFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please choose an image file"); return; }
    if (file.size > 8 * 1024 * 1024) { toast.error("Image must be under 8 MB"); return; }
    try { setImage(await fileToDataUrl(file)); } catch { toast.error("Could not load that image"); }
    return;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const data = { name: v("name"), category: v("category"), description: v("description"), location: v("location"), date: v("date"), contactName: v("contactName"), email: v("email"), phone: v("phone") };
    const errs: Errors = {};
    if (data.name.length < 2) errs.name = "Enter the item name";
    if (!CATEGORIES.includes(data.category as Category)) errs.category = "Choose a category";
    if (data.description.length < 10) errs.description = "Add at least 10 characters";
    if (data.location.length < 2) errs.location = "Enter a location";
    if (!data.date) errs.date = "Pick a date";
    else if (data.date > new Date().toISOString().slice(0, 10)) errs.date = "Date can't be in the future";
    if (data.contactName.length < 2) errs.contactName = "Enter a contact name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email";
    if (!/^\+?[0-9\s-]{10,15}$/.test(data.phone)) errs.phone = "Enter a valid phone number (10+ digits)";
    setErrors(errs);
    if (Object.keys(errs).length) { toast.error("Please fix the highlighted fields"); return; }
    setBusy(true);
    try {
      const item = addItem({ ...data, category: data.category as Category, status,
        image: image || `https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=800&q=70` });
      toast.success(lost ? "Lost item reported! We hope you find it soon." : "Thank you! Found item reported.");
      navigate({ to: "/items/$id", params: { id: item.id } });
    } catch {
      toast.error("Could not save — your browser storage may be full. Try a smaller photo.");
    } finally { setBusy(false); }
  }

  const err = (k: keyof Errors) => errors[k] && <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p>;
  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <div className="sm:col-span-2"><label className={label}>Item name</label><input name="name" className={field} placeholder="e.g. Black leather wallet" />{err("name")}</div>
      <div><label className={label}>Category</label>
        <select name="category" defaultValue="" className={field}>
          <option value="" disabled>Select category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>{err("category")}</div>
      <div><label className={label}>{lost ? "Date lost" : "Date found"}</label><input type="date" name="date" className={field} />{err("date")}</div>
      <div className="sm:col-span-2"><label className={label}>{lost ? "Last seen location" : "Location found"}</label><input name="location" className={field} placeholder="e.g. Central Library, 2nd floor" />{err("location")}</div>
      <div className="sm:col-span-2"><label className={label}>Description</label><textarea name="description" rows={4} className={field} placeholder="Colour, brand, distinguishing marks…" />{err("description")}</div>
      <div className="sm:col-span-2 border-t border-border pt-5"><h3 className="font-semibold">Contact details</h3></div>
      <div className="sm:col-span-2"><label className={label}>Contact person's name</label><input name="contactName" className={field} placeholder="Your full name" />{err("contactName")}</div>
      <div><label className={label}>Email address</label><input type="email" name="email" className={field} placeholder="you@college.edu" />{err("email")}</div>
      <div><label className={label}>Phone number</label><input type="tel" name="phone" className={field} placeholder="98765 43210" />{err("phone")}</div>
      <div className="sm:col-span-2"><label className={label}>Item photograph <span className="text-muted-foreground">(optional)</span></label>
        {image ? (
          <div className="relative w-fit">
            <img src={image} alt="Preview" className="h-48 rounded-xl object-cover" />
            <button type="button" onClick={() => setImage("")} aria-label="Remove photo" className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5"><X className="h-4 w-4" /></button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-secondary/40 py-10 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
            <ImagePlus className="h-8 w-8" /> Click to upload a photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        )}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="hero" size="lg" disabled={busy} className="w-full sm:w-auto">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Submit {lost ? "Lost" : "Found"} Report
        </Button>
      </div>
    </form>
  );
}
