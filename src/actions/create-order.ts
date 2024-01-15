"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import getUser from "../utils/supabase";
import { cookies } from "next/headers";

export async function createOrder(cart: CartData) : Promise<{ error: string | null, success: boolean }> {
  const supabase = createServerActionClient({cookies});

  const user = await getUser(supabase);
  if (!user){
    return {error: "Vous n'etes pas connecte", success : false} 
  }


  console.log(await prisma.order.create({
    data: {
      total: computeCartTotal(cart.lines),
      userId: user.id,
      lines: {
        create: cart.lines.map(line => ({
          productId: line.product.id,
          qty: line.qty,
          subtotal: computeLineSubtotal(line)
        }))
      }
    }
  }));
  return {error: null, success : true} 
}