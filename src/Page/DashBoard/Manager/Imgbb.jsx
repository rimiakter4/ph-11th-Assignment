// export const Imgbb = async (files) => {
//   const urls = [];

//   for (let file of files) {
//     const formData = new FormData();
//     formData.append("image", file);

//     const res = await fetch(
//       `https://api.imgbb.com/1/upload?key=IMGBB_API_KEY`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await res.json();
//     urls.push(data.data.url);
//   }

//   return urls;
// };
const key = import.meta.env.VITE_IMGBB_API_KEY;

export const Imgbb = async (files) => {
  const urls = [];

  for (let file of files) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${key}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    urls.push(data.data.url);
  }

  return urls;
};
