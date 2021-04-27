import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';
import { TestComponent } from './TestComponent';

describe('TestComponent', () => {
    it('renders all album titles', async () => {
        const { debug } = render(
            <ApolloProvider client={client}>
                <TestComponent />
            </ApolloProvider>
        );

        debug();
        await waitFor(() => screen.findByText(/title/));

        debug();
    })
})