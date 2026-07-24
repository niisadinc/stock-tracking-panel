import { useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ products, setProducts, categories }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tümü" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    const confirmed = confirm("Bu ürünü silmek istediğine emin misin?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert("Ürün başarıyla silindi!");
      } else {
        alert("Ürün silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pink-950">
            Ürün Listesi
          </h1>

          <p className="mt-2 text-violet-950">
            Ürünleri listeleyebilir, arayabilir ve kategoriye göre filtreleyebilirsin.
          </p>
        </div>

        <Link
          to="/products/add"
          className="rounded-lg bg-pink-700 px-4 py-2 text-center font-medium text-white hover:bg-pink-800"
        >
          Yeni Ürün Ekle
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Ürün adına göre ara
            </label>

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Örn: Laptop"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Kategoriye göre filtrele
            </label>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="Tümü">Tümü</option>

              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-pink-950">
            Ürünler
          </h2>

          <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
            {filteredProducts.length} ürün
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b bg-pink-100 text-pink-900">
                <th className="px-4 py-3">Ürün Adı</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Birim Fiyat</th>
                <th className="px-4 py-3">İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-pink-800">
                      {product.name}
                    </td>

                    <td className="px-4 py-3 text-pink-600">
                      {product.category}
                    </td>

                    <td className="px-4 py-3">
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

                    <td className="px-4 py-3 text-pink-400">
                      {product.price.toLocaleString("tr-TR")} TL
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="rounded-lg border border-emerald-200 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          Düzenle
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-slate-500"
                  >
                    Aramana uygun ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;