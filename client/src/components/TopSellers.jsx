import { useEffect, useState } from "react";
import { getTopSellers } from "../services/menuApi";

const TopSellers = () => {
  const [items, setItems] = useState([]);

  const fetchTop = async () => {
    try {
      const res = await getTopSellers();
      setItems(res.data.data);
    } catch (err) {
      console.error("Failed to load top sellers:", err);
    }
  };

  useEffect(() => {
    fetchTop();
  }, []);

  if (!items.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">Top 5 Best-Selling Items</h3>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="min-w-[180px] bg-white rounded-lg shadow-sm p-3 border border-gray-300 hover:shadow-md transition"
          >
            <img
              src={item.menuItemDetails.imageUrl}
              alt={item.menuItemDetails.name}
              className="w-full h-24 object-cover rounded"
            />

            <h4 className="font-semibold mt-2 text-sm">
              {item.menuItemDetails.name}
            </h4>

            <p className="text-xs text-gray-500">
              Sold: {item.totalSold} times
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
