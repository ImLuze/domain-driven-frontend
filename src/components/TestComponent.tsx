import React, { FunctionComponent } from 'react';
import { useGetAlbums } from './models/getAlbums';

export const TestComponent: FunctionComponent = () => {
    const { data, loading, error } = useGetAlbums();
    const albumsData = data?.albums?.data || [];

    const userToAuthor = (user: any) => ({
        id: user.id || '',
        username: user.username || 'unknown'
    });

    const dataToAlbum = (album: any) => ({
        id: album?.id || '',
        title: album?.title || '',
        url: `/albums/${album?.id}`,
        author: userToAuthor(album?.user || {})
    });

    const albums = albumsData.map(dataToAlbum);

    return (
        <div>
            {albums.map(album => (
                <p>{album.title}</p>
            ))}
        </div>
    );
}