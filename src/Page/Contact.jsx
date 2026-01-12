import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Contact() {
    const  handelmessge=()=> {
        toast('Message successfully send ')
    }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-900 rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        
        {/* Info Side */}
        <div className="bg-gradient-to-r from-teal-400 via-indigo-500 to-indigo-500 p-12 lg:p-20 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black uppercase italic leading-none mb-6">Let's Talk <br/> Business</h2>
            <p className="text-indigo-100 font-medium">Our support team is available 24/7 for factory inquiries.</p>
          </div>
          
          <div className="space-y-8 mt-10">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md"><Mail size={24}/></div>
              <p className="font-bold">hello@factory.com</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md"><Phone size={24}/></div>
              <p className="font-bold">+880 1234 567 890</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 lg:p-20">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 ring-indigo-500 outline-none dark:text-white" />
              <input type="text" placeholder="Last Name" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 ring-indigo-500 outline-none dark:text-white" />
            </div>
            <input type="email" placeholder="Work Email" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 ring-indigo-500 outline-none dark:text-white" />
            <textarea rows="4" placeholder="How can we help?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 ring-indigo-500 outline-none dark:text-white"></textarea>
            <button onClick={handelmessge} className="w-full bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-700 transition">
              Send Message <Send size={20}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}