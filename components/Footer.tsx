const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-stone-100 py-10">
      <div className="container mx-auto flex flex-col justify-between sm:flex-row">
        <div className="px-5">
          <h3 className="text-lg font-bold mb-2">Recipe Finder</h3>
          <p>Your ultimate destination for finding and sharing recipes.</p>
        </div>
        <div className="px-5 mt-7 sm:mt-0">
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul>
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/about" className="hover:text-orange-500">About</a></li>
            <li><a href="/favorites" className="hover:text-orange-500">Favorites</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
          </ul>
        </div>
        <div className="px-5 mt-7 sm:mt-0">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p>Email: support@recipefinder.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
