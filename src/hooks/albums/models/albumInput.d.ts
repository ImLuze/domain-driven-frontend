export interface CreateAlbumInput {
  title: Album['title'];
  photos: Omit<Photo, 'id'>[]
}

export interface UpdateAlbumInput {
  title?: Album['title'];
  photos?: Omit<Photo, 'id'>[]
}
