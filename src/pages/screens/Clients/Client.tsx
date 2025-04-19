import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getClients, deleteClient } from "../../../services/ClientService";
import { Modal } from "../../../components/ui/modal";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
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

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      await deleteClient(clientToDelete.ci);
      setClients(prev => prev.filter(c => c.id !== clientToDelete.ci));
      setModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
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
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
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
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() => navigate(`/client/${client.ci}/edit`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487a2.18 2.18 0 113.084 3.084L7.125 20.4 2 22l1.6-5.125L16.862 4.487z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setClientToDelete(client);
                          setModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} >
        <div className="p-6 text-center ">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            ¿Estás seguro de que deseas eliminar este cliente?
          </h2>
          <p className="text-gray-600 mb-6">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};