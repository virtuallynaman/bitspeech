type Props = {
  level?: number; // audio activity from 0 (silent) to 1 (loud)
  className?: string;
};

// colors as [red, green, blue]
const MUTED = [70, 76, 86];
const BRIGHT = [236, 238, 240];

const DOTS_PER_RING = [8, 16, 24, 32];
const RING_SPACING = 22; // distance between rings in the 200x200 drawing
const DOT_RADIUS = 2.4;

// Work out where every dot goes once, not on every render
const RINGS = DOTS_PER_RING.map((count, ringIndex) => {
  const radius = RING_SPACING * (ringIndex + 1);
  // every other ring is turned by half a step so the dots don't line up in rows
  const offset = ringIndex % 2 === 0 ? 0 : Math.PI / count;

  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + offset;
    return {
      x: Number((100 + radius * Math.cos(angle)).toFixed(2)),
      y: Number((100 + radius * Math.sin(angle)).toFixed(2)),
      wobble: Math.sin(i * 2.4 + ringIndex), // -1 to 1, makes each dot a little different
    };
  });
});

// 0 = muted grey, 1 = soft white
function getIntensity(level: number, ringIndex: number, wobble: number) {
  // outer rings need more audio to light up, so the effect fades outward
  const value = level * 1.2 - ringIndex * 0.12 + wobble * level * 0.3;
  return Math.min(1, Math.max(0, value));
}

function getColor(intensity: number) {
  const [r, g, b] = MUTED.map((from, i) =>
    Math.round(from + (BRIGHT[i] - from) * intensity)
  );
  return `rgb(${r}, ${g}, ${b})`;
}

export default function AudioVisualizer({ level = 0, className }: Props) {
  const safeLevel = Math.min(1, Math.max(0, level));

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Audio activity"
      className={className}
    >
      {RINGS.map((ring, ringIndex) =>
        ring.map((dot, i) => {
          const intensity = getIntensity(safeLevel, ringIndex, dot.wobble);

          return (
            <circle
              key={`${ringIndex}-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={DOT_RADIUS}
              className="transition-[fill,transform] duration-150 ease-out motion-reduce:transition-none"
              style={{
                fill: getColor(intensity),
                transform: `scale(${(1 + intensity * 0.7).toFixed(2)})`,
                transformBox: "fill-box",
                transformOrigin: "center",
                // each ring reacts a little later than the one inside it = the ripple
                transitionDelay: `${ringIndex * 60}ms`,
              }}
            />
          );
        })
      )}
    </svg>
  );
}
