import { Edit2, Trash2 } from "lucide-react";

const MenuItemCard = ({
  item,
  onToggleAvailability,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden relative"
      onClick={() => onView(item)}
    >
      {/* Top Right Action Buttons */}
      <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
        <Edit2
          size={16}
          className="text-blue-600 cursor-pointer hover:scale-110 transition"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        />
        <Trash2
          size={16}
          className="text-red-600 cursor-pointer hover:scale-110 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item._id);
          }}
        />
      </div>

      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>

          {/* Availability Toggle */}
          <label className="flex items-center gap-1 text-xs">
            <input
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                onToggleAvailability(item._id, !item.isAvailable);
              }}
              type="checkbox"
              checked={item.isAvailable}
              className="accent-green-600 cursor-pointer"
            />
            <span
              className={item.isAvailable ? "text-green-600" : "text-red-500"}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
          </label>
        </div>

        {/* Category + Price */}
        <p className="text-sm text-gray-500 mt-1">
          {item.category} • ₹{item.price}
        </p>

        {/* Ingredients */}
        {item.ingredients && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {item.ingredients.join(" - ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
