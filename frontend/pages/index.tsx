import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Factory Inventory Management</title>
        <meta name="description" content="Manage factory inventory digitally" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Factory Inventory Management</h1>
        <p className="text-lg">Track products purchased and consumed by departments.</p>
      </main>
    </div>
  );
};

export default Home;