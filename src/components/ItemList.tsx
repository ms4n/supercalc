import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Item } from "../types";

interface ItemListProps {
  items: Item[];
  onUpdateItem: (id: string, field: keyof Item, value: string) => void;
  onDeleteItem: (id: string) => void;
}

export function ItemList({ items, onUpdateItem, onDeleteItem }: ItemListProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Items</h3>
      <div className="grid grid-cols-[repeat(4,1fr)_auto] gap-4 font-semibold mb-2 px-3">
        <div>Name</div>
        <div>Cost Price</div>
        <div>Markup %</div>
        <div>Selling Price</div>
        <div></div>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[repeat(4,1fr)_auto] gap-4 p-3 bg-muted/50 rounded-lg mb-2"
        >
          <div>
            <Input
              value={item.name}
              onChange={(e) => onUpdateItem(item.id, "name", e.target.value)}
              className="shadow-none bg-background"
            />
          </div>
          <div>
            <Input
              type="number"
              value={item.costPrice}
              onChange={(e) =>
                onUpdateItem(item.id, "costPrice", e.target.value)
              }
              prefix="₹"
              className="shadow-none bg-background"
            />
          </div>
          <div>
            <Input
              type="number"
              value={item.markupPercentage}
              onChange={(e) =>
                onUpdateItem(item.id, "markupPercentage", e.target.value)
              }
              className="shadow-none bg-background"
            />
          </div>
          <div className="flex items-center font-medium">
            ₹{item.sellingPrice.toFixed(2)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteItem(item.id)}
            className="h-10 w-10 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
