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
          toast.warn(`Low stock alert: ${lowStockProducts.map((p: Product) => p.name).join(', ')}`, {
            position: 'top-center',
            autoClose: 5000,
          });
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
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-secondary mb-6">Manage Products</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Product</h2>
          <ProductForm onSubmit={handleProductAdded} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Product List</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Unit</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className={`transition-colors ${
                      product.currentStock <= LOW_STOCK_THRESHOLD ? 'bg-danger/10' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-gray-900">{product.name}</td>
                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                    <td className="py-4 px-6 text-gray-600">{product.unit}</td>
                    <td
                      className={`py-4 px-6 ${
                        product.currentStock <= LOW_STOCK_THRESHOLD ? 'text-danger font-medium' : 'text-gray-600'
                      }`}
                    >
                      {product.currentStock}
                    </td>
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