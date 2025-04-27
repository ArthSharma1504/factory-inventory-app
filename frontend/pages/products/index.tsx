import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import ProductForm from '../../components/ProductForm';

interface Product {
  _id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refresh]);

  const handleProductAdded = () => {
    setRefresh(!refresh);
  };

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
            <body>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.unit}</td>
                  <td className="py-2 px-4">{product.currentStock}</td>
                </tr>
              ))}
            </body>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;