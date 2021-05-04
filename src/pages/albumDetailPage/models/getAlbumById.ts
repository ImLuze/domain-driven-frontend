/* eslint-disable */
import * as Types from '../../../models/schema.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetAlbumByIdVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAlbumById = (
  { __typename?: 'Query' }
  & { album?: Types.Maybe<(
    { __typename?: 'Album' }
    & Pick<Types.Album, 'id' | 'title'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'username'>
    )>, photos?: Types.Maybe<(
      { __typename?: 'PhotosPage' }
      & { data?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Photo' }
        & Pick<Types.Photo, 'id' | 'url'>
      )>>> }
    )> }
  )> }
);


export const GetAlbumByIdDocument = gql`
    query getAlbumById($id: ID!) {
  album(id: $id) {
    id
    title
    user {
      id
      username
    }
    photos {
      data {
        id
        url
      }
    }
  }
}
    `;

/**
 * __useGetAlbumById__
 *
 * To run a query within a React component, call `useGetAlbumById` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumById` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumById({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumById(baseOptions: Apollo.QueryHookOptions<GetAlbumById, GetAlbumByIdVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumById, GetAlbumByIdVariables>(GetAlbumByIdDocument, options);
      }
export function useGetAlbumByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumById, GetAlbumByIdVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumById, GetAlbumByIdVariables>(GetAlbumByIdDocument, options);
        }
export type GetAlbumByIdHookResult = ReturnType<typeof useGetAlbumById>;
export type GetAlbumByIdLazyQueryHookResult = ReturnType<typeof useGetAlbumByIdLazyQuery>;
export type GetAlbumByIdQueryResult = Apollo.QueryResult<GetAlbumById, GetAlbumByIdVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    