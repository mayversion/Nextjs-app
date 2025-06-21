'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ClientFormData } from '@/types/client';

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  loading?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>();

  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Le numéro de téléphone doit contenir 10 chiffres.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleFormSubmit = (data: ClientFormData) => {
    if (validatePhone(data.phone)) {
      onSubmit(data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Prénom"
        {...register('firstName', { required: 'Le prénom est requis' })}
        error={errors.firstName?.message}
      />
      <Input
        label="Nom"
        {...register('lastName', { required: 'Le nom est requis' })}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'L\'email est requis',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Adresse email invalide',
          },
        })}
        error={errors.email?.message}
      />
      <Input
        label="Téléphone"
        type="tel"
        {...register('phone')}
        error={phoneError}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Enregistrement...' : 'Enregistrer le client'}
      </Button>
    </form>
  );
}; 