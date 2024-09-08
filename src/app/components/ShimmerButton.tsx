import React, { CSSProperties } from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      style={{
        '--shimmer-color': '#ffffff',
        '--radius': '9999px',
        '--speed': '3s',
        '--cut': '0.05em',
        '--bg': 'var(--main-red)',
      } as CSSProperties}
      className={`relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap text-white [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px] ${className}`}
      {...props}
    >
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(90deg*0.5)),transparent_0,var(--shimmer-color)_90deg,transparent_90deg)] [translate:0_0]" />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 rounded-[var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out hover:shadow-[inset_0_-6px_10px_#ffffff3f] active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </button>
  );
};

export default ShimmerButton;