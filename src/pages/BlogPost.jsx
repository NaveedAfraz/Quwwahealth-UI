import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBlogPosts } from './Blogs'; // Assuming you export this from Blogs.jsx
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';

import authorImage from '../assets/images/AboutUs/team1.jpeg'; // Placeholder author image

// You'll need to export allBlogPosts from Blogs.jsx
// export const allBlogPosts = [ ... ];

const BlogPost = () => {
  const { id } = useParams();
  const post = allBlogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Post not found!</h1>
        <Link to="/blogs" className="text-blue-500 mt-4 inline-block">Back to Blogs</Link>
      </div>
    );
  }

  // Enhanced mock data for this specific view
  const detailedPost = {
    ...post,
    category: 'Health & Wellness',
    author: {
      name: 'Tamás Hám-Szabó',
      title: 'Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool.',
      bio: `With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`,
      image: authorImage,
      linkedin: '#',
    },
    meta: {
      title: 'School-Based Fitness Programs | Building Lifelong Health in Students',
      description: `Discover how school-based fitness programs improve children's physical health, mental well-being, and long-term habits. Learn why early physical education matters.`,
    },
    headings: [
      { id: 'physical-health-starts-early', title: 'Physical Health Starts Early' },
      { id: 'mental-health-benefits', title: 'Mental Health Benefits' },
      { id: 'academic-improvement', title: 'Academic Improvement' },
      { id: 'habit-formation', title: 'Habit Formation That Lasts' },
      { id: 'equal-access', title: 'Equal Access to Health' },
    ],
    content: `
      <h1 class="text-4xl font-bold mt-8 mb-4">Why School-Based Fitness Programs Are Key to Lifelong Health</h1>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        In today’s screen-heavy, sedentary lifestyle, schools hold the power to influence the future of public health.
        School-based fitness programs serve as a vital foundation for lifelong health by fostering physical, emotional, and cognitive development in students from an early age.
      </p>
  
      <h2 id="physical-health-starts-early" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Physical Health Starts Early</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Childhood is a critical period for developing strength, endurance, coordination, and flexibility. Structured physical education in schools ensures consistent exposure to these activities. 
        Programs like Alpro Health & Fitness incorporate age-appropriate aerobic exercises, strength training routines, balance challenges, and stretching techniques that promote muscular and skeletal development.
        Regular participation not only enhances daily energy levels but also reduces the risk of childhood obesity, diabetes, and cardiovascular issues.
      </p>
  
      <h2 id="mental-health-benefits" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Mental Health Benefits</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Physical activity stimulates the release of endorphins and reduces cortisol levels, helping children manage stress and anxiety. 
        Incorporating student wellness programs that include movement, mindfulness, and group activities can improve mood, boost self-esteem, and support emotional regulation.
        In inclusive and supportive fitness environments, students feel safer, more connected, and more motivated to participate in school life.
      </p>
  
      <h2 id="academic-improvement" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Academic Improvement</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Research consistently shows that physically active students perform better academically. 
        Movement increases blood flow to the brain, enhancing focus, memory retention, and problem-solving abilities. 
        By embedding PE and fitness assessments into the curriculum, schools create a feedback loop that supports both cognitive and physical progress.
        Even short bouts of activity, like classroom fitness breaks or morning exercises, can significantly improve attention spans and learning outcomes.
      </p>
  
      <h2 id="habit-formation" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Habit Formation That Lasts</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Children who engage in daily movement are more likely to carry those habits into adulthood. 
        Consistent participation in school fitness programs fosters routine, discipline, and an understanding of long-term health maintenance. 
        Programs that emphasize enjoyment, personal goal setting, and self-monitoring help build intrinsic motivation for lifelong physical activity.
      </p>
  
      <h2 id="equal-access" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Equal Access to Health</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Not every family has access to extracurricular fitness programs, safe play areas, or sports facilities. 
        School-based programs level the playing field by providing equitable access to structured physical activity. 
        Every child, regardless of background, benefits from a consistent and supportive physical education environment.
      </p>
  
      <p class="text-lg text-gray-700 leading-relaxed mt-8">
        <strong>Conclusion:</strong> Quwwa Health delivers structured, inclusive fitness programs and comprehensive health assessments that empower schools to nurture healthy, active, and engaged students. 
        We believe investing in school fitness is investing in a healthier future.
      </p>
    `,
  };
  const [activeId, setActiveId] = useState(null);
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -100; // Adjust based on navbar height
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id); // Highlight the link on click
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      for (const heading of detailedPost.headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top >= 0 && top <= 150) {
            setActiveId(heading.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detailedPost.headings]);
  return (
    <div className="bg-[#F3F6F1] py-16 px-4 sm:px-6 lg:px-8  bg-gradient-to-r from-white to-green-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main Content */}
        <main className="lg:col-span-2">
          {/* Featured Image and Title */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img src={detailedPost.image} alt={detailedPost.title} className="w-full h-auto md:h-[450px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">{detailedPost.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">{detailedPost.title}</h1>
              <p className="mt-3 text-gray-300">{detailedPost.date} • {detailedPost.readTime}</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: detailedPost.content }} />
        </main>

        {/* Sidebar */}
        <aside className="space-y-8 sticky top-24 h-screen">
          {/* Author Card */}
          <div className="bg-[#3D22CF] text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4">
              <img src={detailedPost.author.image} alt={detailedPost.author.name} className="w-20 h-20 rounded-lg  border-2 border-white" />
              <div>
                <h3 className="font-bold text-xl">Rahil Khan</h3>
                <a href={detailedPost.author.linkedin} className="text-blue-300 hover:text-white transition-colors"><FaLinkedinIn className="inline" /></a>
              </div>
            </div>
            <p className="mt-4 text-blue-100 text-sm">Founder of Quwwa Health</p>
            <p className="mt-4 text-blue-100 text-sm"><p>
          </div>

          {/* Share Card */}
          <div className="bg-[#0A1C8F] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg">Share with your community!</h3>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaFacebookF /></a>
              <a href="https://x.com/Quwwahealth?t=ZXp9QQMRDKK-DECQhXtFiQ&s=09" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaTwitter /></a>
              <a href="https://www.instagram.com/quwwahealth?igsh=MXVyYTllbjE0bTFucw==" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* In this article */}
          <div className="p-6 rounded-2xl bg-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">In this article</h3>
            <ul className="space-y-3">
              {detailedPost.headings.map((heading) => (
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

        </aside>

      </div>
    </div>
  );
};

export default BlogPost; 