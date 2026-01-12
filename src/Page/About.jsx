// // import React from 'react';

// // const About = () => {
// //     return (
// //         <div>
            
// //         </div>
// //     );
// // };

// // export default About;
// import React from 'react';
// import { FaIndustry, FaGlobe, FaUsers, FaLeaf } from 'react-icons/fa';

// const About = () => {
//     return (
//         <div className="bg-white min-h-screen font-sans">
//             {/* --- Hero Section --- */}
//             <div className="relative bg-slate-900 py-24 px-6 text-center">
//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <img 
//                         src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=80" 
//                         alt="Background" 
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//                 <div className="relative z-10">
//                     <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
//                         Crafting Excellence <span className="text-blue-500">Since 2005</span>
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//                         Leading the textile industry with a commitment to quality, innovation, and sustainable fashion for global brands.
//                     </p>
//                 </div>
//             </div>

//             {/* --- Mission & Vision --- */}
//             <div className="max-w-7xl mx-auto px-6 py-20">
//                 <div className="grid md:grid-cols-2 gap-16 items-center">
//                     <div className="space-y-6">
//                         <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Our Mission</h2>
//                         <p className="text-gray-600 text-lg leading-relaxed">
//                             To deliver world-class apparel solutions by integrating cutting-edge technology with traditional craftsmanship. We aim to empower our clients through high-quality manufacturing while ensuring the welfare of our skilled artisans.
//                         </p>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                                 <FaIndustry className="text-blue-600 text-2xl" />
//                                 <span className="font-semibold text-gray-700">Modern Tech</span>
//                             </div>
//                             <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                                 <FaLeaf className="text-green-600 text-2xl" />
//                                 <span className="font-semibold text-gray-700">Eco Friendly</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="relative">
//                         <img 
//                             src="https://i.ibb.co.com/99pvv8tV/premium-photo-1681823291555-5eff16619bc9.avif" 
//                             alt="Factory Floor" 
//                             className="rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-500"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* --- Stats Section --- */}
//             <div className="bg-blue-600 py-16">
//                 <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
//                     <div className="space-y-2">
//                         <h3 className="text-4xl font-bold uppercase">500+</h3>
//                         <p className="text-blue-100 font-medium">Skilled Employees</p>
//                     </div>
//                     <div className="space-y-2">
//                         <h3 className="text-4xl font-bold uppercase">20+</h3>
//                         <p className="text-blue-100 font-medium">Global Markets</p>
//                     </div>
//                     <div className="space-y-2">
//                         <h3 className="text-4xl font-bold uppercase">1.2M</h3>
//                         <p className="text-blue-100 font-medium">Annual Production</p>
//                     </div>
//                     <div className="space-y-2">
//                         <h3 className="text-4xl font-bold uppercase">99%</h3>
//                         <p className="text-blue-100 font-medium">Client Satisfaction</p>
//                     </div>
//                 </div>
//             </div>

//             {/* --- Core Values --- */}
//             <div className="max-w-7xl mx-auto px-6 py-20">
//                 <div className="text-center mb-16">
//                     <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
//                     <p className="text-gray-500 mt-2">The pillars that make us a leader in the garment industry.</p>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     <div className="p-10 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white group">
//                         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
//                             <FaGlobe size={30} className="text-blue-600 group-hover:text-white" />
//                         </div>
//                         <h4 className="text-xl font-bold text-gray-800 mb-4">International Standards</h4>
//                         <p className="text-gray-600">We adhere to global compliance and safety regulations, ensuring every stitch meets high-end quality benchmarks.</p>
//                     </div>
//                     <div className="p-10 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white group">
//                         <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors">
//                             <FaUsers size={30} className="text-orange-600 group-hover:text-white" />
//                         </div>
//                         <h4 className="text-xl font-bold text-gray-800 mb-4">Dedicated Team</h4>
//                         <p className="text-gray-600">Our workforce is our strength. We invest in continuous training to keep our team ahead of industry trends.</p>
//                     </div>
//                     <div className="p-10 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white group">
//                         <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors">
//                             <FaLeaf size={30} className="text-green-600 group-hover:text-white" />
//                         </div>
//                         <h4 className="text-xl font-bold text-gray-800 mb-4">Sustainability</h4>
//                         <p className="text-gray-600">Committed to a greener future, we use water-efficient processes and eco-friendly materials in our production.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default About;
import React from 'react';
import { FaIndustry, FaGlobe, FaUsers, FaLeaf } from 'react-icons/fa';

const About = () => {
    return (
        /* ১. মেইন কন্টেইনার ডার্ক মোড সাপোর্ট */
        <div className="bg-white dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
            
            {/* --- Hero Section --- */}
            <div className="relative bg-slate-900 py-24 px-6 text-center">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    <img 
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Crafting Excellence <span className="text-blue-500">Since 2005</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Leading the textile industry with a commitment to quality, innovation, and sustainable fashion for global brands.
                    </p>
                </div>
            </div>

            {/* --- Mission & Vision --- */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 border-l-4 border-blue-600 pl-4 transition-colors">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            To deliver world-class apparel solutions by integrating cutting-edge technology with traditional craftsmanship. We aim to empower our clients through high-quality manufacturing while ensuring the welfare of our skilled artisans.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                                <FaIndustry className="text-blue-600 dark:text-blue-400 text-2xl" />
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Modern Tech</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
                                <FaLeaf className="text-green-600 dark:text-green-400 text-2xl" />
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Eco Friendly</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img 
                            src="https://i.ibb.co.com/99pvv8tV/premium-photo-1681823291555-5eff16619bc9.avif" 
                            alt="Factory Floor" 
                            className="rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-500 dark:shadow-gray-800/50"
                        />
                    </div>
                </div>
            </div>

            {/* --- Stats Section --- */}
            <div className="bg-blue-600 dark:bg-blue-700 py-16 transition-colors">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold uppercase">500+</h3>
                        <p className="text-blue-100 font-medium">Skilled Employees</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold uppercase">20+</h3>
                        <p className="text-blue-100 font-medium">Global Markets</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold uppercase">1.2M</h3>
                        <p className="text-blue-100 font-medium">Annual Production</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold uppercase">99%</h3>
                        <p className="text-blue-100 font-medium">Client Satisfaction</p>
                    </div>
                </div>
            </div>

            {/* --- Core Values --- */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
                        Why Choose Us?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        The pillars that make us a leader in the garment industry.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="p-10 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white dark:bg-gray-800 group">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                            <FaGlobe size={30} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">International Standards</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                            We adhere to global compliance and safety regulations, ensuring every stitch meets high-end quality benchmarks.
                        </p>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="p-10 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white dark:bg-gray-800 group">
                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors">
                            <FaUsers size={30} className="text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Dedicated Team</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our workforce is our strength. We invest in continuous training to keep our team ahead of industry trends.
                        </p>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="p-10 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center bg-white dark:bg-gray-800 group">
                        <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors">
                            <FaLeaf size={30} className="text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Sustainability</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                            Committed to a greener future, we use water-efficient processes and eco-friendly materials in our production.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;