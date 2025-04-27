import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const protectedRoutes = ['/products', '/purchases', '/departments', '/consumptions'];
    if (!token && protectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;