import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import client from '../../client';
import * as useCreateAlbum from '../../hooks/albums/models/createAlbum';
import { PageComponent } from '../../models/PageComponent';
import Routes from '../../Routes';

/**
 * Here we list all features which the Page enables and run integration tests against them.
 * The Page Component is the ideal candidate for this as it enables multiple features at once.
 *
 * This is generally the first file you create when you add a new page, or the first one you edit
 * when you fix a bug or add a new feature.
*/

const MockedAddAlbumPage: PageComponent = () => (
  <ApolloProvider client={client}>
    <MemoryRouter initialEntries={['/albums/add']}>
      <Routes />
    </MemoryRouter>
  </ApolloProvider>
);

describe('AddAlbumPage', () => {
  describe('allows the user to create a new album', () => {
    describe('allows the user to add an album title', () => {
      describe('when the album title is valid', () => {
        it('shows no error', () => {
          render(<MockedAddAlbumPage />);

          userEvent.type(screen.getByPlaceholderText(/title/), 'valid title');
          expect(screen.queryByText(/illegal character/)).not.toBeInTheDocument();
          expect(screen.queryByText(/at least 5 characters/)).not.toBeInTheDocument();
        });
      });

      describe('when the album title is invalid', () => {
        it('shows the appropriate error', () => {
          render(<MockedAddAlbumPage />);

          userEvent.type(screen.getByPlaceholderText(/title/), '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
          userEvent.type(screen.getByPlaceholderText(/title/), 'new-title');
          expect(screen.getByText(/illegal character/)).toBeInTheDocument();

          userEvent.type(screen.getByPlaceholderText(/title/), '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
          userEvent.type(screen.getByPlaceholderText(/title/), 'abcd');
          expect(screen.getByText(/at least 5 characters/)).toBeInTheDocument();
        });
      });
    });

    it('allows the user to add a photo to the album', () => {
      render(<MockedAddAlbumPage />);
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      userEvent.upload(screen.getByLabelText(/Add a photo/), file);
      expect(screen.getByAltText(/test.png/)).toHaveAttribute('src', '/photo/0');
    });

    it('allows the user to remove a photo from the album', () => {
      render(<MockedAddAlbumPage />);
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      userEvent.upload(screen.getByLabelText(/Add a photo/), file);
      expect(screen.getByAltText(/test.png/)).toHaveAttribute('src', '/photo/0');

      userEvent.click(screen.getByRole('button', { name: /Remove photo/ }));
      expect(screen.queryByAltText(/test preview/)).not.toBeInTheDocument();
    });

    describe('when the user submits an album', () => {
      describe('when the album is invalid', () => {
        it('shows an error', () => {
          render(<MockedAddAlbumPage />);

          userEvent.type(screen.getByPlaceholderText(/title/), 'new-title');
          userEvent.click(screen.getByRole('button', { name: /Add album/ }));
          expect(screen.getByText(/illegal character/)).toBeInTheDocument();
          expect(screen.getByText(/1 photo/)).toBeInTheDocument();
        });

        it('does not submit the album', () => {
          const createAlbumMutation = jest.fn();
          jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);
          render(<MockedAddAlbumPage />);
          expect(createAlbumMutation).toHaveBeenCalledTimes(0);

          userEvent.type(screen.getByPlaceholderText(/title/), 'new-title');
          userEvent.click(screen.getByRole('button', { name: /Add album/ }));
          expect(createAlbumMutation).toHaveBeenCalledTimes(0);
        });

        it('remains on the same page', () => {
          render(<MockedAddAlbumPage />);

          userEvent.type(screen.getByPlaceholderText(/title/), 'new-title');
          userEvent.click(screen.getByRole('button', { name: /Add album/ }));
          expect(screen.getByRole('heading', { name: /Add new album/ })).toBeInTheDocument();
        });
      });

      describe('when the album is valid', () => {
        it('submits the album', () => {
          const createAlbumMutation = jest.fn();
          const file = new File(['test'], 'test.png', { type: 'image/png' });
          jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);
          render(<MockedAddAlbumPage />);
          expect(createAlbumMutation).toHaveBeenCalledTimes(0);

          userEvent.type(screen.getByPlaceholderText(/title/), 'new title');
          userEvent.upload(screen.getByLabelText(/Add a photo/), file);
          userEvent.click(screen.getByRole('button', { name: /Add album/ }));
          expect(createAlbumMutation).toHaveBeenCalledTimes(1);
        });

        it('goes to the album detail page', async () => {
          const file = new File(['test'], 'test.png', { type: 'image/png' });
          render(<MockedAddAlbumPage />);

          userEvent.type(screen.getByPlaceholderText(/title/), 'new title');
          userEvent.upload(screen.getByLabelText(/Add a photo/), file);
          userEvent.click(screen.getByRole('button', { name: /Add album/ }));

          await screen.findByRole('heading', { name: /title 0/ });
          expect(screen.queryByRole('heading', { name: /Add new album/ })).not.toBeInTheDocument();
          expect(screen.getByRole('heading', { name: /title 0/ })).toBeInTheDocument();
        });
      });
    });
  });

  it('allows the user to go back to the albums overview page', async () => {
    render(<MockedAddAlbumPage />);
    expect(screen.getByRole('heading', { name: /Add new album/ })).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: /back/ }));
    expect(screen.queryByRole('heading', { name: /Add new album/ })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Albums/ })).toBeInTheDocument();
  });
});
