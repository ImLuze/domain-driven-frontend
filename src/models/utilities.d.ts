/**
 * Makes all properties of an object, as well as it's child objects optional.
 */

type DeepPartial<T> = T extends Function
	? T
	: (
		T extends object
			? T extends unknown[]
				? DeepPartial<T[number]>[]
				: { [P in keyof T]?: Partial<T[P]>; }
			: T
	);
