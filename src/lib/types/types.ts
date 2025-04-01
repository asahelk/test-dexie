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
	id: string;
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
	moves: string;
	weather: string;
	localTimeZone?: string;
	isCopied?: boolean;
};
