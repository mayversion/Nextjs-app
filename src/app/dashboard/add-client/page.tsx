'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientForm } from '@/components/ClientForm';
import { Card } from '@/components/ui/Card';
import { ClientFormData, Client } from '@/types/client';
import { mockClients } from '@/data/mockClients';

export default function AddClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (data: ClientFormData) => {
    setLoading(true);
    setSuccessMessage('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newClient: Client = {
      id: `C${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      tags: [],
      activities: []
    };

    if (typeof window !== 'undefined') {
      const savedClients = localStorage.getItem('clients');
      const clients = savedClients ? JSON.parse(savedClients) : mockClients;
      localStorage.setItem('clients', JSON.stringify([newClient, ...clients]));
    }
    
    setLoading(false);
    setSuccessMessage('Client ajouté avec succès !');

    setTimeout(() => {
      router.push('/dashboard/clients');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ajouter un nouveau client</h1>
        <p className="text-gray-600">Remplissez les informations ci-dessous.</p>
      </div>

      <Card className="max-w-2xl">
        <ClientForm onSubmit={handleSubmit} loading={loading} />

        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded-lg">
            {successMessage}
          </div>
        )}
      </Card>
    </div>
  );
} 