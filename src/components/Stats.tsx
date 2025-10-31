const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "15+", label: "Years Experience" },
];

const Stats = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm md:text-base">
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
