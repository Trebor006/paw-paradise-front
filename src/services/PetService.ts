import { PetTypeForm } from "../types/PetType";
import { baseUrl } from "./Api";

// Función para convertir la imagen a Base64 si es un archivo
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Lee el archivo como base64
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Función para guardar la mascota
export const savePet = async (petData: PetTypeForm) => {
  try {
    let base64Image = null;

    // Si hay una imagen, la convertimos a Base64
    if (petData.image) {
      base64Image = await toBase64(petData.image);
      console.log("base64Image: ", base64Image);
    }
    // Creamos el payload con los datos de la mascota, incluyendo la imagen en base64
    const petPayload = {
      ...petData,
      //image: base64Image, 
      image: '', 
    };

    // Realizamos la petición POST para guardar la mascota
    const response = await fetch(`${baseUrl}/mascotas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petPayload),
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error("Error al guardar la mascota");
    }

    // Parseamos la respuesta en JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-lanzamos el error para ser manejado por el componente que lo llame
  }
};

