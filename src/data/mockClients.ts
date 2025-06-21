import { Client } from '@/types/client';

export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Mohamed',
    lastName: 'Belkacem',
    email: 'mohamed.belkacem@email.dz',
    phone: '+213 555 12 34 56',
    createdAt: '2024-01-15',
    tags: ['VIP', 'Entreprise'],
    activities: [
      {
        id: '1',
        type: 'call',
        description: 'Appel de suivi pour le contrat',
        date: '2024-06-15'
      },
      {
        id: '2',
        type: 'email',
        description: 'Envoi de la nouvelle proposition commerciale',
        date: '2024-06-10'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Haddad',
    email: 'fatima.haddad@company.dz',
    phone: '+213 661 98 76 54',
    createdAt: '2024-02-20',
    tags: ['Prospect'],
    activities: [
      {
        id: '3',
        type: 'meeting',
        description: 'Réunion de présentation à Alger',
        date: '2024-06-12'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Amina',
    lastName: 'Cherif',
    email: 'amina.cherif@startup.dz',
    phone: '+213 770 11 22 33',
    createdAt: '2024-03-10',
    tags: ['Startup', 'Tech'],
    activities: []
  },
  {
    id: '4',
    firstName: 'Yacine',
    lastName: 'Brahimi',
    email: 'yacine.brahimi@gmail.com',
    phone: '+213 550 44 33 22',
    createdAt: '2024-04-05',
    tags: ['Particulier'],
    activities: [
      {
        id: '4',
        type: 'note',
        description: 'Client intéressé par les services de développement web',
        date: '2024-06-18'
      }
    ]
  }
]; 