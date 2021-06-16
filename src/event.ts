// This is a strictly typed version of the default NodeJS EventEmitter.
import { StrictEventEmitter } from 'strict-event-emitter';
import type { AlbumEvents } from './hooks/albums/useAlbums';

type Events = AlbumEvents;

/**
 * Allows to emit events and listen to them. This allows us to chain different Interaction Domains
 * together without explicitly depending on each other.
 */
const event = new StrictEventEmitter<Events>();

export default event;
