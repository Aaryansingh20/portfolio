import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ColorPickerProps {
  selectedColor: string
  setSelectedColor: (color: string) => void
}

export function ColorPicker({ selectedColor, setSelectedColor }: ColorPickerProps) {
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"]

  return (
    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-2">
      {colors.map((color) => (
        <div key={color} className="flex items-center space-x-2">
          <RadioGroupItem
            value={color}
            id={color}
            className={`h-4 w-4 rounded-full border-2 border-white bg-${color}-500`}
          />
        </div>
      ))}
    </RadioGroup>
  )
}

