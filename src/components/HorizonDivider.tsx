interface HorizonDividerProps {
  fill: string;
  flip?: boolean;
}

export default function HorizonDivider({ fill, flip = false }: HorizonDividerProps) {
  const path = flip
    ? "M0,64 L0,20 Q320,50 640,10 T1280,30 L1280,64 Z"
    : "M0,64 L0,40 Q320,4 640,26 T1280,14 L1280,64 Z";

  return (
    <div className="h-16 relative">
      <svg viewBox="0 0 1280 64" preserveAspectRatio="none" className="w-full h-full block">
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
