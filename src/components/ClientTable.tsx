'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Client } from '@/types/client';
import { Table, TableHeader, TableBody, TableCell } from '@/components/ui/Table';
import { SearchBar } from '@/components/SearchBar';

interface ClientTableProps {
  clients: Client[];
}

type SortField = 'firstName' | 'lastName' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

    return filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      if (sortField === 'createdAt') {
        aValue = new Date(a[sortField]);
        bValue = new Date(b[sortField]);
      } else {
        aValue = a[sortField].toLowerCase();
        bValue = b[sortField].toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clients, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleClientClick = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}`);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Rechercher un client..."
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredAndSortedClients.length} client{filteredAndSortedClients.length > 1 ? 's' : ''} trouvé{filteredAndSortedClients.length > 1 ? 's' : ''}
        </div>
      </div>

      <Table>
        <TableHeader>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <button
              onClick={() => handleSort('createdAt')}
              className="flex items-center space-x-1 hover:text-gray-700"
            >
              <span>Date de création</span>
              <SortIcon field="createdAt" />
            </button>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tags
          </th>
        </TableHeader>
        <TableBody>
          {filteredAndSortedClients.map((client) => (
            <tr
              key={client.id}
              onClick={() => handleClientClick(client.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <TableCell>
                <div className="font-medium text-gray-900">
                  {client.firstName} {client.lastName}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-gray-900">{client.email}</div>
              </TableCell>
              <TableCell>
                <div className="text-gray-900">{client.phone}</div>
              </TableCell>
              <TableCell>
                <div className="text-gray-900">
                  {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {client.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>

      {filteredAndSortedClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Essayez de modifier votre recherche.' : 'Commencez par ajouter votre premier client.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 