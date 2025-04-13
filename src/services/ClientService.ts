import { BaseUrl } from "./Api";

export const saveClient = async (clientData: any) => {
  try {
    const formData = new FormData();

    // Añadir campos uno por uno
    formData.append("ci", clientData.ci);
    formData.append("name", clientData.name);
    formData.append("lastname", clientData.lastname);
    formData.append("birthdate", clientData.birthdate?.toISOString() || "");
    formData.append("email", clientData.email);
    formData.append("phone", clientData.phone);
    formData.append("gender", clientData.gender);
    formData.append("country", clientData.country);
    formData.append("address", clientData.address);
    formData.append("type", clientData.type);

    // Agregar imagen solo si existe
    if (clientData.image) {
      formData.append("image", clientData.image);
    }

    const response = await fetch(`${BaseUrl}client`, {
      method: "POST",
      body: formData, // 👈 sin headers aquí, el navegador los configura automáticamente
    });

    if (!response.ok) {
      throw new Error("Error al guardar el cliente");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
