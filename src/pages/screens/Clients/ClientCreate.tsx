import { useState } from "react";
import ComponentCardNormal from "../../../components/common/ComponentCardNormal";
import PageBreadcrumbs from "../../../components/common/PageBreadCrumbs";
import PageMeta from "../../../components/common/PageMeta";
import { DatePick } from "../../../components/form/form-elements/DatePick";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { countries } from "../../../services/Countries";
import Button from "../../../components/ui/button/Button";
import { saveClient } from "../../../services/ClientService";
import { toast } from "react-toastify";
import { ClientTypeForm } from "../../../types/ClientType";
import { useNavigate } from "react-router";

const options = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Femenino" },
];

export const ClientCreate = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [loading, setLoading] = useState(false);
  const [formClient, setFormClient] = useState<ClientTypeForm>({
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
    type: "C",
    role: "Customer",
  });
  const [errors, setErrors] = useState({
    ci: "",
    name: "",
    lastname: "",
    email: "",
  });

  const handleCountryChange = (value: string) => {
    setFormClient({ ...formClient, country: value });
  };
  const handleGenderChange = (value: string) => {
    setFormClient({ ...formClient, gender: value });
  };

  const validate = () => {
    const newErrors = { ...errors }; // Copia del estado de errores
    let isValid = true;

    // Validación de ci (campo obligatorio)
    if (!formClient.ci.trim()) {
      newErrors.ci = "El CI es obligatorio";
      // console.log("CI invalid");
      isValid = false;
    } else {
      newErrors.ci = ""; // Limpiar el error si el campo no está vacío
    }
    // Validación de name (campo obligatorio)
    if (!formClient.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
      // console.log("name invalid");
      isValid = false;
    } else {
      newErrors.name = ""; // Limpiar el error si el campo no está vacío
    }
    // Validación de lastname (campo obligatorio)
    if (!formClient.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio";
      // console.log("apellido invalid");
      isValid = false;
    } else {
      newErrors.lastname = ""; // Limpiar el error si el campo no está vacío
    }
    // Validación de email (campo obligatorio)
    if (!formClient.email.trim()) {
      newErrors.email = "El email es obligatorio";
      // console.log("email invalid");
      isValid = false;
    } else {
      newErrors.email = ""; // Limpiar el error si el campo no está vacío
    }

    setErrors(newErrors); // Actualiza el estado de errores
    return isValid; // Retorna si el formulario es válido o no
  };

  const resetForm = () => {
    setFormClient({
      ci: "",
      name: "",
      lastname: "",
      birthdate: null,
      email: "",
      phone: "",
      gender: "",
      country: "",
      address: "",
      image: null,
      type: "C",
      role: "Customer",
    });
    setErrors({
      ci: "",
      name: "",
      lastname: "",
      email: "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validación del frontend
      if (validate()) {
        await saveClient(formClient);
        toast.success("Cliente creado con éxito!", {
          position: "bottom-right",
          draggable: true,
        });
        resetForm(); // Limpiar el formulario
        navigate("/client"); // Navegar a la vista Client.tsx
      } else {
        console.log("Errores en el formulario");
      }
    } catch (error) {
      toast.error("Error al crear el cliente", {
        position: "bottom-right",
        draggable: true,
      });
    } finally {
      setLoading(false);
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
                  error={errors.ci ? true : false}
                  hint={errors.ci ? errors.ci : ""}
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
                  error={errors.name ? true : false}
                  hint={errors.name ? errors.name : ""}
                  onChange={(e) =>
                    setFormClient({ ...formClient, name: e.target.value })
                  }
                  placeholder="Introduzca su nombre"
                />
              </div>
              <div>
                <Label htmlFor="input">
                  Apellido<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="text"
                  id="input"
                  value={formClient.lastname}
                  error={errors.lastname ? true : false}
                  hint={errors.lastname ? errors.lastname : ""}
                  onChange={(e) =>
                    setFormClient({ ...formClient, lastname: e.target.value })
                  }
                  placeholder="Introduzca su apellido paterno y materno"
                />
              </div>
              <div>
                <Label htmlFor="input">
                  Correo<span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  type="text"
                  value={formClient.email}
                  error={errors.email ? true : false}
                  hint={errors.email ? errors.email : ""}
                  onChange={(e) =>
                    setFormClient({ ...formClient, email: e.target.value })
                  }
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
    </div>
  );
};
