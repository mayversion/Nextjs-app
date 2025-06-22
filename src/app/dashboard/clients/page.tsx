'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ClientTable } from '@/components/ClientTable';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import useClientStore from '@/store/clientStore';
import { Client } from '@/types/client';

type SortField = 'firstName' | 'lastName' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

export default function ClientsPage() {
  const { clients, initializeClients, isInitialized } = useClientStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isInitialized) {
      initializeClients();
    }
  }, [isInitialized, initializeClients]);

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter((client: Client) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        client.firstName.toLowerCase().includes(searchTerm) ||
        client.lastName.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.phone.includes(searchTerm)
      );
    });

    return filtered.sort((a: Client, b: Client) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [clients, searchQuery, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedClients.length / ITEMS_PER_PAGE);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedClients, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (!isInitialized) {
      return <div>Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Liste des clients</h1>
          <p className="text-gray-600">Gérez vos clients existants.</p>
        </div>
        <Link href="/dashboard/add-client">
          <Button>Ajouter un client</Button>
        </Link>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                onSearch={(query) => {
                  setSearchQuery(query);
                  setCurrentPage(1); // Reset to first page on new search
                }}
                placeholder="Rechercher un client..."
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredAndSortedClients.length} client{filteredAndSortedClients.length > 1 ? 's' : ''} trouvé{filteredAndSortedClients.length > 1 ? 's' : ''}
            </div>
        </div>
        <ClientTable 
            clients={paginatedClients} 
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-4"
        />
      </Card>
    </div>
  );
} 