import { Stock } from './stock.entity';

export const stockProviders = [
  {
    provide: 'STOCK_REPOSITORY',
    useValue: Stock,
  },
];
