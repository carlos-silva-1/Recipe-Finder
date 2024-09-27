const HeroSection: React.FC = () => {
  return (
    <section className="bg-stone-100 text-stone-100 py-20 bg-[url('../public/images/food-preparation.png')] bg-cover bg-center">
      <div className="container mx-auto text-left px-5">
        <h1 className="text-5xl font-bold text-white">
          Discover, Save, and Share Your Favorite Recipes
        </h1>
        <p className="mt-10 text-4xl text-white">
          Recipe Finder is your gateway to the culinary world.
        </p>
        <p className="mt-10 text-3xl text-white">
          Explore thousands of recipes from cuisines around the globe, tailored to your tastes. 
          Save recipes for easy access and create your personal cookbook, all in one place.
        </p>
        <a href="/register" className="mt-10 inline-block bg-orange-500 text-black py-3 px-6 rounded text-2xl hover:bg-orange-600">
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
