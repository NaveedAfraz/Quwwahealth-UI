import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import quwwaLogo from '../assets/images/header.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatContainerRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Pre-defined FAQ questions and answers
  const faqData = {
    "What is Quwwa Health?": "Quwwa Health is a wellness company helping schools promote student health through PE, fitness assessments, nutrition, and wellness programs.",
    "Tell me about the Alpro Health & Fitness Program.": "It's our flagship school program that combines structured PE sessions, student fitness assessments, healthy lifestyle education, and sports coaching.",
    "How does your school health program work?": "We assess each child's physical health through age-appropriate fitness tests and provide schools and parents with detailed health report cards.",
    "What are the benefits for schools?": "Our program supports NEP 2020, improves student health, builds school reputation, and requires minimal school effort—we handle staff, tools, and training.",
    "What makes Quwwa Health different?": "We offer end-to-end wellness solutions aligned with WHO standards, including data-backed assessments, certified staff, and custom programs.",
    "What kind of health assessments do you do for kids?": "We check BMI, posture, strength, endurance, balance, flexibility, and more—depending on the child's age group.",
    "What does the student fitness report include?": "It includes physical fitness scores, growth markers, and personalized recommendations for improvement.",
    "How often are assessments conducted?": "Either once or twice a year, based on the school's chosen package.",
    "What parameters are tracked in the report card?": "BMI, endurance, strength, flexibility, balance, posture, and sport skills (for senior classes).",
    "Can you explain your PE and sports program?": "We provide regular PE classes, multi-sport sessions, and certified sports coaching aligned with global standards like SHAPE America.",
    "What is the cost per student?": "It varies depending on the package and number of assessments. For more info Email us at info@quwwahealth.com or call +91 8770922310.",
    "What age groups do you cover?": "Our programs cover Nursery to Class 12 with age-appropriate structure.",
    "Do you provide equipment and staff?": "Yes, all coaching staff and equipment are provided by Quwwa Health.",
    "What sports do you offer coaching for?": "Football, Cricket, Table Tennis, Athletics, Yoga, Judo, Karate, and more—depending on school interest.",
    "Do you organize inter-school events?": "Yes, we plan and execute sports days, tournaments, and branded fitness events.",
    "How can our school host a sports day with Quwwa Health?": "Just contact us—we'll manage the entire event from planning to execution.",
    "Are your coaches certified?": "Absolutely. All our coaches are certified professionals trained to work with children.",
    "What is your healthy canteen initiative?": "We guide schools to build clean, balanced menus and promote healthy eating habits through awareness activities.",
    "Do you help schools plan menus?": "Yes, our team includes nutritionists who assist in designing healthy canteen options.",
    "Can students learn about nutrition?": "Yes, we conduct nutrition workshops, awareness campaigns, and sugar awareness programs.",
    "Is there a sugar awareness program?": "Yes! We visually display sugar content in common foods and educate kids on making better choices.",
    "How does this help improve academics?": "Fit and active students have better focus, memory, and academic performance.",
    "Will this support NEP 2020 guidelines?": "100%. Our programs are built to align with NEP 2020's focus on holistic student development.",
    "Do you provide data to share with parents?": "Yes, each child's fitness report is shared with both school and parents.",
    "Do you offer sponsorship opportunities?": "Yes, brands can sponsor events, camps, or school-wide programs with logo visibility and engagement.",
    "Can brands partner with Quwwa Health?": "Absolutely! We welcome CSR-aligned partners looking to support school wellness.",
    "How does CSR align with your programs?": "Our programs meet CSR goals for health, education, and child development—plus measurable impact reports.",
    "What kind of holiday camps do you run?": "Our camps blend fitness, creativity, sports, and life skills into fun, safe summer or winter break programs.",
    "What activities are included in summer camp?": "Multi-sport games, DIY crafts, team challenges, yoga, fitness circuits, and creative workshops.",
    "How can we book a holiday camp at our school?": "Just drop us a message—we'll handle planning, staffing, and setup for your school.",
    "How do we get started?": "Book a demo or call us directly. We'll customize the program for your school.",
    "Can I see a sample report?": "Yes! We'll send you a digital sample upon request. Email us at info@quwwahealth.com or call +91 8770922310.",
    "Do you visit the school or run online programs?": "We provide on-site implementation for physical assessments and coaching.",
    "How do we schedule a demo?": "Email us at info@quwwahealth.com or call +91 8770922310 to schedule one today."
  };

  // Suggested questions to show initially
  const suggestedQuestions = [
    "What is Quwwa Health?",
    "Tell me about the Alpro Health & Fitness Program.",
    "How does your school health program work?"
  ];

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Create the system prompt with FAQ data
      const systemPrompt = `You are the Quwwa Health Assistant, a helpful AI assistant for Quwwa Health - a wellness company that helps schools promote student health through PE, fitness assessments, nutrition, and wellness programs.

Here is our FAQ database with questions and answers:

${Object.entries(faqData).map(([question, answer]) => `Q: ${question}\nA: ${answer}`).join('\n\n')}

Instructions:
1. If the user's question matches or is related to any of the FAQ questions above, provide the exact answer from the FAQ.
2. If the user asks about something not covered in the FAQ, provide a helpful response based on your knowledge about Quwwa Health's services.
3. Keep responses concise and professional.
4. Always maintain a friendly and helpful tone.
5. If the user asks about contact information, always provide: Email us at info@quwwahealth.com or call +91 8770922310.

User's question: ${input}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages((prev) => [...prev, { sender: 'bot', text }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    // Automatically send the suggested question
    const userMessage = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Use the same LLM approach for suggested questions
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const systemPrompt = `You are the Quwwa Health Assistant, a helpful AI assistant for Quwwa Health - a wellness company that helps schools promote student health through PE, fitness assessments, nutrition, and wellness programs.

Here is our FAQ database with questions and answers:

${Object.entries(faqData).map(([question, answer]) => `Q: ${question}\nA: ${answer}`).join('\n\n')}

Instructions:
1. If the user's question matches or is related to any of the FAQ questions above, provide the exact answer from the FAQ.
2. If the user asks about something not covered in the FAQ, provide a helpful response based on your knowledge about Quwwa Health's services.
3. Keep responses concise and professional.
4. Always maintain a friendly and helpful tone.
5. If the user asks about contact information, always provide: Email us at info@quwwahealth.com or call +91 8770922310.

User's question: ${question}`;

    model.generateContent(systemPrompt)
      .then(result => result.response.text())
      .then(text => {
        setMessages((prev) => [...prev, { sender: 'bot', text }]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Gemini API error:', error);
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Chat Bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#54BD95] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-110"
        >
          {isOpen ? <FiX size={28} /> : <FiMessageSquare size={28} />}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-28 right-8 z-50 w-96 bg-white rounded-2xl shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#54BD95] p-4 rounded-t-2xl flex items-center gap-4">
            <img src={quwwaLogo} alt="Quwwa Health" className="h-8 bg-white p-1 rounded-md" />
            <div>
                <h3 className="font-bold text-white text-lg">Quwwa Health Assistant</h3>
                <p className="text-xs text-green-100">Powered by Gemini</p>
            </div>
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="h-96 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-100 text-[#191A15] rounded-bl-none">
                Hello! I am the Quwwa Health assistant. How can I help you today?
            </div>
          </div>
          
          {/* Suggested Questions */}
          {showSuggestions && messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Quick questions:</p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="block w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-[#191A15] rounded-bl-none'
                    : 'bg-green-500 text-white rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
                 <div className="bg-gray-100 text-[#A6A6A6] px-4 py-2 rounded-2xl rounded-bl-none">
                    Typing...
                 </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="w-full px-4 py-2 bg-gray-100 rounded-full border-transparent focus:outline-none focus:ring-2 focus:ring-[#54BD95]"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-[#54BD95] text-white p-3 rounded-full hover:bg-green-600 disabled:bg-gray-300"
            disabled={isLoading || !input.trim()}
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot; 