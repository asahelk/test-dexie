export type Containers = Container[];

export type Container = {
	id: number;
	text: number;
	filters: Filter[];
};

export type Filter = {
	id?: number;
	name: string;
	query: string;
	items: Item[];
	isEnabled: boolean;
};

export type Item = {
	id?: string | null;
	name: string;
	hasShiny: boolean;
	isBoosted: boolean;
	gender: string;
	ivs: string;
	iv: string;
	atk: number;
	def: number;
	hp: number;
	cp: string;
	lv: string;
	despawnTime: number;
	flag: string;
	locationName: string;
	coords: string;
	moves: string | null;
	weather: string | null;
	localTimeZone?: string;
	isCopied?: boolean;
	query: string;
};
