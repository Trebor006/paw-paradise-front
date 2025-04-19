import { useParams } from "react-router";

export const ReserveEdit = () => {
    const { id } = useParams<{ id: string }>();
    return (
      <div>
         Editar reserva {id}
      </div>
    )
  }