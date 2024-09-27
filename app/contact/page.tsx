import React from 'react';

export default function ContactPage() {
  return (
    <div className="py-10 text-stone-800">

      <div className="max-w-7xl mx-auto bg-stone-100 p-8 shadow-lg rounded-lg">

        <h1 className="text-4xl font-bold text-center mb-8 text-stone-800">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
              <p>
                Have any questions or feedback? Feel free to reach out to us via email or phone, or drop us a message using the form.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12v3a4 4 0 01-4 4H8m8-11V5a4 4 0 00-4-4H8m8 0a4 4 0 014 4v3m0 0h-4m-4 4v1a1 1 0 001 1h2m0 0a1 1 0 01-1 1H9a1 1 0 01-1-1v-1m4-4V5m0 4h4m-4 4h2m0 0a1 1 0 011-1H9a1 1 0 00-1 1h4" />
                  </svg>
                </span>
                <span>contact@recipeapp.com</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1.75 9.68c.2 1.14.5 2.15 1.06 3.32C6.57 24.5 7.5 24.89 9 25h6c1.5-.11 2.43-.5 3.19-1.05.55-1.16.86-2.17 1.06-3.31L21 10H3zM8 4a4 4 0 118 0H8z" />
                  </svg>
                </span>
                <span>+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.25a4 4 0 00-4 4v7a4 4 0 004 4h14a4 4 0 004-4v-7a4 4 0 00-4-4H3z" />
                  </svg>
                </span>
                <span>123 Recipe St, Cookville, Foodland</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
