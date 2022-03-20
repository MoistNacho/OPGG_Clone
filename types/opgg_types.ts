export type Position = "MID" | "TOP" | "JUNGLE" | "SUPPORT" | "ADC";

export type Champion = {
	id: string;
	name: string;
	title: string;
	info: string;
	imgUrl: string;
	position?: Position[];
};

export type ChampionById = {
	id: number;
	name: string;
	img_url: string;
};

export type TierData = {
	border_image_url: string;
	division: number;
	lp: number | null;
	tier: string;
	tier_image_url: string;
};

export type Season = {
	display_value: number;
	id: number;
	is_preseason: boolean;
	value: number;
};

export type LeagueInfo = {
	is_fresh_blood: boolean;
	is_hot_streak: boolean;
	is_inactive: boolean;
	is_veteran: boolean;
	league: {
		id: number;
		name: string;
		translate: string;
		uuid: string;
	};
	lose: number;
	queue_info: {
		game_type: string;
		id: number;
		queue_translate: "string";
	};
	updated_at: string;
	win: number;
	tier_info: TierData;
};

export type Previous_Season = {
	created_at: string;
	season_id: number;
	tier_info: TierData;
};

type ChampionStats = {
	assist: number;
	damage_dealt: number;
	damage_taken: number;
	death: number;
	double_kill: number;
	game_length_second: number;
	gold_earned: number;
	id: number;
	kill: number;
	lose: number;
	magic_damage_dealt: number;
	max_death: number;
	max_kill: number;
	minion_kill: number;
	most_kill: number;
	neutral_minion_kill: number;
	penta_kill: number;
	physical_damage_dealt: number;
	play: number;
	quadra_kill: number;
	triple_kill: number;
	turret_kill: number;
	win: number;
};

type MostChampions = {
	champion_stats: ChampionStats[];
	game_type: string;
	lose: number;
	win: number;
	play: number;
	season_id: number;
};

export type RankStatus = {
	soloRank: LeagueInfo;
	freeRank: LeagueInfo;
	mostChampions: MostChampions;
};
