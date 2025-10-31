const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "15+", label: "Years Experience" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-card text-white relative overflow-hidden border-y border-[var(--glass-border)]">
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative inline-block mb-3">
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                  {stat.value}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[var(--shadow-glow)]"></div>
              </div>
              <div className="text-white/70 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
