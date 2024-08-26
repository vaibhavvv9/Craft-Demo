export interface State {
    search: string;
    list: ListState;
    details: any;
    compare: any;
  }
  
 export interface ListState {
  
    items: Car[],
    loading: boolean,
    error: boolean,
    }

export interface Car {
    makeId: number
    makeName: string
    makeMaskingName: string
    modelId: number
    modelName: string
    modelMaskingName: string
    hostUrl: string
    originalImagePath: string
    priceOverview: PriceOverview
    carRating: number
    launchedOn: string
    showJustLaunchedBadge: boolean
  }
  
  export interface PriceOverview {
    price: string
    label: string
    formattedPrice: string
  }