
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
    <section className="py-10 mb-11  bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl   font-bold mb-20"
        >
          Our Trusted Brands
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          className="py-6"
        >
          {brands.map((b, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full h-40 rounded-xl overflow-hidden shadow"
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
