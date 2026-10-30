export interface CategoryInterface {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface MarketStats {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductInterface {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketStats[];
}
