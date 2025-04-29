import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProductFormProps {
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cleaning',
    unit: 'Liters',
    currentStock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'currentStock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product added successfully!');
      onSubmit();
      setFormData({
        name: '',
        category: 'Cleaning',
        unit: 'Liters',
        currentStock: 0,
      });
    } catch (error) {
      toast.error('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="Cleaning">Cleaning</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Unit</label>
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="Liters">Liters</option>
          <option value="Pieces">Pieces</option>
          <option value="Kilograms">Kilograms</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Current Stock</label>
        <input
          type="number"
          name="currentStock"
          value={formData.currentStock.toString()}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          required
          min="0"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;