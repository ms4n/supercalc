import { Card } from "./ui/card";

interface TotalsSummaryProps {
  totalCostPrice: number;
  totalSellingPrice: number;
  totalProfit: number;
  averageMarkup: number;
}

export function TotalsSummary({
  totalCostPrice,
  totalSellingPrice,
  totalProfit,
  averageMarkup,
}: TotalsSummaryProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="container mx-auto">
        <Card className="m-4 p-4 bg-primary/5 border-primary/20">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Cost Price</div>
              <div className="text-2xl font-bold">
                ₹
                {totalCostPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Total Selling Price
              </div>
              <div className="text-2xl font-bold">
                ₹
                {totalSellingPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Profit</div>
              <div className="text-2xl font-bold text-green-600">
                ₹
                {totalProfit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Average Markup</div>
              <div className="text-2xl font-bold">{averageMarkup.toFixed(1)}%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 