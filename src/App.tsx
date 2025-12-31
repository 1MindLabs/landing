import React from "react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Team from "./components/Team";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950">
      <Background />

      <div className="relative z-10">
        <main className="flex flex-col gap-24 pb-24 pt-24 md:gap-32 md:pb-32 md:pt-32">
          <Hero />
          <Projects />
          <Team />
        </main>
      </div>
    </div>
  );
};

export default App;
