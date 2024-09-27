const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-stone-700 text-center text-stone-800">
      <div className="container mx-auto text-stone-100 px-5">
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="grid justify-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="text-orange-500 mb-3">
              <path fill="currentColor" d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
            <h3 className="text-2xl font-semibold">1. Search for Recipes</h3>
            <p className="mt-2">Find thousands of recipes tailored to your taste and dietary preferences.</p>
          </div>

          <div className="grid justify-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 24 24" className="text-orange-500">
              <path fill="currentColor" d="M19 19c0 1.11-.89 2-2 2H7a2 2 0 0 1-2-2v-7H3v-2h18v2h-2M8 1.5a3.35 3.35 0 0 0 0 6.7h1.53c.39 0 .76.1 1.08.3h2.02c-.58-1.05-1.77-1.75-3.1-1.75H8c-1 0-1.85-.98-1.85-2S7 3 8 3m4.85-1c0 1-.85 1.85-1.85 1.85v1.5c1.92 0 3.5 1.35 3.89 3.15h1.53a5.54 5.54 0 0 0-3.07-4.12c.62-.61 1-1.45 1-2.38Z"/>
            </svg>
            <h3 className="text-2xl font-semibold">2. Save Your Favorites</h3>
            <p className="mt-2">Keep track of the recipes you love and want to try again.</p>
          </div>

          <div className="grid justify-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30" className="text-orange-500 mb-3">
              <path fill="currentColor" d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
            </svg>
            <h3 className="text-2xl font-semibold">3. Share Your Creations</h3>
            <p className="mt-2">Share your favorite recipes with friends and family or add your own.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
