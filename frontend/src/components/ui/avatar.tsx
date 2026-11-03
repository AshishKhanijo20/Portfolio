/**
 * Profile photo. Until `public/photo.jpg` is added this shows initials.
 * TODO(photo): replace the initials with <Image src="/photo.jpg" alt={alt} fill className="object-cover" />.
 */
export function Avatar({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative grid aspect-square place-items-center overflow-hidden rounded-full border-[6px] border-surface bg-line font-serif text-6xl text-pine shadow-2xl shadow-black/15 ${className}`}
    >
      AK
    </div>
  );
}
