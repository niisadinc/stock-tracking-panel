import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBox, FaPlus, FaTags } from "react-icons/fa";
import { GiLadybug } from "react-icons/gi";
import { PiFlowerLotus } from "react-icons/pi";

function Layout() {
  return (
    <div className="min-h-screen bg-pink-200">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-pink-500 text-white md:min-h-screen p-4">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-6 text-fuchsia-950">
  <PiFlowerLotus />
  ENVANTER
  <PiFlowerLotus />
</h2>

          <nav className="flex flex-col gap-3">
            <Link
              className="flex items-center justify-between hover:bg-pink-600 px-3 py-2 rounded-lg"
              to="/dashboard"
            >
              <span className="flex items-center gap-2">
                <MdDashboard />
                Dashboard
              </span>
              <GiLadybug />
            </Link>

            <Link
              className="flex items-center justify-between hover:bg-pink-600 px-3 py-2 rounded-lg"
              to="/products"
            >
              <span className="flex items-center gap-2">
                <FaBox />
                Ürün Listesi
              </span>
              <GiLadybug />
            </Link>

            <Link
              className="flex items-center justify-between hover:bg-pink-600 px-3 py-2 rounded-lg"
              to="/products/add"
            >
              <span className="flex items-center gap-2">
                <FaPlus />
                Ürün Ekle / Düzenle
              </span>
              <GiLadybug />
            </Link>

            <Link
              className="flex items-center justify-between hover:bg-pink-600 px-3 py-2 rounded-lg"
              to="/categories"
            >
              <span className="flex items-center gap-2">
                <FaTags />
                Kategoriler
              </span>
              <GiLadybug />
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;