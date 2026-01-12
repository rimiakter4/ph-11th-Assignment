// import { useQuery } from "@tanstack/react-query";
// // import useAxios from "../../Hooks/useAxios";
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   LineChart, Line, PieChart, Pie, Cell 
// } from 'recharts';
// import { FaUsers, FaDollarSign, FaShoppingCart, FaBox } from "react-icons/fa";
// import useAxiosSecure from "../../../Hooks/useAxios";

// export default function DashdHome() {
//   const axiosSecure = useAxiosSecure();

//   // ১. ড্যাশবোর্ড ডেটা ফেচিং
//   const { data: stats, isLoading } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin-stats"); // আপনার এপিআই পাথ অনুযায়ী পরিবর্তন করুন
//       return res.data;
//     },
//   });

//   if (isLoading) return <div className="p-10 text-center font-black dark:text-white uppercase tracking-widest">Loading Dashboard...</div>;

//   // চার্টের জন্য ডামি বা ডাইনামিক ডেটা (আপনার API থেকে আসবে)
//   const chartData = stats?.chartData || [
//     { name: 'Jan', sales: 4000, orders: 2400 },
//     { name: 'Feb', sales: 3000, orders: 1398 },
//     { name: 'Mar', sales: 2000, orders: 9800 },
//     { name: 'Apr', sales: 2780, orders: 3908 },
//   ];

//   const pieData = [
//     { name: 'Completed', value: 400 },
//     { name: 'Pending', value: 300 },
//     { name: 'Cancelled', value: 100 },
//   ];
//   const COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

//   return (
//     <div className="p-6 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen">
      
//       {/* --- ১. Overview Cards --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           { label: "Total Revenue", value: `$${stats?.revenue || "12,450"}`, icon: <FaDollarSign />, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
//           { label: "Total Users", value: stats?.users || "1,200", icon: <FaUsers />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
//           { label: "Total Orders", value: stats?.orders || "850", icon: <FaShoppingCart />, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
//           { label: "Products", value: stats?.products || "120", icon: <FaBox />, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
//         ].map((stat, i) => (
//           <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
//             <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} text-xl`}>{stat.icon}</div>
//             <div>
//               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
//               <h3 className="text-2xl font-black dark:text-white">{stat.value}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- ২. Charts Section --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
//         {/* Bar Chart: Sales Overview */}
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-[400px]">
//           <h3 className="text-sm font-black uppercase tracking-widest mb-6 dark:text-gray-300 italic">Sales Analysis</h3>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//               <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
//               <YAxis fontSize={10} axisLine={false} tickLine={false} />
//               <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '15px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
//               <Bar dataKey="sales" fill="#4f46e5" radius={[10, 10, 0, 0]} barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart: Order Status */}
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-[400px]">
//           <h3 className="text-sm font-black uppercase tracking-widest mb-6 dark:text-gray-300 italic">Order Distribution</h3>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie data={pieData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* --- ৩. Data Table: Recent Orders --- */}
//       <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         <div className="p-8 border-b dark:border-gray-700 flex justify-between items-center">
//           <h3 className="text-sm font-black uppercase tracking-widest dark:text-white italic">Recent Transactions</h3>
//           <button className="text-[10px] font-black uppercase text-indigo-600 border border-indigo-600 px-4 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all">View All</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table w-full border-none">
//             <thead className="bg-gray-50 dark:bg-gray-900/50">
//               <tr className="text-[10px] font-black uppercase text-gray-400 border-none">
//                 <th className="py-5 pl-8 tracking-widest">Customer</th>
//                 <th className="tracking-widest">Status</th>
//                 <th className="tracking-widest">Date</th>
//                 <th className="tracking-widest text-right pr-8">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="dark:text-gray-300">
//               {(stats?.recentOrders || [1,2,3,4]).map((order, i) => (
//                 <tr key={i} className="border-b dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
//                   <td className="py-5 pl-8 font-bold">John Doe</td>
//                   <td>
//                     <span className="bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Completed</span>
//                   </td>
//                   <td className="text-xs font-medium text-gray-500">Jan 12, 2024</td>
//                   <td className="text-right pr-8 font-black text-indigo-600">$450.00</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend 
} from 'recharts';
import { FaUsers, FaDollarSign, FaShoppingCart, FaBox } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

export default function DashHome() {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  // ১. অ্যাডমিন স্ট্যাটাস ফেচিং (টোকেন ভেরিফাইড)
  const { data: stats, isLoading: statsLoading, isError } = useQuery({
    queryKey: ["admin-stats", user?.email],
    enabled: !!user?.email, // ইমেইল না আসা পর্যন্ত কল হবে না
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data; 
    },
  });

  // লোডিং স্টেট
  if (authLoading || statsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <span className="loading loading-bars loading-lg text-indigo-600"></span>
        <p className="mt-4 font-black text-[10px] uppercase tracking-[5px] animate-pulse">Syncing Factory Data</p>
      </div>
    );
  }

  // সার্ভার এরর হ্যান্ডেলিং
  if (isError) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-red-500 font-black text-2xl uppercase">Server Error 500</h2>
        <p className="text-gray-500 text-sm mt-2">আপনার ব্যাকএন্ড এপিআই-তে ভেরিয়েবল নামে ভুল আছে। কালেকশন নেম চেক করুন।</p>
      </div>
    );
  }

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  // কার্ড ডাটা স্ট্রাকচার
  const statCards = [
    { label: "Total Revenue", value: `$${stats?.totalRevenue || 0}`, icon: <FaDollarSign />, color: "text-green-500", border: "border-green-500" },
    { label: "Total Users", value: stats?.totalUsers || 0, icon: <FaUsers />, color: "text-blue-500", border: "border-blue-500" },
    { label: "Total Orders", value: stats?.totalOrders || 0, icon: <FaShoppingCart />, color: "text-indigo-500", border: "border-indigo-500" },
    { label: "Total Products", value: stats?.totalProducts || 0, icon: <FaBox />, color: "text-orange-500", border: "border-orange-500" },
  ];

  return (
    <div className="p-6 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
            Factory <span className="text-indigo-600 underline">Intelligence</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mt-3">
            Real-time Operational Dashboard
          </p>
        </div>
        <div className="text-right">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Admin: {user?.displayName}</p>
        </div>
      </div>

      {/* --- ২. DYNAMIC STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((item, i) => (
          <div key={i} className={`bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border-b-8 ${item.border} transition-all hover:-translate-y-2`}>
            <div className={`text-2xl ${item.color} mb-4`}>{item.icon}</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
            <h3 className="text-3xl font-black dark:text-white mt-1 leading-none">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* --- ৩. DYNAMIC CHARTS (Container Error Fixed) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Performance Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-8 dark:text-gray-400 italic">Core Metric Analysis</h3>
          <div style={{ width: '100%', height: 350 }}> {/* Fixed Height Parent */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-8 dark:text-gray-400 italic">Market Distribution</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.chartData || []}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(stats?.chartData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- ৪. RECENT ORDERS TABLE --- */}
      <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8 border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
           <h3 className="text-[10px] font-black uppercase tracking-widest dark:text-white italic">Recent Factory Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full border-none">
            <thead>
              <tr className="text-[9px] font-black uppercase text-gray-400 border-none bg-gray-50 dark:bg-gray-900/50">
                <th className="py-6 pl-10 tracking-[2px]">Buyer Email</th>
                <th className="tracking-[2px]">Order Status</th>
                <th className="tracking-[2px] text-right pr-10">Revenue Impact</th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-300">
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order, i) => (
                  <tr key={i} className="border-b dark:border-gray-700/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                    <td className="py-6 pl-10 font-bold">{order.email}</td>
                    <td>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {order.orderStatus || order.status || 'Verified'}
                      </span>
                    </td>
                    <td className="text-right pr-10 font-black text-indigo-500 italic">
                      ${order.totalPrice || order.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-10 font-black text-gray-400 uppercase text-xs">No Recent Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}