import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import ProductForm from '../../components/ProductForm';

const NavBar = dynamic(() => import('../../components/NavBar'), { ssr: false });

interface Product {
  _id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
}

const LOW_STOCK_THRESHOLD = 10;

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        const lowStockProducts = response.data.filter((p: Product) => p.currentStock <= LOW_STOCK_THRESHOLD);
        if (lowStockProducts.length > 0) {
          toast.warn(`Low stock alert: ${lowStockProducts.map((p: Product) => p.name).join(', ')}`);
        }
      } catch (error) {
        toast.error('Error fetching products');
      }
    };
    fetchProducts();
  }, [refresh]);

  const handleProductAdded = () => {
    setRefresh(!refresh);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
          <ProductForm onSubmit={handleProductAdded} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Unit</th>
                <th className="py-2 px-4 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">No products found</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className={`border-b ${product.currentStock <= LOW_STOCK_THRESHOLD ? 'bg-red-100' : ''}`}
                  >
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.category}</td>
                    <td className="py-2 px-4">{product.unit}</td>
                    <td className="py-2 px-4">{product.currentStock}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;