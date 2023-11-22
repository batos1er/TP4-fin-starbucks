"use client"

import { TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from 'tp-kit/components';


export default function ConnexionPage() {
    return (
    <form className='flex-col place-content-center'>
        <TextInput withAsterisk label="Nom" placeholder="Entrez un nom"/>
        <TextInput withAsterisk label="Email" placeholder="Entrez une adresse mail"/>
        <PasswordInput withAsterisk label="Mot de Passe"/>
        <Button type="submit">S'inscrire</Button>
    </form>
    );
}