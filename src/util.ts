interface Measure {
  uri: string
  label: string
  weight: number
}

interface Nutrients {
  ENERC_KCAL: number
  PROCNT: number
  FAT: number
  CHOCDF: number
  FIBTG: number
}

interface FoodInfo {
  foodId: string
  label: string
  nutrients: Nutrients
  category: string
  categoryLabel: string
  image: string
  brand?: string
  foodContentsLabel?: string
  servingSized?: Array<Measure>
  servingsPerContainer?: number
}

interface FoodData {
  food: FoodInfo
  measures: Array<Measure>
}

interface NextPage {
  next: {
    title: string
    href: string
  }
}

interface ParserResponse {
  text: string
  parsed: Array<FoodData>
  hints: Array<FoodData>
  _links?: NextPage
}

export { ParserResponse }
