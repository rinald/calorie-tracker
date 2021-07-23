interface IField {
  type: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

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

interface INextPage {
  next: {
    title: string
    href: string
  }
}

interface IDatabaseResponse {
  text: string
  parsed: Array<IFoodData>
  hints: Array<IFoodData>
  _links?: INextPage
}

export { IDatabaseResponse, IField }
