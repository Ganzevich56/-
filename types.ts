export interface TripChoice {
  departureDate: string;
  arrivalDate: string;
  district: string;
  restaurant: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'landmark' | 'restaurant' | 'hotel' | 'library' | 'shop' | 'route' | 'district';
  landmarksNearby?: string;
}

export type AppStep = 'welcome' | 'memory' | 'quote' | 'date' | 'stay' | 'dine' | 'explore' | 'commitment' | 'summary';