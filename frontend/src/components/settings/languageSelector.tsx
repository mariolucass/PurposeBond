import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const LanguageSelector = () => {
  const handleSelectChange = (change: string) => {
    console.log(change);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="portugues">Português</SelectItem>
        <SelectItem value="deutschland">Deutschland</SelectItem>
      </SelectContent>
    </Select>
  );
};
