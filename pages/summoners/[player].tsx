import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/summonerPage/profileHeader/profileHeader";
import { TierData } from "../../types/opgg_types";
import styles from "./summoners.module.scss";

export type Season = {
	display_value: number;
	id: number;
	is_preseason: boolean;
	value: number;
};

type LeagueInfo = {
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

type Previous_Season = {
	created_at: string;
	season_id: number;
	tier_info: TierData;
};

export interface Profile {
	name: string;
	level: number;
	profile_image_url: string;
	league_stats: LeagueInfo[];
	previous_seasons: Previous_Season[];
	summoner_id: string;
	ladder_rank?: {
		rank: number;
		total: number;
	};
	updated_at: string;
}

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const { query } = router;
	const [summonerData, setSummonerData] = useState(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [seasons, setSeasons] = useState<Season[]>([]);

	useEffect(() => {
		if (Object.keys(query).length !== 0) {
			axios
				.get(
					"https://cors-anywhere.herokuapp.com/https://www.op.gg/api/summoners/kr/7Igu6sdQISktbOuwEgwb_M4SINT6ootyaJIEPbgT5tEFwLc?hl=ko_KR",
					{
						headers: {
							Origin: "https://www.op.gg",
							"x-requested-with": "XMLHttpRequest",
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					console.log(data);
					setSeasons(data.seasons);
					setProfile({
						name: data.name,
						level: data.level,
						profile_image_url: data.profile_image_url,
						previous_seasons: data.previous_seasons,
						updated_at: data.updated_at,
						summoner_id: data.summoner_id,
						ladder_rank: data.ladder_rank,
						league_stats: data.league_stats,
					});
				})
				.catch(() => {
					window.open("https://cors-anywhere.herokuapp.com/corsdemo");
				});
		}
	}, [query]);

	return (
		<div className={styles.container}>
			<Head>
				<title>
					{query?.player ? `${query.player} - 게임 전적` : `League of Legendes`}
				</title>
				<meta name="description" content="OP.GG 클론 프로젝트" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{profile && <ProfileHeader profile={profile} seasons={seasons} />}
			</main>

			<footer className={styles.footer}>
				<p>본 프로젝트는 포트폴리용으로 제작된 OP.GG 클론 프로젝트 입니다</p>
			</footer>
		</div>
	);
};

export default SummonerPage;
