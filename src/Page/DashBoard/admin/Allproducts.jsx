
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxios from "../../../Hooks/useAxios"; 

const AllProducts = () => {
  const axiosSecure = useAxios();

 
  const { data: products = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch(); 
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };


  const handleToggleHome = async (id, currentStatus) => {
    try {
   
      const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
        showOnHome: !currentStatus, 
      });

      if (res.data.modifiedCount > 0) {
        refetch(); 
        Swal.fire({
          position: "top-end",
          title: !currentStatus ? "Visible on Home Page" : "Hidden from Home Page",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  
  if (isError)
    return (
      <p className="text-center text-red-500 mt-20 font-bold">
        Error: {error.message}
      </p>
    );

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase tracking-widest">
          Inventory Management  admin  ({products.length})
        </h2>

        <div className="overflow-x-auto shadow-2xl rounded-2xl border  border-gray-100 bg-white">
          <table className="table w-full">
          
            <thead className=" bg-gradient-to-r from-teal-400 to-indigo-500  text-white">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4">Price</th>
                <th className="py-4">Category</th>
                <th className="py-4">Seller Email</th>
                <th className="py-4 text-center">Show on Home</th>
                <th className="py-4 text-center">Actions</th>
              </tr>
            </thead>

       
            <tbody>
              {products.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-indigo-50/50 transition border-b border-gray-100"
                >
            
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
                          <img
                            src={Array.isArray(product.images) ? product.images[0] : product.images}
                            alt={product.name}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{product.name}</div>
                        <div className="text-[10px] opacity-50 uppercase font-mono">{product._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>

               
                  <td className="p-4 font-bold text-green-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>

                 
                  <td className="p-4">
                    <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-3 capitalize">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {product.sellerEmail || "Admin"}
                  </td>

                
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-md"
                      checked={!!product.showOnHome} 
                      onChange={() => handleToggleHome(product._id, product.showOnHome)}
                    />
                  </td>

               
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link to={`/dashboard/updateproduct/${product._id}`}>
                        <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          
          {products.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl italic font-semibold">No products found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;