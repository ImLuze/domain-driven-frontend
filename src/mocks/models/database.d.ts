import { FactoryAPI } from '@mswjs/data/lib/glossary';
import { Dictionary } from './dictionary';

export type Database = FactoryAPI<Dictionary>;

export type Collections<K extends keyof Dictionary> = Record<K, Dictionary[K][]>;
