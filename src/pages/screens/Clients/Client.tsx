import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getClients } from "../../../services/ClientService";
import { SearchInput } from "../../../components/form/input/SearchInput";

interface Client {
  id: number;
  ci: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export const Client = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    `${client.name} ${client.lastname} ${client.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Listado de Clientes</h2>
        <button
          onClick={() => navigate("/client/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Crear Cliente
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {loading ? (
          <p className="text-gray-600">Cargando clientes...</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Escribe un nombre o correo..."
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CI</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Celular</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4">{client.id}</td>
                    <td className="px-6 py-4">{client.ci}</td>
                    <td className="px-6 py-4">{client.name} {client.lastname}</td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/client/edit/${client.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};