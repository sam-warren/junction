const BloomBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="bg-grid-white/[0.01] absolute inset-0 bg-[size:50px_50px] opacity-10" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-600/5 to-transparent blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/5 dark:via-gray-900/5 dark:to-gray-900/5" />
    </div>
  );
};

export default BloomBackground;
