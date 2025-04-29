import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
);

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const protectedRoutes = ['/products', '/purchases', '/departments', '/consumptions'];
      if (!token && protectedRoutes.includes(router.pathname)) {
        router.push('/login');
      }
    }
  }, [router]);

  if (!isClient) return null;

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default MyApp;