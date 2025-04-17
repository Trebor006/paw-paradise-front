import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ComponentCardNormal from "../../../components/common/ComponentCardNormal.tsx";
import PageBreadcrumbs from "../../../components/common/PageBreadCrumbs.tsx";
import PageMeta from "../../../components/common/PageMeta.tsx";
import { DatePick } from "../../../components/form/form-elements/DatePick.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Label from "../../../components/form/Label.tsx";
import Select from "../../../components/form/Select.tsx";
import { toast } from "react-toastify";
import { savePet } from "../../../services/PetService.ts"; 
import { getClients } from "../../../services/ClientService.ts";// Asumiendo que tienes un servicio para guardar mascotas
import Button from "../../../components/ui/button/Button.tsx";
import { PetTypeForm } from "../../../types/PetType.ts"; // Asegúrate de tener este tipo en tu archivo de tipos
import FileInput from "../../../components/form/input/FileInput.tsx";
interface Client {
  id: number;
  ci: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  birthdate: string;
  type: string;
  address: string;
  country: string;
}
const genderOptions = [
  { value: "Male", label: "Masculino" },
  { value: "Female", label: "Femenino" },
];

const typeOptions = [
  { value: "Dog", label: "Perro" },
  { value: "Cat", label: "Gato" },
  // Agrega más tipos de mascotas si lo deseas
];

export const PetCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [formPet, setFormPet] = useState<PetTypeForm>({
    ci: "",
    name: "",
    type: "Dog", // Valor por defecto
    gender: "Male", // Valor por defecto
    breed: "",
    birthdate: null as Date | null,
    image: null,
  });
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [errors, setErrors] = useState({
    ci: "",
    name: "",
    breed: "",
  });

  // Obtener los clientes desde el endpoint
  useEffect(() => {
    const fetchClients = async () => {
      setClients(await getClients());
    };
    fetchClients();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedClient(value);
    setFormPet({ ...formPet, ci: value })
  };

  // Mapeamos los clientes para generar las opciones
  const clientOptions = clients.map((client) => ({
    value: client.ci, // Aquí es donde decides si usar `personCi` o `id`
    label: `${client.name} (${client.ci})`, // Etiqueta visible con nombre y cédula
  }));
  const handleGenderChange = (value: string) => {
    setFormPet({ ...formPet, gender: value });
  };

  const handleTypeChange = (value: string) => {
    setFormPet({ ...formPet, type: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormPet({ ...formPet, image: event.target.files[0] });
    }
  };

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formPet.ci.trim()) {
      newErrors.ci = "El Cliente es obligatorio";
      isValid = false;
    } else {
      newErrors.ci = "";
    }

    if (!formPet.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!formPet.breed.trim()) {
      newErrors.breed = "La raza es obligatoria";
      isValid = false;
    } else {
      newErrors.breed = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormPet({
      ci: "",
      name: "",
      type: "Dog",
      gender: "Male",
      breed: "",
      birthdate: null as Date | null,
      image: null,
    });
    setErrors({
      ci: "",
      name: "",
      breed: "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("formPet: ", formPet);
    try {
      if (validate()) {
        await savePet(formPet);
        toast.success("Mascota creada con éxito!", {
          position: "bottom-right",
          draggable: true,
        });
        resetForm();
        navigate("/pet");
      } else {
        console.log("Errores en el formulario");
      }
    } catch (error) {
      toast.error("Error al crear la mascota", {
        position: "bottom-right",
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="PPAdmin" description="Formulario para crear mascota" />
      <PageBreadcrumbs
        breadcrumbs={[
          { title: "Home", url: "/" },
          { title: "Mascotas", url: "/pet" },
          { title: "Crear mascota" },
        ]}
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCardNormal>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">Cliente<span className="text-red-600">*</span></Label>
                <Select
                options={clientOptions}
                onChange={handleSelectChange}
                placeholder="Select a client"
                defaultValue={selectedClient}
              />
              {errors.ci && (
                <p className="text-red-500 text-sm mt-1">{errors.ci}</p>
              )}
              </div>
              <div>
                <Label htmlFor="input">Nombre<span className="text-red-600">*</span></Label>
                <Input
                  type="text"
                  id="input"
                  value={formPet.name}
                  error={errors.name ? true : false}
                  hint={errors.name ? errors.name : ""}
                  onChange={(e) =>
                    setFormPet({ ...formPet, name: e.target.value })
                  }
                  placeholder="Introduzca el nombre de la mascota"
                />
              </div>
              <div>
                <Label htmlFor="input">Raza<span className="text-red-600">*</span></Label>
                <Input
                  type="text"
                  id="input"
                  value={formPet.breed}
                  error={errors.breed ? true : false}
                  hint={errors.breed ? errors.breed : ""}
                  onChange={(e) =>
                    setFormPet({ ...formPet, breed: e.target.value })
                  }
                  placeholder="Introduzca la raza de la mascota"
                />
              </div>
              <div>
                <Label htmlFor="input">Fecha de nacimiento</Label>
                <DatePick
                  selectedDate={formPet.birthdate}
                  onChange={(date) =>
                    setFormPet({ ...formPet, birthdate: date })
                  }
                />
              </div>
              <div>
                <Label htmlFor="input">Tipo de mascota</Label>
                <Select
                  options={typeOptions}
                  placeholder="Seleccione una opción"
                  onChange={handleTypeChange}
                />
              </div>
              <div>
                <Label htmlFor="input">Género</Label>
                <Select
                  options={genderOptions}
                  placeholder="Seleccione una opción"
                  onChange={handleGenderChange}
                />
              </div>
              <div >
                <Label htmlFor="input">Imagen</Label>
                <FileInput onChange={handleImageChange} className="custom-class" />
              </div>
            </div>
          </ComponentCardNormal>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-end space-x-4">
            <Button
              variant={"primary"}
              size="sv"
              loading={loading}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
