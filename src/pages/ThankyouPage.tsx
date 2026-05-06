import { useParams } from "react-router-dom";

export const ThankyouPage = () => {
  const { id } = useParams<{ id: string }>();

  const

  return (
    <div>Gracias por tu compra - PEDIDO # {id}</div>
  )
};
