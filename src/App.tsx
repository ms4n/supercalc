import { Card } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useState, useEffect } from "react";
import dummyData from "./data.json";
import { Item } from "./types";
import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";
import { TotalsSummary } from "./components/TotalsSummary";
import { CreatorPricing } from "./components/CreatorPricing";

const App = () => {
  const [itemName, setItemName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [markupPercentage, setMarkupPercentage] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState("pricing");

  useEffect(() => {
    // Load dummy data
    const initialItems = dummyData.items.map((item) => ({
      ...item,
      id: Date.now().toString() + Math.random(),
      sellingPrice: item.costPrice * (1 + item.markupPercentage / 100),
    }));
    setItems(initialItems);
  }, []);

  const calculateSellingPrice = (cost: number, markup: number) => {
    return cost * (1 + markup / 100);
  };

  const handleAddItem = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercentage);

    if (itemName && !isNaN(cost) && !isNaN(markup)) {
      const sellingPrice = calculateSellingPrice(cost, markup);
      const newItem: Item = {
        id: Date.now().toString(),
        name: itemName,
        costPrice: cost,
        markupPercentage: markup,
        sellingPrice,
      };
      setItems([...items, newItem]);
      // Reset form
      setItemName("");
      setCostPrice("");
      setMarkupPercentage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const updateItem = (id: string, field: keyof Item, value: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };
          if (field === "name") {
            updatedItem.name = value;
          } else if (field === "costPrice") {
            const newCost = parseFloat(value);
            if (!isNaN(newCost)) {
              updatedItem.costPrice = newCost;
              updatedItem.sellingPrice = calculateSellingPrice(
                newCost,
                item.markupPercentage
              );
            }
          } else if (field === "markupPercentage") {
            const newMarkup = parseFloat(value);
            if (!isNaN(newMarkup)) {
              updatedItem.markupPercentage = newMarkup;
              updatedItem.sellingPrice = calculateSellingPrice(
                item.costPrice,
                newMarkup
              );
            }
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const totalCostPrice = items.reduce((sum, item) => sum + item.costPrice, 0);
    const totalSellingPrice = items.reduce(
      (sum, item) => sum + item.sellingPrice,
      0
    );
    const totalProfit = totalSellingPrice - totalCostPrice;
    const averageMarkup = items.length
      ? items.reduce((sum, item) => sum + item.markupPercentage, 0) /
        items.length
      : 0;
    return { totalCostPrice, totalSellingPrice, averageMarkup, totalProfit };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-8 flex-1 pb-32">
        <Card className="p-6 shadow-none border-2">
          <Tabs
            defaultValue="pricing"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Invoice Calculator</h2>
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="profits">Profits</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pricing" className="mt-0">
                <ItemForm
                  itemName={itemName}
                  costPrice={costPrice}
                  markupPercentage={markupPercentage}
                  onNameChange={setItemName}
                  onCostPriceChange={setCostPrice}
                  onMarkupChange={setMarkupPercentage}
                  onAddItem={handleAddItem}
                  onKeyDown={handleKeyDown}
                />
                {items.length > 0 && (
                  <ItemList
                    items={items}
                    onUpdateItem={updateItem}
                    onDeleteItem={handleDeleteItem}
                  />
                )}
              </TabsContent>
              <TabsContent value="profits" className="mt-0">
                <CreatorPricing
                  supersquadPrice={totals.totalSellingPrice}
                  initialProfit={totals.totalProfit}
                />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {items.length > 0 && activeTab === "pricing" && (
        <TotalsSummary {...totals} />
      )}
    </div>
  );
};

export default App;
