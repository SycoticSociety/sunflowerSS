export const Ocean: React.FC = ({ children }) => {
  const oceanStyle = {
    background: "black", // Set the background to black
    imageRendering: "pixelated" as React.CSSProperties["imageRendering"],
    width: "100%",
    height: "100vh",
  };

  return (
    <div
      style={oceanStyle} // Apply the oceanStyle to this div
      className="bg-blue-600 w-full h-full flex relative items-center justify-center"
    >
      {children}
    </div>
  );
};
