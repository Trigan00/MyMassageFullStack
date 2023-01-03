import React from "react";

interface loaderProps {
  color: string;
}

const Loader: React.FC<loaderProps> = ({ color }) => {
  return (
    <div className="lds-ellipsis" style={{ margin: "0 auto" }}>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default Loader;
