import * as Types from '../../models/schema.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetAlbumsVariables = Types.Exact<{
  options?: Types.Maybe<Types.PageQueryOptions>;
}>;


export type GetAlbums = (
  { __typename?: 'Query' }
  & { albums?: Types.Maybe<(
    { __typename?: 'AlbumsPage' }
    & { data?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Album' }
      & Pick<Types.Album, 'id' | 'title'>
      & { user?: Types.Maybe<(
        { __typename?: 'User' }
        & Pick<Types.User, 'id' | 'username'>
      )> }
    )>>> }
  )> }
);


export const GetAlbumsDocument = gql`
    query getAlbums($options: PageQueryOptions) {
  albums(options: $options) {
    data {
      id
      title
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetAlbums__
 *
 * To run a query within a React component, call `useGetAlbums` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbums` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbums({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetAlbums(baseOptions?: Apollo.QueryHookOptions<GetAlbums, GetAlbumsVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbums, GetAlbumsVariables>(GetAlbumsDocument, options);
      }
export function useGetAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbums, GetAlbumsVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbums, GetAlbumsVariables>(GetAlbumsDocument, options);
        }
export type GetAlbumsHookResult = ReturnType<typeof useGetAlbums>;
export type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbums, GetAlbumsVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    