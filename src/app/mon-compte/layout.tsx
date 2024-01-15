import { ReactNode } from "react";
import { Button, Card, SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import getUser from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers';
import { redirect } from "next/navigation";
import Deconnexion from "./deconnexion";

export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany();
  const supabase = createServerComponentClient({cookies});
  const sessionUsers = await getUser(supabase);
  if (!sessionUsers){
    redirect("/connexion");
  }


  return (<>
      
      <SectionContainer wrapperClassName="py-24 min-h-[80vh] flex flex-row gap-6">
      <Card className="mr-12 w-[45rem] h-fit space-y-7">
        <h2>MON COMPTE</h2>
        <p>Bonjour, {sessionUsers.user_metadata.name} !</p>
        <p><span className="font-bold">Nom </span>: {sessionUsers.user_metadata.name}<br></br><span className="font-bold">Email </span>: {sessionUsers.email}</p>
        <Deconnexion></Deconnexion>
      </Card>

        <div className="bg-white rounded-lg p-6 shadow-lg min-h-[80vh] w-full">
          <OrderTable orders={orders} />
        </div>
        
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
