/** Layered mountain silhouette; the last layer blends into the page background. */
export function Mountains({ size = "lg" }: { size?: "lg" | "sm" }) {
  const height = size === "lg" ? "h-32 sm:h-56" : "h-16 sm:h-24";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-px w-full ${height}`}
    >
      <path
        className="fill-pine/35"
        d="M0 240 L0 150 L180 70 L320 140 L520 30 L700 130 L860 60 L1040 150 L1220 50 L1440 140 L1440 240Z"
      />
      <path
        className="fill-pine/70"
        d="M0 240 L0 190 L220 120 L400 180 L600 100 L780 190 L980 120 L1180 190 L1340 130 L1440 170 L1440 240Z"
      />
      <path className="fill-background" d="M0 240 L0 220 Q360 200 720 222 T1440 215 L1440 240Z" />
    </svg>
  );
}

/** Faint topographic contour lines for hero backgrounds. */
export function Contours() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
      fill="none"
      strokeWidth="1"
      className="pointer-events-none absolute inset-0 h-full w-full stroke-pine opacity-30"
    >
      {[0, 30, 60, 90, 120, 150].map((d) => (
        <path key={d} d={`M0 ${300 - d} Q200 ${200 - d} 400 ${260 - d} T800 ${220 - d}`} />
      ))}
    </svg>
  );
}
