const IdeaSection: React.FC = () => {
  return (
    <section className="py-20 bg-orange-100 text-left text-stone-800">
      <div className="container mx-auto px-5">

        <h2 className="text-5xl font-bold">Why Use Recipe Finder</h2>

        <div className="flex flex-col lg:flex-row items-center mt-5">
          {/* Left Side: Text */}
          <div className="lg:w-1/2 lg:mb-0 lg:pr-10">
            <p className="text-xl">
              Cooking should be easy, fun, and social. Recipe Finder helps you discover new recipes, save your favorites, and share your culinary creations with others.
            </p>
            <p className="mt-5 text-xl text-stone-800">
              Whether you're a beginner or a seasoned chef, Recipe Finder will help you turn ordinary ingredients into extraordinary meals. 
              Discover new recipes, create your meal plans, and share your culinary creations with friends and family.
            </p>
            <p className="mt-5 text-xl">
              Whether you're a beginner or a seasoned chef, we want to make cooking a joy, not a chore.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="lg:w-1/2 mt-5">
            <img
              src="/images/food-setup-2.jpg"
              alt="Cooking inspiration"
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default IdeaSection;
