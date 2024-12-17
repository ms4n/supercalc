import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ItemFormProps {
  itemName: string;
  costPrice: string;
  markupPercentage: string;
  onNameChange: (value: string) => void;
  onCostPriceChange: (value: string) => void;
  onMarkupChange: (value: string) => void;
  onAddItem: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function ItemForm({
  itemName,
  costPrice,
  markupPercentage,
  onNameChange,
  onCostPriceChange,
  onMarkupChange,
  onAddItem,
  onKeyDown,
}: ItemFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="itemName">Item Name</Label>
        <Input
          id="itemName"
          value={itemName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter item name"
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="costPrice">Cost Price (₹)</Label>
        <Input
          id="costPrice"
          type="number"
          value={costPrice}
          onChange={(e) => onCostPriceChange(e.target.value)}
          placeholder="0.00"
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="markup" className="flex items-center gap-2">
          Markup %{" "}
          <span className="text-sm text-muted-foreground">
            (Press Enter to add item)
          </span>
        </Label>
        <Input
          id="markup"
          type="number"
          value={markupPercentage}
          onChange={(e) => onMarkupChange(e.target.value)}
          placeholder="0"
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="flex items-end">
        <Button onClick={onAddItem} className="w-full shadow-none">
          Add Item
        </Button>
      </div>
    </div>
  );
} 