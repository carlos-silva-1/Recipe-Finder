'use client';
import React from 'react';

const AboutPage = () => {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="container mx-auto p-8 text-stone-800">
          <h1 className="text-4xl font-bold mb-4">About Recipe Finder</h1>
          <p className="text-lg mb-6">
            Welcome to Recipe Finder, your go-to app for discovering, saving, and sharing your favorite recipes. Whether you’re an experienced cook or a novice in the kitchen, our app is designed to help you explore a wide variety of recipes, from simple meals to gourmet dishes.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-md mb-4">
            Our mission is to make cooking more accessible and enjoyable for everyone. We provide a platform where users can search for recipes, save their favorite ones, and explore new flavors. We believe cooking should be fun, creative, and a shared experience with loved ones.
          </p>

          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <p className="text-md mb-4">
            Simply create an account to start saving your favorite recipes. Our app allows you to search for a wide variety of dishes, keep track of your favorites, and even share your own recipes with others. As you discover new dishes, you can easily add them to your favorites list for easy access later.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Favorite Recipes</h2>
          <p className="text-md mb-4">
            Keep track of your culinary journey by saving your favorite recipes in one convenient place. You can always come back to them and rediscover what you loved.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Recipe Instructions</h2>
          <p className="text-md mb-4">
            Click on any recipe from the search results or your favorites list to see detailed instructions, ingredients, and equipment needed to create delicious meals.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
