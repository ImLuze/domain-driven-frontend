import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, RequestHandler } from 'msw';
import { MemoryRouter } from 'react-router';
import client from '../../client';
import server from '../../mocks/server';
import { PageComponent } from '../../models/PageComponent';
import Routes from '../../Routes';

/**
 * Here we list all features which the Page enables and run integration tests against them.
 * The Page Component is the ideal candidate for this as it enables multiple features at once.
 *
 * This is generally the first file you create when you add a new page, or the first one you edit
 * when you fix a bug or add a new feature.
*/

const mockErrorResponse: RequestHandler = graphql.query('getAlbumById', (req, res, ctx) => res(
	ctx.status(404),
	ctx.errors([{ message: 'Not found' }]),
));

const MockedAlbumDetailPage: PageComponent = () => (
	<ApolloProvider client={client}>
		<MemoryRouter initialEntries={['/albums/0']}>
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
			await screen.findByText(/title/);
			expect(screen.getByRole('heading', { name: /title/ })).toBeInTheDocument();
		});

		it('shows all photos in the album', async () => {
			render(<MockedAlbumDetailPage />);
			await screen.findAllByRole('img');
			expect(screen.getAllByRole('img')).toHaveLength(5);
		});

		it('shows the username of the user who last edited the album', async () => {
			render(<MockedAlbumDetailPage />);
			await screen.findByText(/username/);
			expect(screen.getByText(/username/)).toBeInTheDocument();
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
