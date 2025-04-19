
interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }
  
  export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Buscar..."}
        className="w-full md:w-1/2 px-4 py-2 rounded-md shadow-sm focus:outline-none  border border-gray-300 hover:border-gray-400 transition"
      />
    );
  };