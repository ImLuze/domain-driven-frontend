import { FunctionComponent } from 'react';

interface PageComponentBaseProps<P = {}> extends P { }

/**
 * A Page Component glues the Interaction layer and View layer together,
 * it holds no logic of its own. It's the ideal candidate for Integration tests.
*/
type PageComponent<P = {}> = FunctionComponent<PageComponentBaseProps<P>>;
