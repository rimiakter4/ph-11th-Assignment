

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Fetch single product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  //  Set default values in form
  useEffect(() => {
    if (product?._id) {
      reset({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        description: product.description || "",
        demoVideo: product.demoVideo || "",
        images: product.images || [],
      });
    }
  }, [product, reset]);

  //  Submit update
  const onSubmit = async (data) => {
    const updatedProduct = {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      description: data.description,
      demoVideo: data.demoVideo,
      images: data.images?.filter(Boolean), 
    };

    try {
      const res = await axiosSecure.put(`/products/${id}`, updatedProduct);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Product updated successfully!", "success");
        navigate("/dashboard/allproducts");
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="p-10 bg-white shadow-xl rounded-xl max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Update Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Product Name */}
        <div className="form-control">
          <label className="label font-semibold">Product Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-semibold">Category</label>
          <input
            {...register("category", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label font-semibold">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Demo Video */}
        <div className="form-control">
          <label className="label font-semibold">Demo Video URL</label>
          <input
            {...register("demoVideo")}
            className="input input-bordered"
          />
        </div>

        {/* Image 1 */}
        <div className="form-control">
          <label className="label font-semibold">Image URL 1</label>
          <input
            {...register("images.0")}
            className="input input-bordered"
          />
        </div>

        {/* Image 2 */}
        <div className="form-control">
          <label className="label font-semibold">Image URL 2</label>
          <input
            {...register("images.1")}
            className="input input-bordered"
          />
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24"
          />
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full border-none"
          >
            {isSubmitting ? "Updating..." : "Update Product Info"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
