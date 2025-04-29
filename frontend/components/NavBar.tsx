import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use next/navigation if App Router, otherwise keep next/router

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
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Factory Inventory
        </Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/products" className="text-white hover:text-blue-200">
                Products
              </Link>
              <Link href="/purchases" className="text-white hover:text-blue-200">
                Purchases
              </Link>
              <Link href="/departments" className="text-white hover:text-blue-200">
                Departments
              </Link>
              <Link href="/consumptions" className="text-white hover:text-blue-200">
                Consumptions
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;