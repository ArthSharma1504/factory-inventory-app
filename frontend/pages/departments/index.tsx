import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import DepartmentForm from '../../components/DepartmentForm';

interface Department {
  _id: string;
  name: string;
  description: string;
}

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, [refresh]);

  const handleDepartmentAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Departments</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Department</h2>
          <DepartmentForm onSubmit={handleDepartmentAdded} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Department List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id} className="border-b">
                  <td className="py-2 px-4">{department.name}</td>
                  <td className="py-2 px-4">{department.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;