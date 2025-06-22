'use client';

import { useRouter } from 'next/navigation';
import { Client } from '@/types/client';
import { Table, TableHeader, TableBody, TableCell } from '@/components/ui/Table';

// Pass down sorting state and handlers from the parent page
interface ClientTableProps {
  clients: Client[];
  onSort: (field: any) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onSort,
  sortField,
  sortDirection,
}) => {
  const router = useRouter();

  const handleClientClick = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}`);
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <span className="ml-1 opacity-40">↕️</span>;
    return sortDirection === 'asc' ? <span className="ml-1">🔼</span> : <span className="ml-1">🔽</span>;
  };
  
  const headers = [
      { key: 'firstName', label: 'Nom' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Téléphone' },
      { key: 'createdAt', label: 'Date de création' },
  ]

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
            {headers.map(header => (
                 <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => onSort(header.key)} className="flex items-center">
                        {header.label}
                        <SortIcon field={header.key} />
                    </button>
                 </th>
            ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tags
          </th>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
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

      {clients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              Essayez de modifier votre recherche ou d'ajouter un nouveau client.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 