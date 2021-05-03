import { useEffect, useRef, useState } from 'react';
import { CreateAlbumInput, AlbumsOperations } from '../../hooks/albums/useAlbumsOperations';
import { UILogic } from '../../models/logic';

/**
 * This is the UI Logic of the component.
 * It determines which specific models and operations this component has access too and
 * what happens if an operation gets called.
 *
 * Splitting the UI Logic from the main component has the added benefit that
 * we can write more concise and clear Unit Tests. The Unit Tests are more reliable because
 * a change in the Presentation layer does not break a UI Logic test.
 */

export interface AlbumFormProps {
  operations: {
    onSubmit: AlbumsOperations['createAlbum'];
    validateTitle: AlbumsOperations['validateTitle'];
    validatePhotos: AlbumsOperations['validatePhotos'];
  }
}

interface Models {
  title: CreateAlbumInput['title'];
  photos: CreateAlbumInput['photos'];
  errorMessage: {
    title?: string;
    photos?: string;
  }
}

interface Operations {
  setTitle: (title: Models['title']) => void;
  addPhoto: (file: File) => void;
  removePhotoAtIndex: (index: number) => void;
  saveAlbum: () => void;
}

const useAlbumForm = (props: AlbumFormProps): UILogic<Operations, Models> => {
  const { operations } = props;
  const {
    onSubmit, validateTitle, validatePhotos,
  } = operations;

  const [title, setTitle] = useState<Models['title']>('');
  const [photos, setPhotos] = useState<Models['photos']>([]);
  const [titleErrorMessage, setTitleErrorMessage] = useState<string | undefined>();
  const [photosErrorMessage, setPhotosErrorMessage] = useState<string | undefined>();
  const didMount = useRef(false);

  const fileToPhoto = (file: File): Models['photos'][number] => ({
    alt: file.name,
    url: '/photo/0',
  });

  const addPhoto: Operations['addPhoto'] = (file) => {
    setPhotos([...photos, fileToPhoto(file)]);
  };

  const removePhotoAtIndex: Operations['removePhotoAtIndex'] = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const saveAlbum: Operations['saveAlbum'] = () => {
    const { isValid: isTitleValid, errorMessage: newTitleErrorMessage } = validateTitle(title);
    const { isValid: isPhotosValid, errorMessage: newPhotosErrorMessage } = validatePhotos(photos);

    setTitleErrorMessage(newTitleErrorMessage);
    setPhotosErrorMessage(newPhotosErrorMessage);

    if (isTitleValid && isPhotosValid) {
      onSubmit({ title, photos });
    }
  };

  useEffect(() => {
    if (didMount.current) {
      setTitleErrorMessage(validateTitle(title).errorMessage);
    } else {
      didMount.current = true;
    }
  }, [title]);

  return {
    models: {
      title,
      photos,
      errorMessage: {
        title: titleErrorMessage,
        photos: photosErrorMessage,
      },
    },
    operations: {
      setTitle,
      addPhoto,
      removePhotoAtIndex,
      saveAlbum,
    },
  };
};

export default useAlbumForm;
