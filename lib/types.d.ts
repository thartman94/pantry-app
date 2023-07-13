export interface FoodItem {
  [key: string]: any;
  id?: string;
  name: string;
  brand: string;
  size: number;
  serving_size: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  exp_date: string;
}
