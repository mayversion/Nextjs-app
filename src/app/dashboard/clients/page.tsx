'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { ClientTable } from '@/components/ClientTable';
import { Button } from '@/components/ui/Button';
import { mockClients } from '@/data/mockClients';
import { Client } from '@/types/client';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedClients = localStorage.getItem('clients');
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      } else {
        setClients(mockClients);
        localStorage.setItem('clients', JSON.stringify(mockClients));
      }
    }
  }, []);

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
        <ClientTable clients={clients} />
      </Card>
    </div>
  );
} 