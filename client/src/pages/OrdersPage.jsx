import { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/ordersApi";
import OrderCard from "../components/OrderCard";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import OrderDetailsModal from "../components/OrderDetailsModal";
import CreateOrderModal from "../components/CreateOrderModel";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // 6 per page
  const [totalPages, setTotalPages] = useState(1);

  const [viewOrder, setViewOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onView = async (order) => {
    try {
      const res = await getOrderById(order._id); // fetch from backend
      setViewOrder(res.data.data); // full details
      setDetailsOpen(true);
    } catch (error) {
      toast.error("Failed to load order details");
    }
  };

  const onUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );

      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders({
        status: statusFilter,
        page,
        limit,
      });

      if (res.data.data.length === 0) {
        toast.error("no items matched");
      }

      setOrders(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch when page or status filter changes
  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  // loading UI
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <ThreeDots height="70" width="70" color="#4fa94d" />
      </div>
    );

  return (
    <div className="p-6">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        + New Order
      </button>
      <h2 className="text-2xl font-semibold mb-4">Orders Dashboard</h2>

      {/* STATUS FILTER */}
      <select
        className="border rounded-lg px-3 py-2 text-sm mb-5"
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
          setPage(1); // reseting to page 1 when filter changes
        }}
      >
        <option value="">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* ORDER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onView={onView}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Prev Button */}
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <OrderDetailsModal
        isOpen={detailsOpen}
        order={viewOrder}
        onClose={() => setDetailsOpen(false)}
      />

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderCreated={(newOrder) => setOrders((prev) => [newOrder, ...prev])}
      />
    </div>
  );
};

export default OrdersPage;
