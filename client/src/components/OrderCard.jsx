const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Ready: "bg-green-100 text-green-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderCard = ({ order, onView, onUpdateStatus }) => {
  return (
    <div
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border cursor-pointer"
      onClick={() => onView(order)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{order.orderNumber}</h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
      <p className="text-sm text-gray-600">Table: {order.tableNumber}</p>
      <p className="text-sm text-gray-600">Items: {order.items.length}</p>
      <p className="text-sm text-gray-600 mb-3">Total: ₹{order.totalAmount}</p>

      {/* Status dropdown */}
      <select
        className="border rounded-lg px-2 py-1 text-sm"
        value={order.status}
        onClick={(e) => e.stopPropagation()} // IMPORTANT
        onChange={(e) => onUpdateStatus(order._id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <p className="text-xs text-gray-400 mt-3">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default OrderCard;
