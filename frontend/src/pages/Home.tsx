import React from "react";
import bgImage from "../assets/Copy-of-10-Companies-That-Hire-for-Remote-Real-Estate-Jobs.jpeg";

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={bgImage}
          alt="Property"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold font-syne mb-4">
              Real Estate
            </h1>
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto">
              Efficiently buy luxury properties through us.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 md:px-8 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mauve-600 font-syne mb-6">
          Welcome
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          Real estate is land, any buildings or improvements on it, and any
          natural resources. There are various types of real estate, including
          commercial, land, industrial, and residential properties. You can own
          real estate or invest in it through real estate investment trusts,
          mutual funds, and exchange-traded funds.
        </p>
      </section>
    </div>
  );
};

export default Home;
