"use client"

import { TextInput, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, NoticeMessage, NoticeMessageData, useZodI18n } from 'tp-kit/components';
import {z} from "zod";


const schema = z.object({
    email: z.string().email().nonempty(),
    mdp:  z.string().min(6)
})

type FormValues = z.infer<typeof schema>;

export default function ConnexionPage() {
    useZodI18n(z);
    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
          email: '',
          mdp: '',
        },
    });
    const router = useRouter()
    const supabase = createClientComponentClient();

    async function handleSignIn(Values: FormValues){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: Values.email,
            password: Values.mdp
        })
        if(error){
            setNotices([{type:"error", message:error.message}]);
        }
        else{
            router.refresh();
            router.push("/");
        }
    }
    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    return (
    <form className='flex flex-col justify-center' onSubmit={form.onSubmit(handleSignIn)}>
        {notices.map((notice) => (
                    <NoticeMessage type={notice.type} message={notice.message}/>
        ))}
        <h1 className='font-bold'>CONNEXION</h1>
        <TextInput withAsterisk className="mt-10" label="Email" placeholder="Entrez une adresse mail" {...form.getInputProps('email')}/>
        <PasswordInput withAsterisk className="mt-6" label="Mot de Passe" {...form.getInputProps('mdp')}/>
        <Button type="submit" className="mt-6">Se connecter</Button>
        <Link href="/inscription" className='text-center mt-6 text-brand'>Créer un compte</Link>
    </form>
    );
}