/* eslint-disable */
import * as Types from '../../../models/schema.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateAlbumVariables = Types.Exact<{
  input: Types.CreateAlbumInput;
}>;


export type CreateAlbum = (
  { __typename?: 'Mutation' }
  & { createAlbum?: Types.Maybe<(
    { __typename?: 'Album' }
    & Pick<Types.Album, 'id'>
  )> }
);


export const CreateAlbumDocument = gql`
    mutation createAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    id
  }
}
    `;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbum, CreateAlbumVariables>;

/**
 * __useCreateAlbum__
 *
 * To run a mutation, you first call `useCreateAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbum, { data, loading, error }] = useCreateAlbum({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAlbum(baseOptions?: Apollo.MutationHookOptions<CreateAlbum, CreateAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAlbum, CreateAlbumVariables>(CreateAlbumDocument, options);
      }
export type CreateAlbumHookResult = ReturnType<typeof useCreateAlbum>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbum>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbum, CreateAlbumVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    