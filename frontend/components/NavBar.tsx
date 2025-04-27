import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Factory Inventory
        </Link>
        <div className="space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;