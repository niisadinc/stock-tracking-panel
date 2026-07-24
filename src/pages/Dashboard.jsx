import { GiDandelionFlower } from "react-icons/gi";
function Dashboard({ products, categories }) {
  const totalProducts = products.length;

  const criticalStockProducts = products.filter((product) => product.stock <= 5);

  const totalCategories = categories.length;

  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-pink-950">Dashboard</h1>
        <p className="mt-2 text-violet-950">
          Envanter ve stok durumunu buradan takip edebilirsin !
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-shadow-violet-400">Toplam Ürün Sayısı</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-900">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
          <p className="text-shadow-violet-400">Kritik Stoktaki Ürün Sayısı</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {criticalStockProducts.length}
          </h2>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-shadow-violet-400">Toplam Kategori Sayısı</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-900">
            {totalCategories}
          </h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-pink-950">
          Son Eklenen Ürünler
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full   text-left">
            <thead>
              <tr className="border-b text-red-300">
                <th className="py-3 pr-4">Ürün Adı</th>
                <th className="py-3 pr-4">Kategori</th>
                <th className="py-3 pr-4">Stok</th>
                <th className="py-3 pr-4">Ürün Fiyat</th>
              </tr>
            </thead>

            <tbody>
              {latestProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-pink-950">
                    {product.name}
                  </td>

                  <td className="py-3 pr-4 text-pink-600">
                    {product.category}
                  </td>

                  <td className="py-3 pr-4">
                    <span
                      className={
                        product.stock <= 5
                          ? "rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                          : "rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                      }
                    >
                      {product.stock} adet
                    </span>
                  </td>

                  <td className="py-3 pr-4 text-pink-400">
                    {product.price.toLocaleString("tr-TR")} TL
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {criticalStockProducts.length > 0 && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-red-700">
  <GiDandelionFlower />
  Kritik Stoktaki Ürün Sayısı
  <GiDandelionFlower />
</h2>

          <ul className="mt-3 list-disc pl-5 text-red-700">
            {criticalStockProducts.map((product) => (
              <li key={product.id}>
                {product.name} - {product.stock} adet kaldı
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;