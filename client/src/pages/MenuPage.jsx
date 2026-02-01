import { useState, useEffect } from "react";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  searchMenuItems,
  toggleAvailabilityStatus,
  updateMenuItem,
} from "../services/menuApi";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuItemCard from "../components/MenuItemCard";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import MenuItemModal from "../components/MenuItemModal";
import MenuItemDetailsModal from "../components/MenuItemDetailsModal";
import TopSellers from "../components/TopSellers";

const MenuPage = () => {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [searchLoading, setSearchLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // for edit

  const [viewItem, setViewItem] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Fetch initial menu using custom hook
  const {
    data: menu,
    loading,
    refetch,
    setData: setMenu,
  } = useFetch(getMenuItems);

  // SEARCH with debounce effect
  useEffect(() => {
    const searchMenu = async () => {
      if (!debouncedSearch.trim()) {
        refetch();
        return;
      }

      try {
        setSearchLoading(true);

        // Sanitize special characters for regex
        const safeQuery = debouncedSearch.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

        const res = await searchMenuItems(safeQuery);
        setMenu(res.data.data);

        if (res.data.data.length === 0) {
          toast.error("No items match your search!");
        }
      } catch (err) {
        console.error("Search error:", err);
        toast.error("Search failed!");
      } finally {
        setSearchLoading(false);
      }
    };

    searchMenu();
  }, [debouncedSearch]);

  //  APPLY FILTERS
  const applyFilters = async () => {
    try {
      const filters = {};

      if (selectedCategory) filters.category = selectedCategory;
      if (isAvailable) filters.isAvailable = isAvailable;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;

      const res = await getMenuItems(filters);
      setMenu(res.data.data);

      if (res.data.data.length === 0) {
        toast.error("No menu items found!");
      }
    } catch (error) {
      console.error("Filter error:", error);
      toast.error("Failed to apply filters!");
    }
  };

  //  RESET FILTERS
  const resetFilters = () => {
    setSelectedCategory("");
    setIsAvailable("");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");

    refetch();
  };

  const handleToggleAvailability = async (id, newStatus) => {
    try {
      setMenu((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isAvailable: newStatus } : item,
        ),
      );

      await toggleAvailabilityStatus(id, newStatus);

      toast.success("Availability updated!");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update availability");
    }
  };

  //handle edit
  const onEdit = (item) => {
    setSelectedItem(item); // put item data into modal
    setIsModalOpen(true); // open modal
  };

  const onAdd = () => {
    setSelectedItem(null); // no initial data
    setIsModalOpen(true); // open modal
  };

  const handleCreate = async (payload) => {
    try {
      const res = await createMenuItem(payload);
      setMenu((prev) => [...prev, res.data.data]);

      toast.success("Menu item added!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add item!");
    }
  };

  const handleSubmit = (payload) => {
    if (selectedItem) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
    }
  };

  const handleUpdate = async (payload) => {
    try {
      const res = await updateMenuItem(selectedItem._id, payload);

      setMenu((prev) =>
        prev.map((item) =>
          item._id === selectedItem._id ? res.data.data : item,
        ),
      );

      toast.success("Menu updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update!");
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await deleteMenuItem(id);

      if (res.status === 200) {
        setMenu((prev) => prev.filter((item) => item._id !== id));
        toast.success("Menu deleted!");
      }
    } catch (error) {
      toast.error("Failed to delete!");
    }
  };

  const onView = (item) => {
    setViewItem(item);
    setIsViewOpen(true);
  };

  // Loader
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <ThreeDots height="70" width="70" color="#4fa94d" />
      </div>
    );

  return (
    <div className="p-6">
      <TopSellers />

      <button
        className="mb-5 bg-green-600 text-white px-4 py-2 rounded"
        onClick={onAdd}
      >
        + Add Menu Item
      </button>
      {/* FILTERS SECTION */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        {/* Availability */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        {/* Price Range */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min ₹"
            className="border px-3 py-2 rounded-lg w-24 text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max ₹"
            className="border px-3 py-2 rounded-lg w-24 text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Apply Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          onClick={applyFilters}
        >
          Apply
        </button>

        {/* Reset Button */}
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      {/* Searching Indicator */}
      {searchLoading && (
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <ThreeDots height="20" width="20" color="#4fa94d" />
          Searching...
        </div>
      )}

      {/* MENU GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menu.map((item) => (
          <MenuItemCard
            key={item._id}
            item={item}
            onToggleAvailability={handleToggleAvailability}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            onView={onView}
          />
        ))}
      </div>

      {/* MODAL */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedItem}
      />

      <MenuItemDetailsModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        item={viewItem}
      />
    </div>
  );
};

export default MenuPage;
