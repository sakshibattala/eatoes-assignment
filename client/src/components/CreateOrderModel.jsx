import { useEffect, useState } from "react";
import { createOrder } from "../services/ordersApi";
import { getMenuItems } from "../services/menuApi";
import toast from "react-hot-toast";

const CreateOrderModal = ({ isOpen, onClose, onOrderCreated }) => {
  if (!isOpen) return null;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const fetchMenu = async () => {
    const res = await getMenuItems();
    setMenuItems(res.data.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addMenuItem = (menuItem) => {
    setSelectedItems((prev) => [
      ...prev,
      { menuItem, quantity: 1, price: menuItem.price },
    ]);
  };

  const updateQuantity = (index, qty) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: qty, price: item.menuItem.price * qty }
          : item,
      ),
    );
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleCreate = async () => {
    if (!customerName.trim()) return toast.error("Enter customer name");
    
    if (!tableNumber || Number(tableNumber) < 1) {
      return toast.error("Enter valid table number!");
    }

    if (selectedItems.length === 0)
      return toast.error("Select at least one menu item!");

    const orderPayload = {
      customerName: customerName.trim(),
      tableNumber: Number(tableNumber),
      totalAmount: Number(totalAmount),
      items: selectedItems.map((s) => ({
        menuItem: s.menuItem._id,
        quantity: Number(s.quantity),
        price: Number(s.price),
      })),
    };

    console.log("PAYLOAD SENDING:", orderPayload);

    try {
      const res = await createOrder(orderPayload);
      toast.success("Order created!");

      onOrderCreated(res.data.data);
      onClose();
    } catch (e) {
      toast.error("Failed to create order!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>

        {/* Customer Name */}
        <input
          type="text"
          placeholder="Customer Name"
          className="border w-full rounded-lg px-3 py-2 mb-3"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* Table Number */}
        <input
          type="number"
          placeholder="Table Number"
          className="border w-full rounded-lg px-3 py-2 mb-3"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        {/* Menu Items List */}
        <h3 className="font-semibold mb-2">Select Items</h3>

        <div className="grid grid-cols-2 gap-2 mb-4 max-h-40 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item._id}
              onClick={() => addMenuItem(item)}
              className="border rounded-lg p-2 hover:bg-gray-100"
            >
              {item.name} • ₹{item.price}
            </button>
          ))}
        </div>

        {/* Selected Items */}
        <h3 className="font-semibold mb-2">Selected Items</h3>
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {selectedItems.map((sel, index) => (
            <div
              key={index}
              className="border p-3 rounded-lg flex justify-between"
            >
              <span>{sel.menuItem.name}</span>

              <input
                type="number"
                value={sel.quantity}
                min="1"
                className="w-16 border rounded px-2"
                onChange={(e) => updateQuantity(index, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="mt-4 font-semibold text-lg">Total: ₹{totalAmount}</div>

        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
          onClick={handleCreate}
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrderModal;
