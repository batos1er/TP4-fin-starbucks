import { useState } from "react";
import { OrderDetailsLayout } from "tp-kit/components";
import { OrderData } from "tp-kit/types";

export function RealTimeOrderDetail(props : {order : OrderData}){
    const [commande, setCommande] = useState(props.order)

    return <OrderDetailsLayout order={commande} />
}