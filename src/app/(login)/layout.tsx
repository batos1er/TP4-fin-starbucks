import { ReactNode } from "react";
import { Card, SectionContainer, ZodI18nProvider } from "tp-kit/components";
import getUser from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient({cookies});
  const sessionUsers = await getUser(supabase);
  if (sessionUsers){
    redirect("/mon-compte");
  }

  return (
    <SectionContainer>
        <Card className="w-full max-w-md mx-auto my-24">
            <ZodI18nProvider>
                {children}
            </ZodI18nProvider>
        </Card>
    </SectionContainer>
  );
}
