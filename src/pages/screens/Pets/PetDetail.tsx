import { useParams } from "react-router";

export const PeetDetail = () => {
    const { id } = useParams<{ id: string }>();
    return (
      <div>
         Detalle de Mascota {id}
      </div>
    )
  }