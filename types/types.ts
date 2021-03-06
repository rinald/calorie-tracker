type Measure = {
  uri: string
  label: string
  weight: number
}

type Nutrient = 'ENERC_KCAL' | 'PROCNT' | 'FAT' | 'CHOCDF' | 'FIBTG'

type Nutrients = {
  [key in Nutrient]: number
}

type FoodInfo = {
  foodId: string
  label: string
  nutrients: Nutrients
  category: string
  categoryLabel: string
  image?: string
  brand?: string
  foodContentsLabel?: string
  servingSized?: Array<Measure>
  servingsPerContainer?: number
}

type FoodData = {
  food: FoodInfo
  measures: Array<Measure>
}

type Links = {
  next: {
    title: string
    href: string
  }
}

type DatabaseResponse = {
  text: string
  parsed: Array<FoodData>
  hints: Array<FoodData>
  _links?: Links
}

type FoodSummary = {
  label: string
  nutrients: Nutrients
  servingSize: number
}

export { DatabaseResponse, FoodData, Nutrients, FoodSummary, Nutrient }
