// Private interfaces
interface IMeasure {
  uri: string
  label: string
  weight: number
}

interface INutrients {
  ENERC_KCAL: number
  PROCNT: number
  FAT: number
  CHOCDF: number
  FIBTG: number
}

interface IFoodInfo {
  foodId: string
  label: string
  nutrients: INutrients
  category: string
  categoryLabel: string
  image?: string
  brand?: string
  foodContentsLabel?: string
  servingSized?: Array<IMeasure>
  servingsPerContainer?: number
}

interface IFoodData {
  food: IFoodInfo
  measures: Array<IMeasure>
}

interface ILinks {
  next: {
    title: string
    href: string
  }
}

// Public interfaces
interface IDatabaseResponse {
  text: string
  parsed: Array<IFoodData>
  hints: Array<IFoodData>
  _links?: ILinks
}

interface IFoodSummary {
  label: string
  nutrients: INutrients
  servingSize: number
}

interface IField {
  type: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

interface INumberField {
  type: 'number'
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export {
  IDatabaseResponse,
  IField,
  IFoodData,
  INutrients,
  INumberField,
  IFoodSummary,
}
