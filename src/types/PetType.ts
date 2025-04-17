export type PetTypeForm = {
  ci: string;         // Identificador único (similar al CI de un cliente)
  name: string;       // Nombre de la mascota
  type: string;       // Tipo de mascota (por ejemplo, "Dog", "Cat", etc.)
  gender: string;     // Género de la mascota (por ejemplo, "Male", "Female")
  breed: string;      // Raza de la mascota
  birthdate: Date | null; // Fecha de nacimiento en formato ISO (ejemplo: "2020-05-15")
  image: File | null;
};
