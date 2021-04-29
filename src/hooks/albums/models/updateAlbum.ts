/* eslint-disable */
import * as Types from '../../../models/schema.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateAlbumVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  input: Types.UpdateAlbumInput;
}>;


export type UpdateAlbum = (
  { __typename?: 'Mutation' }
  & { updateAlbum?: Types.Maybe<(
    { __typename?: 'Album' }
    & Pick<Types.Album, 'id'>
  )> }
);


export const UpdateAlbumDocument = gql`
    mutation updateAlbum($id: ID!, $input: UpdateAlbumInput!) {
  updateAlbum(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateAlbumMutationFn = Apollo.MutationFunction<UpdateAlbum, UpdateAlbumVariables>;

/**
 * __useUpdateAlbum__
 *
 * To run a mutation, you first call `useUpdateAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlbum, { data, loading, error }] = useUpdateAlbum({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAlbum(baseOptions?: Apollo.MutationHookOptions<UpdateAlbum, UpdateAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAlbum, UpdateAlbumVariables>(UpdateAlbumDocument, options);
      }
export type UpdateAlbumHookResult = ReturnType<typeof useUpdateAlbum>;
export type UpdateAlbumMutationResult = Apollo.MutationResult<UpdateAlbum>;
export type UpdateAlbumMutationOptions = Apollo.BaseMutationOptions<UpdateAlbum, UpdateAlbumVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    