export interface Photo {
  id: string;
  alt: string;
  url: string;
}

export interface Author {
  id: string;
  username: string;
}

export interface Album {
  id: string;
  title: string;
  url: string;
  author: Author;
  photos: Photo[];
}
