const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(330 80% 65%), transparent 70%)",
          top: "-10%",
          left: "10%",
          animationDelay: "0s",
          animationDuration: "25s",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(350 80% 62%), transparent 70%)",
          top: "40%",
          right: "-5%",
          animationDelay: "-8s",
          animationDuration: "30s",
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.05] animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(340 60% 50%), transparent 70%)",
          bottom: "10%",
          left: "30%",
          animationDelay: "-15s",
          animationDuration: "28s",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(40 80% 65%), transparent 70%)",
          top: "20%",
          left: "60%",
          animationDelay: "-20s",
          animationDuration: "22s",
        }}
      />
    </div>
  );
};

export default FloatingBlobs;
