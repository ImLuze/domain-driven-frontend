import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RequestHandler, graphql } from 'msw';
import { FunctionComponent } from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import client from '../../client';
import AlbumsPage from './AlbumsPage';
import server from '../../mocks/server';

/**
 * Here we list all features which the Page enables and run integration tests against them.
 * The Page Component is the ideal candidate for this as it enables multiple features at once.
 *
 * This is generally the first file you create when you add a new page, or the first one you edit
 * when you fix a bug or add a new feature.
*/

const mockErrorResponse: RequestHandler = graphql.query('getAlbums', (req, res, ctx) => res(
  ctx.status(404),
  ctx.errors([{ message: 'Not found' }]),
));

const MockedAlbumsPage: FunctionComponent = () => {
  const history = createMemoryHistory();

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <AlbumsPage />
      </Router>
    </ApolloProvider>
  );
};

describe('AlbumsPage', () => {
  describe('when albums are loading', () => {
    it('lets the user know that albums are loading', () => {
      render(<MockedAlbumsPage />);

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });
  });

  describe('when an error has occured', () => {
    it('lets the user know that something went wrong', async () => {
      server.use(mockErrorResponse);
      render(<MockedAlbumsPage />);

      await screen.findByText(/went wrong/);

      expect(screen.getByText(/went wrong/)).toBeInTheDocument();
    });
  });

  describe('when the albums load successfully', () => {
    it('renders all albums', async () => {
      render(<MockedAlbumsPage />);

      await screen.findAllByText(/title/);

      expect(screen.getAllByRole('heading', { name: /title/ })).toHaveLength(6);
    });

    describe('allows the user to edit the album title', () => {
      describe('when the new title is invalid', () => {
        it('shows the appropriate error', async () => {
          render(<MockedAlbumsPage />);

          await screen.findAllByText(/title/);

          expect(screen.queryByText(/new title/)).not.toBeInTheDocument();

          userEvent.click(screen.getAllByRole('button', { name: /edit/ })[0]);

          userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
          userEvent.type(screen.getByRole('textbox'), 'new-title');

          userEvent.keyboard('{Enter}');

          expect(screen.getByText(/illegal character/)).toBeInTheDocument();

          userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
          userEvent.type(screen.getByRole('textbox'), 'abcd');

          userEvent.keyboard('{Enter}');

          expect(screen.getByText(/at least 5 characters/)).toBeInTheDocument();
        });

        it('does not update the title', () => {
          render(<MockedAlbumsPage />);

          expect(screen.queryByText(/new title/)).not.toBeInTheDocument();

          userEvent.click(screen.getAllByRole('button', { name: /edit/ })[0]);

          userEvent.type(screen.getByRole('textbox'), 'new-title');

          userEvent.keyboard('{Enter}');

          expect(screen.queryByText(/new-title/)).not.toBeInTheDocument();
        });
      });

      describe('when the new title is valid', () => {
        it('updates the album title', () => {
          render(<MockedAlbumsPage />);

          expect(screen.queryByText(/new title/)).not.toBeInTheDocument();

          userEvent.click(screen.getAllByRole('button', { name: /edit/ })[0]);

          userEvent.type(screen.getByRole('textbox'), 'new title');

          userEvent.keyboard('{Enter}');

          expect(screen.getByText(/new title/)).toBeInTheDocument();
        });
      });
    });

    it('allows the user to navigate to the album detail page', async () => {
      render(<MockedAlbumsPage />);

      await screen.findAllByText(/title/);

      expect(screen.getAllByRole('link', { name: /to album/ })[0]).toHaveAttribute('href', '/albums/0');
    });

    it('allows the user to navigate to the create new album page', async () => {
      render(<MockedAlbumsPage />);

      await screen.findAllByText(/title/);

      expect(screen.getAllByRole('link', { name: /new album/ })[0]).toHaveAttribute('href', '/albums/add');
    });
  });
});
