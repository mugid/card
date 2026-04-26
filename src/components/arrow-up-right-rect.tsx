type ArrowUpRightRectProps = {
  className?: string;
};

export function ArrowUpRightRect({ className }: ArrowUpRightRectProps) {
  const lb = { x: 4.5, y: 19.5 };
  const lt = { x: 6, y: 5.5 };
  const rt = { x: 18, y: 5.5 };
  const rb = { x: 18, y: 19.5 };

  const strokeWidth = 2;
  const capR = strokeWidth / 2;

  const dx = rt.x - lb.x;
  const dy = rt.y - lb.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  /** Perpendicular to the slope (90° CCW in SVG coords). */
  const nx = -uy;
  const ny = ux;

  /** Round cap at rt: semicircle centered on rt, diameter = strokeWidth, bulging along +u. */
  const sx = rt.x + nx * capR;
  const sy = rt.y + ny * capR;
  const ex = rt.x - nx * capR;
  const ey = rt.y - ny * capR;
  const mx = rt.x + ux * capR;
  const my = rt.y + uy * capR;

  const cross =
    (ex - sx) * (my - sy) - (ey - sy) * (mx - sx);
  const sweep = cross < 0 ? 1 : 0;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line
        x1={lt.x}
        y1={lt.y}
        x2={rt.x}
        y2={rt.y}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <line
        x1={rt.x}
        y1={rt.y}
        x2={rb.x}
        y2={rb.y}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <line
        x1={lb.x}
        y1={lb.y}
        x2={rt.x}
        y2={rt.y}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
      />
      <path
        d={`M ${sx} ${sy} A ${capR} ${capR} 0 0 ${sweep} ${ex} ${ey} Z`}
        fill="currentColor"
      />
    </svg>
  );
}
