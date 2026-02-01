const OrderDetailsModal = ({ isOpen, order, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        <p>
          <strong>Order Number:</strong> {order.orderNumber}
        </p>
        <p>
          <strong>Customer:</strong> {order.customerName}
        </p>
        <p>
          <strong>Table:</strong> {order.tableNumber}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{order.totalAmount}
        </p>

        <hr className="my-4" />

        {/* ITEMS LIST */}
        <h3 className="text-lg font-semibold mb-2">Items</h3>

        <div className="space-y-3">
          {order.items?.map((item) => (
            <div key={item._id} className="p-3 border rounded-lg">
              <p className="font-medium">{item.menuItem?.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} • Price: ₹{item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
