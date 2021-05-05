import { FunctionComponent } from 'react';
import { Routes } from '../hooks/routes/models/routes';

interface PageComponentBaseProps<P> extends P {
	routes: Routes;
}

/**
 * A Page Component glues the Interaction layer and View layer together,
 * it holds no logic of its own. It's the ideal candidate for Integration tests.
*/
type PageComponent<P = {}> = FunctionComponent<PageComponentBaseProps<P>>;
