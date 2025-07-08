import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBlogPosts } from './Blogs'; // Assuming you export this from Blogs.jsx
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';

import authorImage from '../assets/images/AboutUs/team1.jpeg';

// --- New Component for Related Articles ---
const RelatedArticles = ({ currentPostId }) => {
  // Filter out the current post and take the next 3 articles
  const relatedPosts = allBlogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null; // Don't render the section if there are no related posts
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="p-6">
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{post.category}</span>
              <h3 className="mt-4 font-bold text-lg text-gray-900 group-hover:text-[#5D3EFF] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{post.date} • {post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Use useEffect to find the post and handle post changes when the ID parameter changes
  useEffect(() => {
    const currentPost = allBlogPosts.find((p) => p.id === parseInt(id));
    setPost(currentPost);
    // Reset scroll and active heading when post changes
    window.scrollTo(0, 0);
    setActiveId(null);
  }, [id]);


  useEffect(() => {
    if (!post || !post.headings) return;

    const handleScroll = () => {
      for (const heading of post.headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          // Adjust the range for better active state detection
          if (top >= 0 && top <= 200) {
            setActiveId(heading.id);
            return; // Exit after finding the first matching heading
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);


  const handleLinkClick = (e, headingId) => {
    e.preventDefault();
    const target = document.getElementById(headingId);
    if (target) {
      const yOffset = -100; // Adjust based on your fixed navbar height
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(headingId); // Highlight the link on click
    }
  };

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Post not found!</h1>
        <Link to="/blogs" className="text-blue-500 mt-4 inline-block">Back to Blogs</Link>
      </div>
    );
  }
  console.log(post);
  return (
    <div className="bg-[#F3F6F1] py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-green-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main Content */}
        <main className="lg:col-span-2">
          {/* Featured Image and Title */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img src={post.image} alt={post.title} className="w-full h-auto md:h-[450px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">{post.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">{post.title}</h1>
              <p className="mt-3 text-gray-300">{post.date} • {post.readTime}</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Related Articles Section */}
          <RelatedArticles currentPostId={post.id} />

        </main>

        {/* Sidebar */}
        <aside className="space-y-8 sticky top-24 h-screen">
          {/* Author Card */}
          <div className="bg-[#3D22CF] text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4">
              <img src={authorImage} alt={post.author.name} className="w-20 h-20 rounded-lg border-2 border-white" />
              <div>
                <h3 className="font-bold text-xl">Rahil Khan</h3>
                <a href="https://www.linkedin.com/in/rahilkhan2024/" className="text-blue-300 hover:text-white transition-colors"><FaLinkedinIn className="inline" /></a>
              </div>
            </div>
            <p className="mt-4 text-blue-100 text-sm">Founder of Quwwa Health</p>
            <p className="mt-4 text-blue-100 text-sm"></p>

          </div>

          {/* Share Card */}
          <div className="bg-[#0A1C8F] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg">Share with your community!</h3>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaFacebookF /></a>
              <a href="https://x.com/Quwwahealth?t=ZXp9QQMRDKK-DECQhXtFiQ&s=09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaTwitter /></a>
              <a href="https://www.instagram.com/quwwahealth?igsh=MXVyYTllbjE0bTFucw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* In this article */}
          {post.headings && post.headings.length > 0 && (
            <div className="p-6 rounded-2xl bg-white shadow-lg">
              <h3 className="font-bold text-lg mb-4">In this article</h3>
              <ul className="space-y-3">
                {post.headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => handleLinkClick(e, heading.id)}
                      className={`block pl-3 border-l-2 font-medium transition-colors
                        ${activeId === heading.id
                          ? 'text-[#5D3EFF] border-[#5D3EFF]'
                          : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-600'
                        }`}
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
};

export default BlogPost;