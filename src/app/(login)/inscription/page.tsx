"use client"

import { TextInput, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { Button } from 'tp-kit/components';
import {z} from "zod";

const schema = z.object({
    nom: z.string().nonempty(),
    email: z.string().email().nonempty(),
    mdp:  z.string().min(6)
})

type FormValues = z.infer<typeof schema>;

export default function InscriptionPage() {
    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
          nom: '',
          email: '',
          mdp: '',
        },
      });

    return (
    <form className='flex flex-col justify-center' onSubmit={form.onSubmit((values) => console.log(values))}>
        <h1 className='font-bold'>INSCRIPTION</h1>
        <TextInput withAsterisk className="mt-10" label="Nom" placeholder="Entrez un nom" {...form.getInputProps('nom')}/>
        <TextInput withAsterisk className="mt-6" label="Email" placeholder="Entrez une adresse mail" {...form.getInputProps('email')}/>
        <PasswordInput withAsterisk className="mt-6" label="Mot de Passe" {...form.getInputProps('mdp')}/>
        <Button type="submit" className="mt-6 center">S'inscrire</Button>
        <Link href="/connexion" className='text-center mt-6 text-brand'>Déjà un compte ? Se connecter</Link>
    </form>
    );
}

