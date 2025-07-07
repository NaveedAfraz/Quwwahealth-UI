import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import blogImage1 from '../assets/images/Blogs/blog1.png';
import blogImage2 from '../assets/images/Blogs/blog2.png';
import blogImage3 from '../assets/images/Blogs/blog3.png';
import blogImage4 from '../assets/images/Blogs/blog4.png';

export const allBlogPosts = [
  {
    id: 1,
    title: 'Why School-Based Fitness Builds Lifelong Health',
    image: blogImage1,
    readTime: '5 Min',
    date: 'July 7, 2025',
    excerpt: 'Discover how structured school fitness programs improve children’s physical, mental, and academic development — and why early movement matters for lifelong wellness.'
  },
  {
    id: 2,
    title: 'The Rise of School Sports Programs',
    image: blogImage2,
    readTime: '5 Min',
    date: 'August 19, 2022',
    excerpt: 'Exploring the growing importance of structured sports programs in educational institutions and their benefits.'
  },
  {
    id: 3,
    title: 'Nutrition for Young Athletes',
    image: blogImage3,
    readTime: '6 Min',
    date: 'August 19, 2022',
    excerpt: 'A guide to essential nutritional practices that help young athletes perform their best and stay healthy.'
  },
  {
    id: 4,
    title: 'Teamwork and Leadership in Sports',
    image: blogImage4,
    readTime: '4 Min',
    date: 'August 19, 2022',
    excerpt: 'How participating in team sports fosters crucial life skills like teamwork, leadership, and resilience in students.'
  },
];

const Blogs = () => {
  const [featuredPost, setFeaturedPost] = useState(allBlogPosts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = allBlogPosts.findIndex(p => p.id === featuredPost.id);
      const nextIndex = (currentIndex + 1) % allBlogPosts.length;
      setFeaturedPost(allBlogPosts[nextIndex]);
    }, 5000); // Change blog post every 5 seconds

    return () => clearInterval(interval);
  }, [featuredPost]);

  const otherPosts = allBlogPosts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="bg-[#F9F6F1] text-[#1E1E1E] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold">Blog</h1>
          <p className="text-lg text-[#848383] mt-4">Get the latest insights about Health & Fitness</p>
        </div>

        {/* Featured Blog Post */}
        <div className="mb-16">
          <Link to={`/blog/${featuredPost.id}`} className="block group">
            <div className="overflow-hidden rounded-lg">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-96 object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-3xl font-bold mt-6 group-hover:text-gray-700">{featuredPost.title}</p>
            <p className="text-[#A6A6A6] mt-2 text-sm">{featuredPost.readTime} • {featuredPost.date}</p>
          </Link>
        </div>

        {/* Other Blog Posts */}
        <div className="space-y-8">
          {otherPosts.map((post) => (
            <article key={post.id} className="border-t border-gray-200 pt-8">
              <Link to={`/blog/${post.id}`} className="group">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-full sm:w-48 flex-shrink-0">
                    <div className="overflow-hidden rounded-lg">
                      <img src={post.image} alt={post.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-2xl font-bold group-hover:text-gray-700">{post.title}</p>
                    <p className="text-[#A6A6A6] mt-2 text-sm">{post.readTime} • {post.date}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-16">
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Load More
            </button>
        </div>

      </div>
    </div>
  );
};

export default Blogs; 