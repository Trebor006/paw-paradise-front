import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ComponentCardNormal from "../../../components/common/ComponentCardNormal";
import PageBreadcrumbs from "../../../components/common/PageBreadCrumbs";
import PageMeta from "../../../components/common/PageMeta";
import { DatePick } from "../../../components/form/form-elements/DatePick";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
// import Select from "../../../components/form/Select";
import { countries } from "../../../services/Countries";
import Button from "../../../components/ui/button/Button";
import { getClientByCi, updateClient } from "../../../services/ClientService";
import { toast } from "react-toastify";
import { ClientTypeForm } from "../../../types/ClientType";
import SelectForm from "../../../components/form/SelectForm";

const options = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Femenino" },
];

export const ClientEdit = () => {
  const { ci } = useParams<{ ci: string }>();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientByCi(ci!); // Obtener datos del cliente por ID
        console.log(data);
        setFormClient(data);
      } catch (error) {
        toast.error("Error al cargar los datos del cliente", {
          position: "bottom-right",
          draggable: true,
        });
        navigate("/client")
      }
    };

    if (ci) {
      fetchClient();
    }
  }, [ci]);

  const handleCountryChange = (value: string) => {
    setFormClient({ ...formClient, country: value });
  };
  const handleGenderChange = (value: string) => {
    setFormClient({ ...formClient, gender: value });
  };

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formClient.ci.trim()) {
      newErrors.ci = "El CI es obligatorio";
      isValid = false;
    } else {
      newErrors.ci = "";
    }

    if (!formClient.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!formClient.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio";
      isValid = false;
    } else {
      newErrors.lastname = "";
    }

    if (!formClient.email.trim()) {
      newErrors.email = "El email es obligatorio";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (validate()) {
        await updateClient(formClient.ci, formClient); // Actualizar cliente
        toast.success("Cliente actualizado con éxito!", {
          position: "bottom-right",
          draggable: true,
        });
        navigate("/client"); // Navegar a la vista Client.tsx
      } else {
        console.log("Errores en el formulario");
      }
    } catch (error) {
      toast.error("Error al actualizar el cliente", {
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
        title="Editar Cliente"
        description="Editar los datos de un cliente existente"
      />
      <PageBreadcrumbs
        breadcrumbs={[
          { title: "Home", url: "/" },
          { title: "Cliente", url: "/client" },
          { title: "Editar cliente" },
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
                <SelectForm
                  options={countries}
                  placeholder="Seleccione una opción"
                  defaultValue={formClient.country}
                  onChange={handleCountryChange}
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
                <SelectForm
                  options={options}
                  placeholder="Seleccione una opción"
                  defaultValue={formClient.gender}
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
        <div className="col-span-2">
          <div className="flex items-center justify-end space-x-4">
            <Button
              variant={"primary"}
              size="sv"
              loading={loading}
              onClick={handleSubmit}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};