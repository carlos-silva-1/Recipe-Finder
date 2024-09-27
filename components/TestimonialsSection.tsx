import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'John Doe',
    title: 'Home Chef',
    text: 'This app has completely changed the way I cook at home. I can easily find new recipes and save my favorites.',
  },
  {
    name: 'Jane Smith',
    title: 'Food Blogger',
    text: 'I love how intuitive and easy it is to find recipes tailored to my taste. Recipe Finder is a game changer!',
  },
  {
    name: 'Alex Brown',
    title: 'Professional Chef',
    text: 'As a chef, I’m constantly looking for new inspiration. Recipe Finder has been a valuable tool in my kitchen.',
  },
  {
    name: 'Sarah Lee',
    title: 'Health Enthusiast',
    text: 'This app helps me find healthy recipes quickly and easily. I’m always discovering new ways to stay fit with great food.',
  },
  {
    name: 'David Kim',
    title: 'Busy Parent',
    text: 'With three kids, meal planning can be a hassle. Recipe Finder makes it so much easier to stay organized.',
  },
];

const TestimonialsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(totalSlides / 3));
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const getVisibleTestimonials = () => {
    const start = currentSlide * 3;
    return testimonials.slice(start, start + 3);
  };

  return (
    <section className="py-10 bg-orange-100 text-stone-800 px-5">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What People Are Saying</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div 
              key={index} 
              className="w-full sm:w-1/3 bg-white p-6 rounded shadow-lg mb-4 sm:mb-4"
            >
              <p className="italic">"{testimonial.text}"</p>
              <h4 className="mt-4 font-bold">{testimonial.name}</h4>
              <p className="text-sm">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
