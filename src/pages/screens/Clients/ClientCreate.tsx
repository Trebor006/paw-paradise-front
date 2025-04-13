import { useState } from "react";
import ComponentCardNormal from "../../../components/common/ComponentCardNormal";
import PageBreadcrumbs from "../../../components/common/PageBreadCrumbs";
import PageMeta from "../../../components/common/PageMeta";
import { DatePick } from "../../../components/form/form-elements/DatePick";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { EnvelopeIcon } from "../../../icons";
import { countries } from "../../../services/Countries";
import Button from "../../../components/ui/button/Button";
// import { saveClient } from "../../../services/ClientService";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const options = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Femenino" },
];

interface formClientProps {
  ci: string;
  name: string;
  lastname: string;
  birthdate: Date | null;
  email: string;
  phone: string;
  gender: string;
  country: string;
  address: string;
  image: File | null;
  type: string;
}

export const ClientCreate = () => {
  const [loading, setLoading] = useState(false);
  const [formClient, setFormClient] = useState<formClientProps>({
    ci: "",
    name: "",
    lastname: "",
    birthdate: null as Date | null,
    email: "",
    phone: "",
    gender: "",
    country: "",
    address: "",
    image: null,
    type: "c",
  });

  const handleCountryChange = (value: string) => {
    setFormClient({ ...formClient, country: value });
  };
  const handleGenderChange = (value: string) => {
    setFormClient({ ...formClient, gender: value });
  };
  const validateForm = () => {
    // Aquí puedes agregar la lógica de validación
    // Verificar si todos los campos requeridos están llenos
    const isValid = Object.values(formClient).every((field) => field !== "");
    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      //Validación
      if (!validateForm) {
        toast.error("Por favor complete todos los campos", {
          position: "bottom-right",
          draggable: true,
        });
        return;
      }
      //prueba
      setTimeout(() => {
        console.log(formClient);
        toast.success("Cliente creado con éxito!", {
          position: "bottom-right",
          draggable: true,
        });
        setLoading(false); // <- aquí dentro del timeout
      }, 2000);
      // const response = await saveClient(formClient);
      // if (!response.ok) {
      //   throw new Error("Error al crear el cliente");
      // }
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      toast.error("Error al crear el cliente", {
        position: "bottom-right",
        draggable: true,
      });
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="PPAdmin"
        description="This is React.ts from elements createClient page for PPAdmin"
      />
      <PageBreadcrumbs
        breadcrumbs={[
          { title: "Home", url: "/" },
          { title: "Cliente", url: "/client" },
          { title: "Crear cliente" },
        ]}
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCardNormal>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">
                  CI<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="text"
                  id="input"
                  value={formClient.ci}
                  onChange={(e) =>
                    setFormClient({ ...formClient, ci: e.target.value })
                  }
                  placeholder="Introduzca su carnet de identidad"
                />
              </div>
              <div>
                <Label htmlFor="input">
                  Nombre<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="text"
                  id="input"
                  value={formClient.name}
                  onChange={(e) =>
                    setFormClient({ ...formClient, name: e.target.value })
                  }
                  placeholder="Introduzca su nombre"
                />
              </div>
              <div>
                <Label htmlFor="input">Apellido</Label>
                <Input
                  type="text"
                  id="input"
                  value={formClient.lastname}
                  onChange={(e) =>
                    setFormClient({ ...formClient, lastname: e.target.value })
                  }
                  placeholder="Introduzca su apellido paterno y materno"
                />
              </div>
              <div>
                <Label htmlFor="datePicker">Fecha de nacimiento</Label>
                <DatePick
                  selectedDate={formClient.birthdate}
                  onChange={(date) =>
                    setFormClient({ ...formClient, birthdate: date })
                  }
                />
              </div>
              <div>
                <Label htmlFor="input">Correo</Label>
                <div className="relative">
                  <Input
                    placeholder="info@gmail.com"
                    type="text"
                    value={formClient.email}
                    onChange={(e) =>
                      setFormClient({ ...formClient, email: e.target.value })
                    }
                    className="pl-[62px]"
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <EnvelopeIcon className="size-5" />
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="input">País</Label>
                <Select
                  options={countries}
                  placeholder="Seleccione una opción"
                  onChange={handleCountryChange} // Solo pasas el valor
                  className="dark:bg-dark-900"
                />
              </div>
              <div>
                <Label htmlFor="input">Celular</Label>
                <Input
                  type="tel"
                  id="input"
                  value={formClient.phone}
                  onChange={(e) =>
                    setFormClient({ ...formClient, phone: e.target.value })
                  }
                  placeholder="Introduzca su número de celular"
                />
              </div>
              <div>
                <Label htmlFor="input">Género</Label>
                <Select
                  options={options}
                  placeholder="Seleccione una opción"
                  onChange={handleGenderChange}
                  className="dark:bg-dark-900"
                />
              </div>
              <div>
                <Label htmlFor="input">Dirección</Label>
                <Input
                  type="text"
                  id="input"
                  value={formClient.address}
                  onChange={(e) =>
                    setFormClient({ ...formClient, address: e.target.value })
                  }
                  placeholder="Introduzca su dirección"
                />
              </div>
            </div>
          </ComponentCardNormal>
        </div>
        <div className="space-y-6">{/* Fotografía */}</div>
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
      <ToastContainer />
    </div>
  );
};
