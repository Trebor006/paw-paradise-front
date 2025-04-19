import { useParams } from "react-router";

export const ClientDetail = () => {
    const { id } = useParams<{ id: string }>();
    return (
      <div>
         Detalle Cliente {id}
      </div>
    )
  }