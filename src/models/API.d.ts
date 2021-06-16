import type { ApolloError } from '@apollo/client';
import type { Query } from './schema';

/**
 * Determines the shape of the meta data typically returned by the network layer.
 * (Note: This interface should not be used directly within the application.)
 */
interface API<D, E extends Error> {
	data?: D;
	loading: boolean;
	error?: E;
}

type PartialQuery<K extends keyof Query> = { [P in K]?: DeepPartial<Query[P]> };

/**
 * Determines the shape of the meta data returned by Apollo-client.
 */
export type ApolloAPI<K extends keyof Query> = API<PartialQuery<K>, ApolloError>;
