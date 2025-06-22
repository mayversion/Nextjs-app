import create from 'zustand';
import { Client } from '@/types/client';
import { mockClients } from '@/data/mockClients';
import { v4 as uuidv4 } from 'uuid';

interface ClientState {
  clients: Client[];
  isInitialized: boolean;
  initializeClients: () => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'tags'>) => void;
  getClientById: (id: string) => Client | undefined;
}

const useClientStore = create<ClientState>((set, get) => ({
  clients: [],
  isInitialized: false,

  initializeClients: () => {
    if (get().isInitialized) return;
    
    try {
        if (typeof window !== 'undefined') {
            const savedClients = localStorage.getItem('clients');
            if (savedClients) {
                set({ clients: JSON.parse(savedClients), isInitialized: true });
            } else {
                set({ clients: mockClients, isInitialized: true });
                localStorage.setItem('clients', JSON.stringify(mockClients));
            }
        }
    } catch (error) {
        console.error("Failed to initialize clients from localStorage, using mock data.", error);
        set({ clients: mockClients, isInitialized: true });
    }
  },

  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      tags: [], 
    };
    set((state) => {
      const updatedClients = [...state.clients, newClient];
      if (typeof window !== 'undefined') {
        localStorage.setItem('clients', JSON.stringify(updatedClients));
      }
      return { clients: updatedClients };
    });
  },

  getClientById: (id: string) => {
    return get().clients.find((client) => client.id === id);
  },
}));

export default useClientStore; 