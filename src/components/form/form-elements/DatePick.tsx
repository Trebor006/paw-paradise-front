import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalenderIcon } from "../../../icons";
import "./style.css";
import { es } from "date-fns/locale";

interface DatePickProps {
  selectedDate?: Date | null;
  onChange: (date: Date | null) => void; // Corregido: usar onChange
  placeholder?: string;
}

export const DatePick = ({ selectedDate, onChange, placeholder }: DatePickProps) => {
  return (
    <DatePicker
      closeOnScroll={true}
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={onChange} // Utiliza la prop correctamente
      icon={<CalenderIcon />}
      todayButton="Hoy"
      className="text-sm"
      popperPlacement="bottom-start"
      placeholderText={placeholder || "Seleccione una fecha"}
      dateFormat="dd/MM/yyyy"
      locale={es}
    />
  );
};
