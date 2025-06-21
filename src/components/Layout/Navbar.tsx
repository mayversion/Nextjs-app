'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary-600">Mini CRM</h1>
            </Link>
            
            <div className="ml-10 flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/clients"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clients
              </Link>
              <Link
                href="/dashboard/add-client"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Ajouter un client
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 