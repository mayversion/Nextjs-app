import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { mockClients } from '@/data/mockClients';
import { Client } from '@/types/client';

export default function DashboardPage() {
  const totalClients = mockClients.length;
  const recentClients = mockClients.slice(0, 3);
  const vipClients = mockClients.filter((client: Client) => 
    client.tags?.includes('VIP')
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité client</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{totalClients}</div>
            <div className="text-gray-600">Clients totaux</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{vipClients}</div>
            <div className="text-gray-600">Clients VIP</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">12</div>
            <div className="text-gray-600">Activités ce mois</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Actions rapides">
          <div className="space-y-3">
          </div>
        </Card>
      </div>
    </div>
  );
} 