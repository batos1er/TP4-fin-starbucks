import { SupabaseClient } from "@supabase/supabase-js";

export default async function getUser(client: SupabaseClient){
    return (await client.auth.getUser())?.data?.user ?? null;
}