'use client';

import { ClientForm } from '@/components/ClientForm';
import { Card } from '@/components/ui/Card';
import useClientStore from '@/store/clientStore';
import { Client } from '@/types/client';

export default function AddClientPage() {
  const addClient = useClientStore((state: any) => state.addClient);
  
  const handleAddClient = (data: Omit<Client, 'id' | 'createdAt' | 'tags'>) => {
    addClient(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ajouter un client</h1>
        <p className="text-gray-600">
          Remplissez le formulaire ci-dessous pour créer une nouvelle fiche client.
        </p>
      </div>

      <Card>
        <ClientForm onSubmit={handleAddClient} />
      </Card>
    </div>
  );
} 