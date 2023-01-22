import React from "react";

interface loaderProps {
  color?: string;
}

const Loader: React.FC<loaderProps> = ({ color }) => {
  return (
    <div className="lds-ellipsis" style={{ margin: "0 auto" }}>
      <div style={{ backgroundColor: "#1976d2" || color }}></div>
      <div style={{ backgroundColor: "#1976d2" || color }}></div>
      <div style={{ backgroundColor: "#1976d2" || color }}></div>
      <div style={{ backgroundColor: "#1976d2" || color }}></div>
    </div>
  );
};

export default Loader;
