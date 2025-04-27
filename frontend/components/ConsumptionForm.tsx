import { useState, useEffect } from 'react';
import axios from 'axios';

interface ConsumptionFormProps {
  onSubmit: () => void;
}

interface Product {
  _id: string;
  name: string;
}

interface Department {
  _id: string;
  name: string;
}

const ConsumptionForm: React.FC<ConsumptionFormProps> = ({ onSubmit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState({
    productId: '',
    departmentId: '',
    quantity: 1,
    consumptionDate: new Date().toISOString().split('T')[0],
    purpose: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, departmentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/departments'),
        ]);
        setProducts(productsRes.data);
        setDepartments(departmentsRes.data);
        if (productsRes.data.length > 0) {
          setFormData((prev) => ({ ...prev, productId: productsRes.data[0]._id }));
        }
        if (departmentsRes.data.length > 0) {
          setFormData((prev) => ({ ...prev, departmentId: departmentsRes.data[0]._id }));
        }
      } catch (error) {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/consumptions', {
        ...formData,
        quantity: Number(formData.quantity),
      });
      onSubmit();
      setFormData({
        productId: products[0]?._id || '',
        departmentId: departments[0]?._id || '',
        quantity: 1,
        consumptionDate: new Date().toISOString().split('T')[0],
        purpose: '',
      });
    } catch (error) {
      setError('Error creating consumption');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
          min="1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Consumption Date</label>
        <input
          type="date"
          name="consumptionDate"
          value={formData.consumptionDate}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Purpose</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Consumption
      </button>
    </form>
  );
};

export default ConsumptionForm;