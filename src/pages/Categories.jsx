import { useState } from "react";

function Categories({ categories, setCategories }) {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      alert("Lütfen kategori adı gir.");
      return;
    }

    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (categoryExists) {
      alert("Bu kategori zaten var.");
      return;
    }

   const newCategory = {
  id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
  name: categoryName.trim(),
};
    setCategories([...categories, newCategory]);
    setCategoryName("");
  };

  const handleDeleteCategory = (id) => {
    const confirmed = confirm("Bu kategoriyi silmek istediğine emin misin?");

    if (confirmed) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-pink-950">Kategoriler</h1>
        <p className="mt-2 text-slate-600">
          Ürün kategorilerini buradan yönetebilirsin.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-pink-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-pink-950">
          Yeni Kategori Ekle
        </h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Örn: Kırtasiye"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <button
            type="button"
            onClick={handleAddCategory}
            className="rounded-lg bg-pink-700 px-4 py-2 font-medium text-white hover:bg-pink-200"
          >
            Ekle
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-pink-950">
            Kategori Listesi
          </h2>

          <span className="rounded-full bg-pink-700 px-3 py-1 text-sm font-medium text-pink-100">
            {categories.length} kategori
          </span>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-pink-800">{category.name}</p>
                <p className="text-sm text-slate-500">ID: {category.id}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteCategory(category.id)}
                className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;