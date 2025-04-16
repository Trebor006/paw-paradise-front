import { ClientTypeForm } from "../types/ClientType";
import { baseUrl } from "./Api";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Lee el archivo como base64
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const saveClient = async (clientData: ClientTypeForm) => {
  try {
    let base64Image = null;

    if (clientData.image) {
      base64Image = await toBase64(clientData.image);
    }

    const clientPayload = {
      ...clientData,
      image: base64Image, // si no hay imagen será null
    };

    const response = await fetch(`${baseUrl}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientPayload),
    });

    // console.log("response: ",response);
    if (!response.ok) {
      throw new Error("Error al guardar el cliente");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getClientById = async (id: string): Promise<ClientTypeForm> => {
  try {
    const response = await fetch(`${baseUrl}/clientes/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el cliente");
    }
    const data: ClientTypeForm = await response.json(); // Convertir la respuesta a JSON
    return data; // Retornar el objeto tipado
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    throw error;
  }
};

// Actualizar cliente
export const updateClient = async (
  id: string,
  clientData: ClientTypeForm
): Promise<void> => {
  try {
    await fetch(`${baseUrl}/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
};
