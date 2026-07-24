import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Categories from "./pages/Categories";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Go sunucunuzun API adresi
  // (Sen test ederken localhost, Nisa bağlanırken senin IP adresin: http://10.128.129.37:8080/api)
  const API_BASE_URL = "http://localhost:8080/api";

  // Veritabanındaki tüm ürün ve kategorileri çeken fonksiyon
  const fetchAllData = async () => {
    try {
      // Ürünleri çek
      const prodResponse = await fetch(`${API_BASE_URL}/products`);
      const prodData = await prodResponse.json();
      setProducts(prodData);

      // Kategorileri çek
      const catResponse = await fetch(`${API_BASE_URL}/categories`);
      const catData = await catResponse.json();
      setCategories(catData);
    } catch (error) {
      console.error("Veritabanından veriler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Uygulama ilk açıldığında verileri veritabanından çekmesi için useEffect tetikliyoruz
  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-emerald-900 font-medium">
        Envanter Verileri Yükleniyor...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route
          path="dashboard"
          element={<Dashboard products={products} categories={categories} />}
        />
        <Route
          path="products"
          element={
            <ProductList
              products={products}
              setProducts={setProducts}
              categories={categories}
              refreshData={fetchAllData} // CRUD işlemlerinden sonra listeyi yenilemek için bu fonksiyonu alt bileşenlere yolluyoruz
            />
          }
        />
        <Route
          path="products/add"
          element={
            <ProductForm
              products={products}
              setProducts={setProducts}
              categories={categories}
              refreshData={fetchAllData}
            />
          }
        />
        <Route
          path="products/edit/:id"
          element={
            <ProductForm
              products={products}
              setProducts={setProducts}
              categories={categories}
              refreshData={fetchAllData}
            />
          }
        />
        <Route
          path="categories"
          element={
            <Categories
              categories={categories}
              setCategories={setCategories}
              refreshData={fetchAllData}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;