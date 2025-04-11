import { useParams } from "react-router";

export const PeetEdit = () => {
    const { id } = useParams<{ id: string }>();
    return (
      <div>
         Editar Mascota {id}
      </div>
    )
  }