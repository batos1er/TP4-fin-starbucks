'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "tp-kit/components/button";

export default function Deconnexion(){
    const supabase = createClientComponentClient();
    const router = useRouter()
    async function deconnexion(){
      await supabase.auth.signOut();
      router.refresh();
    }
    return <>
        <Button variant="outline" className="w-full my-4" onClick={deconnexion}>Se déconnecter</Button>
    </>
}