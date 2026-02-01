import { Menu, ShoppingBag, AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm relative">
      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://media.licdn.com/dms/image/v2/C560BAQFXVR5m55fHtQ/company-logo_200_200/company-logo_200_200/0/1630654642522/eatoes_logo?e=2147483647&v=beta&t=WNMM0ENoEJhDeb2YiCXrc-eRGPDE7ZiCQDpeti3cVAo"
          alt="Logo"
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex bg-white px-10 py-3 rounded-full shadow-lg gap-12 text-lg font-medium items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold flex items-center gap-2 transition"
              : "text-gray-700 flex items-center gap-2 hover:text-blue-600 transition"
          }
        >
          <Menu className="w-5 h-5" /> Menu
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold flex items-center gap-2 transition"
              : "text-gray-700 flex items-center gap-2 hover:text-blue-600 transition"
          }
        >
          <ShoppingBag className="w-5 h-5" /> Orders
        </NavLink>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? (
          <X className="w-7 h-7" />
        ) : (
          <AlignJustify className="w-7 h-7" />
        )}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-20 right-5 bg-white shadow-xl rounded-2xl py-4 px-6 flex flex-col gap-5 text-lg w-48 md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold flex items-center gap-2 transition"
                : "text-gray-700 flex items-center gap-2 hover:text-blue-600 transition"
            }
          >
            <Menu className="w-5 h-5" /> Menu
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold flex items-center gap-2 transition"
                : "text-gray-700 flex items-center gap-2 hover:text-blue-600 transition"
            }
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
