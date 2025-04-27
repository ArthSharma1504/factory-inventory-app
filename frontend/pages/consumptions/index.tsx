import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import ConsumptionForm from '../../components/ConsumptionForm';

interface Consumption {
  _id: string;
  product: { name: string };
  department: { name: string };
  quantity: number;
  consumptionDate: string;
  purpose: string;
}

const ConsumptionsPage: React.FC = () => {
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/consumptions');
        setConsumptions(response.data);
      } catch (error) {
        console.error('Error fetching consumptions:', error);
      }
    };
    fetchConsumptions();
  }, [refresh]);

  const handleConsumptionAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Consumptions</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Consumption</h2>
          <ConsumptionForm onSubmit={handleConsumptionAdded} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Consumption List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {consumptions.map((consumption) => (
                <tr key={consumption._id} className="border-b">
                  <td className="py-2 px-4">{consumption.product.name}</td>
                  <td className="py-2 px-4">{consumption.department.name}</td>
                  <td className="py-2 px-4">{consumption.quantity}</td>
                  <td className="py-2 px-4">{new Date(consumption.consumptionDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{consumption.purpose || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionsPage;