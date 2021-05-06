import { useHistory } from 'react-router';
import { InteractionLogic } from '../../models/logic';
import { Album } from '../albums/models/album';
import { Routes } from './models/routes';

interface Operations {
	goToAlbumDetail: (id: Album['id']) => void;
}

type Models = Routes;

const useRoutes = (): InteractionLogic<Operations, Models> => {
	const history = useHistory();

	const routes: Models = {
		home: '/',
		albums: {
			add: '/albums/add',
			detail: '/albums/:id',
		},
	};

	const goToAlbumDetail: Operations['goToAlbumDetail'] = (id) => {
		history.push(`${routes.albums.detail}`.replace(':id', id));
	};

	return {
		models: routes,
		operations: {
			goToAlbumDetail,
		},
	};
};

export default useRoutes;
