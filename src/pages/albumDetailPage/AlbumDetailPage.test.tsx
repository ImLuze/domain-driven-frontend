import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, RequestHandler } from 'msw';
import { FunctionComponent } from 'react';
import { MemoryRouter } from 'react-router';
import client from '../../client';
import db from '../../mocks/db';
import server from '../../mocks/server';
import { Album } from '../../models/schema';
import Routes from '../../Routes';

/**
 * Here we list all features which the Page enables and run integration tests against them.
 * The Page Component is the ideal candidate for this as it enables multiple features at once.
 *
 * This is generally the first file you create when you add a new page, or the first one you edit
 * when you fix a bug or add a new feature.
 *
 * When you're running low on time, skip the unit tests and focus on these Integration tests.
*/

const albums: Album[] = db.album.getAll();

const mockErrorResponse: RequestHandler = graphql.query('getAlbumById', (req, res, ctx) => res(
	ctx.status(404),
	ctx.errors([{ message: 'Not found' }]),
));

const MockedAlbumDetailPage: FunctionComponent = () => (
	<ApolloProvider client={client}>
		<MemoryRouter initialEntries={[`/albums/${albums[0].id}`]}>
			<Routes />
		</MemoryRouter>
	</ApolloProvider>
);

describe('AlbumDetailPage', () => {
	describe('when the album is loading', () => {
		it('lets the user know that the album is loading', () => {
			render(<MockedAlbumDetailPage />);
			expect(screen.getByText(/Loading/)).toBeInTheDocument();
		});
	});

	describe('when an error has occured', () => {
		it('lets the user know that something went wrong', async () => {
			server.use(mockErrorResponse);
			render(<MockedAlbumDetailPage />);
			expect(screen.queryByText(/went wrong/)).not.toBeInTheDocument();

			await screen.findByText(/went wrong/);
			expect(screen.getByText(/went wrong/)).toBeInTheDocument();
		});
	});

	describe('when the album loaded successfully', () => {
		it('shows the album title', async () => {
			render(<MockedAlbumDetailPage />);
			await screen.findByText(albums[0].title!);
			expect(screen.getByRole('heading', { name: albums[0].title! })).toBeInTheDocument();
		});

		it('shows all photos in the album', async () => {
			render(<MockedAlbumDetailPage />);
			await screen.findAllByRole('img');
			expect(screen.getAllByRole('img')).toHaveLength(5);
		});

		it('shows the username of the user who last edited the album', async () => {
			render(<MockedAlbumDetailPage />);
			await screen.findByText(albums[0].user?.username!);
			expect(screen.getByText(albums[0].user?.username!)).toBeInTheDocument();
		});
	});

	it('allows the user to go back to the overview page', () => {
		render(<MockedAlbumDetailPage />);
		expect(screen.queryByRole('heading', { name: /Albums/ })).not.toBeInTheDocument();

		userEvent.click(screen.getByRole('link', { name: /overview/ }));
		expect(screen.queryByRole('link', { name: /overview/ })).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Albums/ })).toBeInTheDocument();
	});
});
