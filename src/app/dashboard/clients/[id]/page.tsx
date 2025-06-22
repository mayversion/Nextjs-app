'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import useClientStore from '@/store/clientStore';
import { Client } from '@/types/client';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const { initializeClients, isInitialized } = useClientStore();
  const client = useClientStore((state) => state.clients.find((c) => c.id === params.id));

  useEffect(() => {
    if (!isInitialized) {
      initializeClients();
    }
  }, [isInitialized, initializeClients]);

  if (!isInitialized || !client) {
    return (
      <div className="flex justify-center items-center h-full">
        <div>Chargement du client...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {client.firstName} {client.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{client.email}</p>
              <p className="text-gray-600">{client.phone}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <span className="text-sm text-gray-500">
                Client depuis le {new Date(client.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Tags</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {client.tags && client.tags.length > 0 ? client.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {tag}
                  </span>
                )) : <p className="text-sm text-gray-500">Aucun tag pour ce client.</p>}
              </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">Historique d'activité</h2>
          <div className="mt-4 space-y-4">
            {client.activities && client.activities.length > 0 ? (
              client.activities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                     <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                           {activity.type === 'call' ? '📞' : '✉️'}
                        </span>
                     </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune activité enregistrée pour ce client.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 