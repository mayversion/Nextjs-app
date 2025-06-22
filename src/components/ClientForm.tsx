'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Client } from '@/types/client';

type ClientFormData = Omit<Client, 'id' | 'createdAt' | 'tags' | 'activities'>;

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  defaultValues?: ClientFormData;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({ defaultValues });
  
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit: SubmitHandler<ClientFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    onSubmit(data);
    setSuccessMessage('Client ajouté avec succès !');
    setTimeout(() => {
        router.push('/dashboard/clients');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'Le prénom est obligatoire' })}
            className="mt-1"
          />
          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Le nom est obligatoire' })}
            className="mt-1"
          />
          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'L\'email est obligatoire',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse email invalide',
            },
          })}
          className="mt-1"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <Input
          id="phone"
          {...register('phone', { 
              required: 'Le téléphone est obligatoire',
              pattern: {
                  value: /^(?:\+?213|0)(?:5|6|7)\d{8}$/,
                  message: 'Format de téléphone algérien invalide'
              }
            })}
          className="mt-1"
        />
        {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ajout en cours...' : 'Ajouter le client'}
        </Button>
      </div>

      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded-lg text-center">
            {successMessage}
        </div>
      )}
    </form>
  );
}; 