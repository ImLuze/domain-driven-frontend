import { ApolloError } from '@apollo/client';
import { Maybe, Query } from './schema';

/**
 * Determines the shape of the meta data typically returned by the network layer.
 * (Note: This interface should not be used directly within the application.)
 */
interface API<D, E extends Error> {
	data?: D;
	loading: boolean;
	error?: E;
}

/**
 * Determines the shape of the meta data returned by Apollo-client.
 */
export type ApolloAPI<K extends keyof Query> = API<Maybe<Pick<Query, K>>, ApolloError>;
