'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Client, Activity } from '@/types/client';
import { mockClients } from '@/data/mockClients';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && params.id) {
      const savedClients = localStorage.getItem('clients');
      const clients = savedClients ? JSON.parse(savedClients) : mockClients;
      const foundClient = clients.find((c: Client) => c.id === params.id);
      
      if (foundClient) {
        setClient(foundClient);
      }
      setLoading(false);
    }
  }, [params.id]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'note':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getActivityTypeLabel = (type: Activity['type']) => {
    const labels = {
      call: 'Appel',
      email: 'Email',
      meeting: 'Réunion',
      note: 'Note'
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Client non trouvé</h1>
        <Button onClick={() => router.push('/dashboard/clients')}>
          Retour à la liste des clients
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-2"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {client.firstName} {client.lastName}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Informations client">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Prénom</label>
                <div className="mt-1 text-lg text-gray-900">{client.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Nom</label>
                <div className="mt-1 text-lg text-gray-900">{client.lastName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-lg text-gray-900">
                  <a href={`mailto:${client.email}`} className="text-primary-600 hover:text-primary-700">
                    {client.email}
                  </a>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                <div className="mt-1 text-lg text-gray-900">
                  <a href={`tel:${client.phone}`} className="text-primary-600 hover:text-primary-700">
                    {client.phone}
                  </a>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date de création</label>
                <div className="mt-1 text-lg text-gray-900">
                  {new Date(client.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {client.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {(!client.tags || client.tags.length === 0) && (
                    <span className="text-gray-500">Aucun tag</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Actions rapides">
            <div className="space-y-3">
              <Button className="w-full" variant="primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Appeler
              </Button>
              <Button className="w-full" variant="secondary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Envoyer un email
              </Button>
              <Button className="w-full" variant="secondary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8V9m0 0V7m0 2h4m-4 0H8m8 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z" />
                </svg>
                Planifier une réunion
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Historique des activités">
        <div className="space-y-4">
          {client.activities && client.activities.length > 0 ? (
            client.activities
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {getActivityTypeLabel(activity.type)}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Aucune activité enregistrée pour ce client
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 