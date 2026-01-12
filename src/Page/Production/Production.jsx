// import { motion } from "framer-motion";
// import { FaCut, FaLayerGroup, FaCheckDouble, FaRobot, FaChartLine } from "react-icons/fa";

// export default function Production() {
//   // প্রোডাকশন স্টেপস ডাটা
//   const productionSteps = [
//     {
//       id: 1,
//       name: "Cutting Stage",
//       icon: <FaCut />,
//       status: "Running",
//       progress: 75,
//       color: "from-blue-500 to-indigo-600",
//       alert: null
//     },
//     {
//       id: 2,
//       name: "Sewing Line",
//       icon: <FaLayerGroup />,
//       status: "Delayed",
//       progress: 45,
//       color: "from-orange-400 to-red-500",
//       alert: "AI Alert: Production speed decreased by 15%"
//     },
//     {
//       id: 3,
//       name: "Finishing & QC",
//       icon: <FaCheckDouble />,
//       status: "Pending",
//       progress: 20,
//       color: "from-emerald-400 to-teal-500",
//       alert: null
//     }
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors duration-300"
//     >
//       {/* Header Section */}
//       <div className="mb-10">
//         <h2 className="text-3xl font-black uppercase tracking-tighter">
//           Production <span className="text-indigo-600">Tracking</span>
//         </h2>
//         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
//           Monitor your garment manufacturing workflow
//         </p>
//       </div>

//       {/* Production Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {productionSteps.map((step) => (
//           <div 
//             key={step.id}
//             className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
//           >
//             <div className="flex justify-between items-start mb-6">
//               <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
//                 {step.icon}
//               </div>
//               <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
//                 step.status === 'Running' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 
//                 step.status === 'Delayed' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 
//                 'bg-gray-100 text-gray-500 dark:bg-gray-700'
//               }`}>
//                 {step.status}
//               </span>
//             </div>

//             <h3 className="text-lg font-bold mb-1 tracking-tight">{step.name}</h3>
//             <p className="text-xs text-gray-400 mb-6">Real-time status tracking</p>

//             {/* Progress Bar Area */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-end">
//                 <span className="text-[10px] font-black text-gray-400 uppercase">Efficiency</span>
//                 <span className="text-sm font-black">{step.progress}%</span>
//               </div>
//               <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <motion.div 
//                   initial={{ width: 0 }}
//                   animate={{ width: `${step.progress}%` }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                   className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
//                 />
//               </div>
//             </div>

//             {/* AI Alert within Card */}
//             {step.alert && (
//               <div className="mt-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-center gap-2">
//                 <FaRobot className="text-red-500 animate-pulse" />
//                 <p className="text-[10px] font-bold text-red-600 dark:text-red-400 italic">
//                   {step.alert}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Global AI Summary Card */}
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="mt-10 p-6 rounded-[2rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group"
//       >
//         <div className="absolute top-[-20%] right-[-5%] text-white/10 text-9xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
//           <FaRobot />
//         </div>
        
//         <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
//           <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30">
//             <FaChartLine size={30} />
//           </div>
//           <div>
//             <h4 className="text-lg font-black uppercase tracking-wider">AI Production Insight</h4>
//             <p className="text-sm opacity-90 max-w-2xl leading-relaxed mt-1">
//               Based on current sewing line performance, order <span className="font-bold underline">#GF-992</span> might be delayed by 24 hours. Suggesting to reallocate 2 operators from Cutting to Sewing Stage.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaCut, FaLayerGroup, FaCheckDouble, FaRobot, FaExclamationCircle } from "react-icons/fa";

export default function Production() {
  const axiosSecure = useAxios();

  // ১. এপিআই থেকে প্রোডাকশন ডাটা নিয়ে আসা
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productionData"],
    queryFn: async () => {
      const res = await axiosSecure.get('/production'); // আপনার এপিআই এন্ডপয়েন্ট
      return res.data;
    },
  });

  // ২. যদি ডাটা না থাকে তবে এই ডিফল্ট ডাটা দেখাবে (Mock Data)
  const productionSteps = data?.length > 0 ? data : [
    { id: 1, stage: "Cutting Stage", status: "Running", progress: 85, icon: "FaCut" },
    { id: 2, stage: "Sewing Line", status: "Delayed", progress: 40, icon: "FaLayerGroup" },
    { id: 3, stage: "Finishing & QC", status: "Pending", progress: 10, icon: "FaCheckDouble" },
  ];

  // স্ট্যাটাস অনুযায়ী ডাইনামিক কালার লজিক
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'running': return 'from-blue-500 to-indigo-600';
      case 'delayed': return 'from-red-500 to-orange-600';
      case 'completed': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner text-indigo-600"></span></div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Production <span className="text-indigo-600">Live Status</span></h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time manufacturing analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productionSteps.map((step) => (
          <div key={step.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-7 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
            
            {/* Background Icon Watermark */}
            <div className="absolute -right-4 -bottom-4 text-gray-100 dark:text-gray-700/30 text-8xl group-hover:scale-110 transition-transform">
              {step.stage.includes("Cutting") ? <FaCut /> : step.stage.includes("Sewing") ? <FaLayerGroup /> : <FaCheckDouble />}
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${getStatusColor(step.status)} text-white shadow-lg`}>
                  {step.stage.includes("Cutting") ? <FaCut size={20}/> : step.stage.includes("Sewing") ? <FaLayerGroup size={20}/> : <FaCheckDouble size={20}/>}
                </div>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${step.status === 'Delayed' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                  {step.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1 tracking-tight">{step.stage}</h3>
              
              {/* Progress Section */}
              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase">Production Load</span>
                  <span className="text-lg font-black">{step.progress}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${step.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${getStatusColor(step.status)}`}
                  />
                </div>
              </div>

              {/* Dynamic AI Alert */}
              {step.status === 'Delayed' && (
                <div className="mt-6 flex items-center gap-2 text-red-500 animate-pulse">
                  <FaExclamationCircle size={14}/>
                  <p className="text-[10px] font-bold uppercase tracking-tighter">Action Required: Bottleneck Detected</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Summary/Insight */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-xl border border-white/30">
          <FaRobot size={40} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-black uppercase tracking-widest mb-2">AI Workflow Manager</h4>
          <p className="text-sm opacity-90 leading-relaxed">
            {productionSteps.some(s => s.status === 'Delayed') 
              ? `Attention! The Sewing Line is currently at ${productionSteps.find(s => s.status === 'Delayed')?.progress}% capacity. Recommending shift transfer to optimize output.`
              : "All production stages are performing within optimal parameters. Estimated completion time remains unchanged."
            }
          </p>
        </div>
        <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl">
          Optimize Line
        </button>
      </motion.div>
    </motion.div>
  );
}