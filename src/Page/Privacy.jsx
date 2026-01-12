import React from 'react';

export default function Privacy() {
  const sections = [
    { title: "1. Data Privacy", content: "We protect your data with end-to-end encryption. Only authorized admins can access manufacturing records." },
    { title: "2. Order Compliance", content: "All factory orders must comply with international labor standards. We do not tolerate unethical production." },
    { title: "3. Account Security", content: "Users are responsible for keeping their dashboard credentials secure. Any breach must be reported immediately." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase dark:text-white mb-12 italic border-l-8 border-indigo-600 pl-6">Legal <span className="text-indigo-600">Framework</span></h1>
        
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="group">
              <h3 className="text-xl font-black dark:text-gray-200 mb-4 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}