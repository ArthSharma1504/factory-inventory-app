import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import PurchaseForm from '../../components/PurchaseForm';

interface Purchase {
  _id: string;
  product: { name: string };
  quantity: number;
  purchaseDate: string;
  supplier: string;
  cost: number;
}

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/purchases');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };
    fetchPurchases();
  }, [refresh]);

  const handlePurchaseAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Purchases</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Purchase</h2>
          <PurchaseForm onSubmit={handlePurchaseAdded} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Purchase List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Supplier</th>
                <th className="py-2 px-4 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase._id} className="border-b">
                  <td className="py-2 px-4">{purchase.product.name}</td>
                  <td className="py-2 px-4">{purchase.quantity}</td>
                  <td className="py-2 px-4">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{purchase.supplier || 'N/A'}</td>
                  <td className="py-2 px-4">${purchase.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;