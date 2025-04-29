import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-primary shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight">
          Factory Inventory
        </Link>
        <div className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link href="/products" className="text-white hover:text-gray-200 transition-colors">
                Products
              </Link>
              <Link href="/purchases" className="text-white hover:text-gray-200 transition-colors">
                Purchases
              </Link>
              <Link href="/departments" className="text-white hover:text-gray-200 transition-colors">
                Departments
              </Link>
              <Link href="/consumptions" className="text-white hover:text-gray-200 transition-colors">
                Consumptions
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-200 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;