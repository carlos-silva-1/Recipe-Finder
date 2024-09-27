const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-orange-400 text-stone-800 py-20 text-center px-5">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold">Ready to Start Your Culinary Journey?</h2>
        <p className="text-lg mt-4 mb-8">Sign up now and discover your next favorite recipe!</p>
        <a href="/register" className="bg-stone-800 text-stone-100 py-3 px-6 rounded hover:bg-stone-700">
          Sign Up Now
        </a>
      </div>
    </section>
  );
};

export default CallToActionSection;
