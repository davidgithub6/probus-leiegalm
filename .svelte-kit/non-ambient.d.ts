
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/bestuur" | "/betekenis" | "/fotos" | "/historiek" | "/hymne" | "/leden" | "/programma";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/bestuur": Record<string, never>;
			"/betekenis": Record<string, never>;
			"/fotos": Record<string, never>;
			"/historiek": Record<string, never>;
			"/hymne": Record<string, never>;
			"/leden": Record<string, never>;
			"/programma": Record<string, never>
		};
		Pathname(): "/" | "/bestuur" | "/betekenis" | "/fotos" | "/historiek" | "/hymne" | "/leden" | "/programma";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.assetsignore" | "/preview-alternatives.html" | string & {};
	}
}