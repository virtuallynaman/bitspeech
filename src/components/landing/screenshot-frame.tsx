import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
};

export default function ScreenshotFrame({ src, alt }: Props) {
  return (
    <div className="relative isolate">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/20 blur-3xl" />

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
        </div>

        {src ? (
          <Image src={src} alt={alt} width={1600} height={900} className="w-full" />
        ) : (
          <div className="flex aspect-video items-center justify-center text-sm text-muted-foreground">
            Add your screenshot here
          </div>
        )}
      </div>
    </div>
  );
}
