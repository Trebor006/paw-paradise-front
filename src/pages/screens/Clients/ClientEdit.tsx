import { useParams } from "react-router";

export const ClientEdit = () => {
    const { id } = useParams<{ id: string }>();
    return (
      <div>
         Editar Cliente {id}
      </div>
    )
  }