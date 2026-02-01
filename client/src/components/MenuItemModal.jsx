import { useState } from "react";
import toast from "react-hot-toast";

const MenuItemModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  if (!isOpen) return null;

  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    ingredients: initialData?.ingredients?.join(", ") || "",
    preparationTime: initialData?.preparationTime || "",
    imageUrl: initialData?.imageUrl || "",
    isAvailable: initialData?.isAvailable ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    // FRONTEND VALIDATION
    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!form.category) {
      return toast.error("Category is required");
    }

    if (!form.price || Number(form.price) <= 0) {
      return toast.error("Price must be a valid number");
    }

    if (!form.imageUrl.trim()) {
      return toast.error("Image URL is required");
    }

    if (form.preparationTime && Number(form.preparationTime) < 0) {
      return toast.error("Preparation time cannot be negative");
    }

    // Prepared final  payload
    const payload = {
      ...form,
      price: Number(form.price),
      preparationTime: Number(form.preparationTime),
      ingredients: form.ingredients
        ? form.ingredients
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i !== "")
        : [],
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="category"
            className="border p-2 rounded"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            className="border p-2 rounded"
            value={form.ingredients}
            onChange={handleChange}
          />

          <input
            name="preparationTime"
            type="number"
            placeholder="Preparation Time (mins)"
            className="border p-2 rounded"
            value={form.preparationTime}
            onChange={handleChange}
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={form.imageUrl}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
