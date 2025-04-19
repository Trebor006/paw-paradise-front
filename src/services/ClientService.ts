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

export const getClientByCi = async (ci: string) => {
  try {
    const response = await fetch(`${baseUrl}/clientes/getBy/${ci}`);
    console.log(response);
    if (!response.ok) {
      console.log("error");
      throw new Error("Error al obtener el cliente");
    }
    console.log("response: ",response);
    //return response;
    const {data} = await response.json(); // Convertir la respuesta a JSON
    // console.log("data: ", data.data);
    return data; // Retornar el objeto tipado
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    throw error;
  }
};

// Actualizar cliente
export const updateClient = async (
  ci: string,
  clientData: ClientTypeForm
): Promise<void> => {
  try {
    let base64Image = null;

    if (clientData.image instanceof File) {
      base64Image = await toBase64(clientData.image);
    } else if (typeof clientData.image === 'string') {
      base64Image = clientData.image; // Ya está en base64
    } else {
      base64Image = null; // Si no hay imagen
    }

    const clientPayload = {
      ...clientData,
      image: base64Image, // si no hay imagen será null
    };

    await fetch(`${baseUrl}/clientes/${ci}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientPayload),
    });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
};

export const getClients = async () => {
  try {
    // Realizamos la petición GET para obtener todos los clientes
    const response = await fetch(`${baseUrl}/clientes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error("Error al obtener los clientes");
    }

    // Parseamos la respuesta en JSON
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-lanzamos el error para ser manejado por el componente que lo llame
  }
};