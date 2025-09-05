import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../utilsHelper/supabaseClient";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const AddProductToDb = async (formData) => {
    try {
      const file = formData.image?.[0];
      if (!file) {
        toast.error("Please select an image");
        return;
      }

      const fileName = `public/${Date.now()}_${file.name}`;

      if (!file || !file.type.startsWith("image/")) {
        toast.error("Please upload a valid image.");
        return;
      }

      // Step 1: Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload failed", uploadError);
        toast.error("Image upload failed");
        return;
      }

      // Step 2: Get Public URL of uploaded image
      const { data: publicData, error: urlError } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      if (urlError || !publicData?.publicUrl) {
        toast.error("Failed to get public image URL");
        return;
      }

      const publicUrl = publicData.publicUrl;

      // Step 3: Prepare and insert product data into Supabase table
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        discount_percentage: Number(formData.discount_percentage),
        rating: Number(formData.rating),
        stock: Number(formData.stock),
        brand: formData.brand,
        category: formData.category,
        thumbnail: publicUrl,
      };

      const { data, error } = await supabase.from("products").insert([payload]);

      if (error) {
        console.error("Insert failed:", error);
        toast.error(`Database error: ${error.message}`);
        return;
      }

      toast.success("Product added successfully!");
      reset(); // clear the form
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600 underline">
        Add Product
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(AddProductToDb)}
        encType="multipart/form-data"
      >
        {[
          {
            label: "Product Name",
            name: "title",
            type: "text",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "text",
            required: true,
          },
          {
            label: "Price ($)",
            name: "price",
            type: "number",
            required: true,
          },
          {
            label: "Discount (%)",
            name: "discount_percentage",
            type: "number",
          },
          { label: "Rating", name: "rating", type: "number", step: "0.01" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Brand", name: "brand", type: "text", required: true },
          {
            label: "Category",
            name: "category",
            type: "text",
            required: true,
          },
        ].map(({ label, name, type, required, step }) => (
          <div key={name} className="grid grid-cols-1 gap-2">
            <label className="font-medium">{label}</label>
            <input
              type={type}
              step={step}
              required={required}
              {...register(name)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="p-2 border rounded outline-none focus:ring-2 ring-blue-300"
            />
          </div>
        ))}

        <div className="grid grid-cols-1 gap-2">
          <label className="font-medium">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            required
            {...register("image", { required: true })}
            className="p-2 border rounded outline-none focus:ring-2 ring-blue-300"
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-600 cursor-pointer text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
