const MenuItemDetailsModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Price:</strong> ₹{item.price}
          </p>
          <p>
            <strong>Description:</strong> {item.description || "No description"}
          </p>

          <p>
            <strong>Ingredients:</strong>{" "}
            {item.ingredients?.length
              ? item.ingredients.join(", ")
              : "No ingredients"}
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            <span
              className={item.isAvailable ? "text-green-600" : "text-red-500"}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
          </p>

          <p>
            <strong>Prep Time:</strong> {item.preparationTime || 0} mins
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Updated:</strong>{" "}
            {new Date(item.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Close button */}
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailsModal;
