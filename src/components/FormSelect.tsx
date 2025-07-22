import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FormSelect({ data, value, onChange }) {
  const selectedItem = data?.find((e) => String(e.id) === String(value));
  const selectedLabel = selectedItem?.name;

  return (
    <Select value={value?.toString()} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih">{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>
          Pilih
        </SelectItem>
        {data?.map((e) => (
          <SelectItem key={e.id} value={e.id.toString()}>
            {e.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
