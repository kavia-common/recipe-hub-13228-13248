export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  nutrition: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    [key: string]: any;
  };
  imageUrl?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}
