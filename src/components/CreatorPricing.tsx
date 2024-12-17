import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface CreatorPricingProps {
  supersquadPrice: number;
  initialProfit?: number;
}

export function CreatorPricing({
  supersquadPrice,
  initialProfit = 0,
}: CreatorPricingProps) {
  const [creatorMarkup, setCreatorMarkup] = useState("");
  const [profitShare, setProfitShare] = useState([80]);
  const [finalPrice, setFinalPrice] = useState(supersquadPrice);
  const [totalProfit, setTotalProfit] = useState(0);
  const [hasInteractedWithSlider, setHasInteractedWithSlider] = useState(false);

  useEffect(() => {
    const markup = parseFloat(creatorMarkup) || 0;
    const newFinalPrice = supersquadPrice + markup;
    const newProfit = markup;
    setFinalPrice(newFinalPrice);
    setTotalProfit(newProfit);
  }, [creatorMarkup, supersquadPrice]);

  const creatorProfit = totalProfit * (profitShare[0] / 100);
  const supersquadProfit = totalProfit * ((100 - profitShare[0]) / 100);
  const totalSupersquadProfit = initialProfit + supersquadProfit;
  const hasMarkup = parseFloat(creatorMarkup) > 0;

  const handlePercentageChange = (value: string) => {
    if (!hasMarkup) {
      setHasInteractedWithSlider(true);
    }
    const percentage = Math.min(100, Math.max(0, parseInt(value) || 0));
    setProfitShare([percentage]);
  };

  const handleSliderChange = (value: number[]) => {
    if (!hasMarkup) {
      setHasInteractedWithSlider(true);
    }
    setProfitShare(value);
  };

  const getInputStyles = () => {
    if (hasInteractedWithSlider && !hasMarkup) {
      return "border-destructive text-lg";
    }
    return "";
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Supersquad Price</Label>
          <div className="text-2xl font-bold">
            ₹
            {supersquadPrice.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="creatorMarkup">Creator Markup (₹)</Label>
            {!hasMarkup && hasInteractedWithSlider && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Required</span>
              </div>
            )}
          </div>
          <Input
            id="creatorMarkup"
            type="number"
            value={creatorMarkup}
            onChange={(e) => {
              setCreatorMarkup(e.target.value);
              if (parseFloat(e.target.value) > 0) {
                setHasInteractedWithSlider(false);
              }
            }}
            placeholder="0.00"
            prefix="₹"
            className={getInputStyles()}
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Final Price with markup
              </div>
              <div className="text-2xl font-bold">
                ₹
                {finalPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-sm text-muted-foreground">
                Creator Markup
              </div>
              <div className="text-2xl font-bold text-green-600">
                ₹
                {totalProfit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Profit Share</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={profitShare[0]}
                  onChange={(e) => handlePercentageChange(e.target.value)}
                  className="w-20"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={profitShare}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Creator: {profitShare[0]}%</span>
              <span>Supersquad: {100 - profitShare[0]}%</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="space-y-2">
            <div className="text-sm font-medium text-primary">
              Creator's Total
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold">
                ₹
                {creatorProfit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {profitShare[0]}% of creator markup (₹
                {totalProfit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
                )
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500">
          <div className="space-y-2">
            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Supersquad's Total
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹
                {totalSupersquadProfit.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="text-muted-foreground">
                  Initial profit: ₹
                  {initialProfit.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-muted-foreground">
                  + {100 - profitShare[0]}% of creator markup: ₹
                  {supersquadProfit.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
