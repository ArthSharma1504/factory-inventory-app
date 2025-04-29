import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PurchaseFormProps {
  onSubmit: () => void;
}

interface Product {
  _id: string;
  name: string;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    purchaseDate: new Date().toISOString().split('T')[0],
    supplier: '',
    cost: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, productId: response.data[0]._id }));
        }
      } catch (error) {
        toast.error('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'cost' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/purchases', {
        ...formData,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Purchase added successfully!');
      onSubmit();
      setFormData({
        productId: products[0]?._id || '',
        quantity: 1,
        purchaseDate: new Date().toISOString().split('T')[0],
        supplier: '',
        cost: 0,
      });
    } catch (error) {
      toast.error('Error creating purchase');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity.toString()}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
          min="1"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Supplier</label>
        <input
          type="text"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Cost</label>
        <input
          type="number"
          name="cost"
          value={formData.cost.toString()}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Add Purchase
      </button>
    </form>
  );
};

export default PurchaseForm;