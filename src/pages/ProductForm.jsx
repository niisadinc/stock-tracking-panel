import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm({ products, setProducts, categories }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const editingProduct = products.find((product) => product.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    category: categories[0]?.name || "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (isEditMode && editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        stock: editingProduct.stock,
        price: editingProduct.price,
      });
    }
  }, [isEditMode, editingProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.category || !formData.stock || !formData.price) {
      alert("Lütfen tüm alanları doldur.");
      return;
    }

    if (Number(formData.stock) < 0 || Number(formData.price) < 0) {
      alert("Stok ve fiyat negatif olamaz.");
      return;
    }

    if (isEditMode) {
      const updatedProducts = products.map((product) =>
        product.id === Number(id)
          ? {
              ...product,
              name: formData.name,
              category: formData.category,
              stock: Number(formData.stock),
              price: Number(formData.price),
            }
          : product
      );

      setProducts(updatedProducts);
      alert("Ürün başarıyla güncellendi.");
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        stock: Number(formData.stock),
        price: Number(formData.price),
        createdAt: new Date().toISOString().split("T")[0],
      };

      setProducts([...products, newProduct]);
      alert("Ürün başarıyla eklendi.");
    }

    navigate("/products");
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-pink-950">
          {isEditMode ? "Ürün Düzenle" : "Ürün Ekle"}
        </h1>
        <p className="mt-2 text-pink-650">
          Ürün adı, kategori, stok adedi ve birim fiyat bilgilerini gir.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-2xl rounded-xl border border-emerald-100 bg-white p-6 shadow-sm"
      >
        <div className="mb-4">
          <label className="mb-2 block font-medium text-pink-700">
            Ürün Adı
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Laptop"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-pink-700">
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-pink-700">
            Stok Adedi
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Örn: 10"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-pink-700">
            Birim Fiyat
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Örn: 25000"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="rounded-lg bg-pink-700 px-4 py-2 font-medium text-white hover:bg-emerald-800"
          >
            Kaydet
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;