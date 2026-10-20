export type CustomerSegment = 'retail' | 'institutional' | 'wholesale';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCountDemo: number;
  iconName: string;
}

export interface ProductDemo {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  demoPriceINR: number;
  mrpINR: number;
  shortSpecs: string[];
  fullSpecs?: Record<string, string>;
  isDemo: true;
  badge?: string;
  inStockDemo: boolean;
  warrantyDemo: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: ProductDemo[];
  suggestedFollowUps?: string[];
  isDemoReply?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}
