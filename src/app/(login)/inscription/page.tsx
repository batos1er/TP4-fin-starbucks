"use client"

import { TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from 'tp-kit/components';


export default function InscriptionPage() {
    return (
    <form>
        <TextInput withAsterisk label="Email" placeholder="Entrez une adresse mail"/>
        <PasswordInput withAsterisk label="Mot de Passe"/>
        <Button type="submit">Se connecter</Button>
    </form>
    );
}