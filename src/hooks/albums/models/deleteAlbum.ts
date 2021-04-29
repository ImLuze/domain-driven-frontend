/* eslint-disable */
import * as Types from '../../../models/schema.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteAlbumVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteAlbum = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'deleteAlbum'>
);


export const DeleteAlbumDocument = gql`
    mutation deleteAlbum($id: ID!) {
  deleteAlbum(id: $id)
}
    `;
export type DeleteAlbumMutationFn = Apollo.MutationFunction<DeleteAlbum, DeleteAlbumVariables>;

/**
 * __useDeleteAlbum__
 *
 * To run a mutation, you first call `useDeleteAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlbum, { data, loading, error }] = useDeleteAlbum({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAlbum(baseOptions?: Apollo.MutationHookOptions<DeleteAlbum, DeleteAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAlbum, DeleteAlbumVariables>(DeleteAlbumDocument, options);
      }
export type DeleteAlbumHookResult = ReturnType<typeof useDeleteAlbum>;
export type DeleteAlbumMutationResult = Apollo.MutationResult<DeleteAlbum>;
export type DeleteAlbumMutationOptions = Apollo.BaseMutationOptions<DeleteAlbum, DeleteAlbumVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    