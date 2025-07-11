import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import blogImage1 from '../assets/images/Hero/10.jpg';
import blogImage2 from '../assets/images/Hero/11.jpg';
import blogImage3 from '../assets/images/Hero/12 1.jpg';
import blogImage4 from '../assets/images/Hero/ChatGPT Image Apr 14, 2025, 04_24_06 PM 1.jpg';
 

/**
 * Note: This is a combined data structure. 
 * The detailed information has been merged into the first post.
 * You can follow this pattern to add detailed content for the other posts.
 */
 
/**
 * Note: This is a combined data structure. 
 * The detailed information has been merged into the first post.
 * You can follow this pattern to add detailed content for the other posts.
 */
export const allBlogPosts = [
  {
    // --- Basic Info ---
    id: 1,
    title: 'Why School-Based Fitness Builds Lifelong Health',
    image: blogImage1,
    readTime: '5 Min',
    date: 'July 7, 2025',

    // --- Detailed Content (Merged) ---
    category: 'Health & Wellness',
    author: {
      name: 'Tamás Hám-Szabó',
      title: 'Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool.',
      bio: `With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`,
      image: blogImage1,
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
  },
  {
    id: 2,
    title: 'How Fitness Impacts Focus: The Link Between Movement and Academic Performance',
    image: blogImage2,
    readTime: '5 Min',
    date: 'August 19, 2022',
    // --- Detailed Content (Added) ---
    category: 'Academic Performance',
    author: {
      name: 'Tamás Hám-Szabó',
      title: 'Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool.',
      bio: `With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`,
      image: blogImage2,
      linkedin: '#',
    },
    meta: {
      title: 'How Fitness Improves Focus and Learning in Students',
      description: 'Learn how physical activity enhances concentration, memory, and academic performance in school-aged children.',
    },
    headings: [
        { id: 'improved-concentration', title: 'Improved Concentration and Attention' },
        { id: 'enhanced-memory', title: 'Enhanced Memory and Learning Capacity' },
        { id: 'emotional-regulation', title: 'Better Emotional Regulation in Class' },
        { id: 'brain-development', title: 'Support for Brain Development' },
    ],
    content: `
      <h1 class="text-4xl font-bold mt-8 mb-4">How Fitness Impacts Focus: The Link Between Movement and Academic Performance</h1>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Physical activity is a proven cognitive enhancer. By stimulating brain function, improving mood, and reducing distractions, school-based fitness plays a crucial role in the academic success of children.
      </p>
 
      <h2 id="improved-concentration" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Improved Concentration and Attention</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Exercise boosts neurotransmitter levels like dopamine and norepinephrine, which are directly linked to attention and alertness. Students participating in school-based fitness programs demonstrate better focus and are more engaged during lessons. Activities like team sports, dance, and structured play also teach students how to listen, follow directions, and stay task-oriented.
      </p>
 
      <h2 id="enhanced-memory" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Enhanced Memory and Learning Capacity</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Aerobic activity increases blood flow to the brain, enhancing memory retention and neural plasticity. Incorporating structured PE activities and active learning breaks can improve a student's ability to absorb and retain information, especially in subjects requiring concentration like math, science, and reading.
      </p>
 
      <h2 id="emotional-regulation" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Better Emotional Regulation in Class</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Physical activity helps regulate emotions and reduce impulsivity. Students who participate in regular movement are less likely to exhibit disruptive behaviors and more likely to remain calm under stress. Our Alpro Health & Fitness programs include mindfulness elements that help children manage frustration and anxiety in academic settings.
      </p>
 
      <h2 id="brain-development" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Support for Brain Development</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Movement and motor skill development in early childhood directly impact brain structure and function. Regular physical education supports the development of executive functions—such as working memory, flexible thinking, and self-control—which are essential for academic achievement.
      </p>
 
      <p class="text-lg text-gray-700 leading-relaxed mt-8">
        <strong>Conclusion:</strong> At Quwwa Health, we create school fitness programs that promote both academic excellence and lifelong wellness. By integrating fitness into education, we help schools build students who are not just smarter—but stronger, calmer, and more focused.
      </p>
    `,
  },
  {
    id: 3,
    title: 'Understanding BMI and Fitness Metrics in Children: What Schools and Parents Should Know',
    image: blogImage3,
    readTime: '6 Min',
    date: 'August 19, 2022',
    // --- Detailed Content (Added) ---
    category: 'Fitness Metrics',
    author: {
      name: 'Tamás Hám-Szabó',
      title: 'Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool.',
      bio: `With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`,
      image: blogImage3,
      linkedin: '#',
    },
    meta: {
      title: 'BMI and Fitness Assessments for Children | A Guide for Schools & Parents',
      description: 'Learn what BMI means for kids, how fitness assessments work, and how schools can track student health effectively.',
    },
    headings: [
      { id: 'what-is-bmi', title: 'What is BMI?' },
      { id: 'why-tracking-matters', title: 'Why BMI and Fitness Tracking Matter' },
      { id: 'beyond-bmi', title: 'Beyond BMI: A Holistic Fitness Profile' },
      { id: 'data-driven-action', title: 'Data-Driven Action Plans' },
    ],
    content: `
      <h1 class="text-4xl font-bold mt-8 mb-4">Understanding BMI and Fitness Metrics in Children</h1>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Tracking student health starts with clear, accurate, and child-appropriate measurements. BMI and other physical fitness metrics help schools and parents identify early signs of risk and promote healthier habits.
      </p>

      <h2 id="what-is-bmi" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">What is BMI?</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        BMI, or Body Mass Index, is a simple calculation using a child's height and weight to estimate body fat levels. It categorizes students into underweight, healthy weight, overweight, or obese ranges. While it doesn't measure body fat directly, it provides a useful screening tool for schools to monitor growth trends and intervene early.
      </p>

      <h2 id="why-tracking-matters" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Why BMI and Fitness Tracking Matter</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Early detection of weight-related concerns allows for timely support and intervention. Routine school health assessments empower educators and parents to recognize unhealthy trends before they become long-term issues. Monitoring BMI alongside other fitness indicators creates a fuller picture of a child’s physical development.
      </p>

      <h2 id="beyond-bmi" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Beyond BMI: A Holistic Fitness Profile</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        A complete student fitness profile includes measurements of cardiovascular endurance, muscular strength, flexibility, balance, and coordination. Our fitness assessments at Quwwa Health are age-appropriate, non-competitive, and focused on individual progress, not comparison. This approach encourages participation and builds confidence.
      </p>

      <h2 id="data-driven-action" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Data-Driven Action Plans</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Schools can use this data to tailor PE classes and design effective health programs. Reports from the Alpro Health & Fitness system provide insights for PE teachers, school leaders, and parents to identify strengths, target weak areas, and track improvements throughout the year.
      </p>

      <p class="text-lg text-gray-700 leading-relaxed mt-8">
        <strong>Conclusion:</strong> Quwwa Health delivers comprehensive fitness and health assessment tools that help schools take a proactive approach to student wellness. With the right data, every child can receive the support they need to grow stronger and healthier.
      </p>
    `,
  },
  {
    id: 4,
    title: 'Building a Health-Promoting School: Practical Steps for Educators and Administrators',
    image: blogImage4,
    readTime: '4 Min',
    date: 'August 19, 2022',
    // --- Detailed Content (Added) ---
    category: 'School Policy',
    author: {
      name: 'Tamás Hám-Szabó',
      title: 'Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool.',
      bio: `With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`,
      image: blogImage4,
      linkedin: '#',
    },
    meta: {
      title: 'How to Build a Health-Promoting School | Practical Guide',
      description: 'A step-by-step guide for educators to create health-promoting schools through fitness, nutrition, and wellness policies.',
    },
    headings: [
      { id: 'structured-fitness', title: 'Start with Structured Fitness' },
      { id: 'mental-wellness', title: 'Embed Mental Wellness' },
      { id: 'prioritize-nutrition', title: 'Prioritize Nutrition' },
      { id: 'engage-community', title: 'Engage Teachers and Parents' },
      { id: 'data-driven-policy', title: 'Use Fitness Data to Drive Policy' },
    ],
    content: `
      <h1 class="text-4xl font-bold mt-8 mb-4">Building a Health-Promoting School: Practical Steps</h1>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Creating a health-promoting school is about more than just adding a fitness class—it requires a shift in culture, policies, and daily routines. Here’s how schools can lead the change:
      </p>

      <h2 id="structured-fitness" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Start with Structured Fitness</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Daily movement should be non-negotiable. Implement school-based fitness programs that include aerobic, strength, and coordination activities. Use PE assessments to track participation and growth, and adjust programming based on student needs.
      </p>

      <h2 id="mental-wellness" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Embed Mental Wellness</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Mental and emotional health are just as critical as physical fitness. Integrate wellness programs that include mindfulness sessions, emotional literacy lessons, and social-emotional learning. These tools help students build resilience, focus, and healthy relationships.
      </p>

      <h2 id="prioritize-nutrition" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Prioritize Nutrition</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Food fuels learning. Review canteen menus, remove ultra-processed options, and introduce whole-food choices. The Healthy Canteen Initiative from Quwwa Health offers menu planning support, nutrition education materials, and food literacy workshops for students and staff.
      </p>

      <h2 id="engage-community" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Engage Teachers and Parents</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The more involved adults are, the more successful the program becomes. Host teacher fitness events to model wellness for students and organize family-friendly activities like parent-child yoga, health fairs, and sports days. A whole-community approach builds momentum.
      </p>

      <h2 id="data-driven-policy" class="text-3xl font-bold mt-12 mb-4 scroll-mt-20">Use Fitness Data to Drive Policy</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Collect BMI, flexibility, strength, and endurance data to evaluate outcomes and inform health-related decisions. Establish clear wellness goals, and use year-over-year comparisons to adjust policies and resource allocation.
      </p>

      <p class="text-lg text-gray-700 leading-relaxed mt-8">
        <strong>Conclusion:</strong> Quwwa Health partners with schools to embed wellness into their DNA—through fitness, nutrition, mental health, and data-driven strategy. A health-promoting school is not just possible; it's essential for future-ready learners.
      </p>
    `,
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
      <div className="max-w-7xl mx-auto">

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
                      <img src={post.image} alt={post.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
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

        {/* <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Load More
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default Blogs; 