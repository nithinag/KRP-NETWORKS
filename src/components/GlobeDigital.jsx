import React from "react";

const GlobeDigital = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center opacity-20 ${className}`}>
      <div className="w-[1000px] h-[500px] border border-cyan-400 rounded-full blur-3xl" />
    </div>
  );
};

export default GlobeDigital;
