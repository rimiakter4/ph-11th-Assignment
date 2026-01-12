
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// export default function Brands() {
//   const brands = [
//     { name: "Zara", logo: "https://i.ibb.co.com/kRCn7vg/photo-1572615208281-3c9a9a9fb41c.avif" },
//     { name: "Nike", logo: "https://i.ibb.co.com/Z1BsMHCb/photo-1608541737042-87a12275d313.avif" },
//     { name: "Adidas", logo: "https://i.ibb.co.com/KcwzbTwx/photo-1555274175-75f4056dfd05.avif" },
//     { name: "H&M", logo: "https://i.ibb.co.com/CpDmZzZ5/photo-1578983662508-41895226ebfb.avif" },
//     { name: "Uniqlo", logo: "https://i.ibb.co.com/s0Z22Pg/photo-1735921012148-3843adfcce3c.avif" }
//   ];

//   return (
//     <section className="py-10 mb-11 bg-white">
//       <div className="container mx-auto text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-bold mb-20"
//         >
//           Our Trusted Brands
//         </motion.h2>

//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{ delay: 1500, disableOnInteraction: false }}
//           className="py-6"
//           breakpoints={{
//             0: {
//               slidesPerView: 1, // Small devices
//             },
//             768: {
//               slidesPerView: 2, // Medium devices
//             },
//             1024: {
//               slidesPerView: 3, // Large devices
//             },
//           }}
//         >
//           {brands.map((b, idx) => (
//             <SwiperSlide key={idx}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="w-full h-40 rounded-xl overflow-hidden shadow"
//               >
//                 <img
//                   src={b.logo}
//                   alt={b.name}
//                   className="w-full h-full object-cover"
//                 />
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Brands() {
  const brands = [
    { name: "Zara", logo: "https://i.ibb.co.com/kRCn7vg/photo-1572615208281-3c9a9a9fb41c.avif" },
    { name: "Nike", logo: "https://i.ibb.co.com/Z1BsMHCb/photo-1608541737042-87a12275d313.avif" },
    { name: "Adidas", logo: "https://i.ibb.co.com/KcwzbTwx/photo-1555274175-75f4056dfd05.avif" },
    { name: "H&M", logo: "https://i.ibb.co.com/CpDmZzZ5/photo-1578983662508-41895226ebfb.avif" },
    { name: "Uniqlo", logo: "https://i.ibb.co.com/s0Z22Pg/photo-1735921012148-3843adfcce3c.avif" }
  ];

  return (
    /* ১. সেকশন ব্যাকগ্রাউন্ড ডার্ক মোড অনুযায়ী পরিবর্তন */
    <section className="py-10  bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          /* ২. টেক্সট কালার ডার্ক মোডে সাদা হবে */
          className="text-3xl font-bold mb-20 text-gray-800 dark:text-gray-100"
        >
          Our Trusted Brands
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          className="py-6"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {brands.map((b, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                /* ৩. ইমেজ কার্ডের ব্যাকগ্রাউন্ড এবং বর্ডার ডার্ক মোড অনুযায়ী */
                className="w-full h-40 rounded-xl overflow-hidden shadow dark:shadow-gray-800 border border-transparent dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  /* ডার্ক মোডে ইমেজ খুব বেশি ব্রাইট লাগলে সামান্য অপাসিটি কমানো যেতে পারে */
                  className="w-full h-full object-cover dark:opacity-90"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}