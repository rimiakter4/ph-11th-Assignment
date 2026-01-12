import React from 'react';

const FaqSection = () => {
   return (
        

    <div className="py-28  bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group border-b border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-slate-800 rounded-lg">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none dark:text-white">
              <span>How do I track my garment production status?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="Stack6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-3 group-open:animate-fadeIn">
              You can track your order in real-time through the "My Orders" tab in your dashboard. We update statuses from cutting to delivery.
            </p>
          </details>

          <details className="group border-b border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-slate-800 rounded-lg">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none dark:text-white">
              <span>Is there a mobile app for GarmentFlow?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-3 group-open:animate-fadeIn">
              Currently, we have a fully responsive web application. You can use it on any mobile browser with ease.
            </p>
          </details>
        </div>
      </div>
    </div>
  );

};

export default FaqSection;