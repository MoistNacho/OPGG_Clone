import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/summonerPage/profileHeader/profileHeader";
import RankHistory from "../../components/summonerPage/rankHistory/rankHistory";
import {
	ChampionById,
	LeagueInfo,
	Previous_Season,
	RankStatus,
	Season,
} from "../../types/opgg_types";
import styles from "./summoners.module.scss";

export type Profile = {
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
};

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const { query } = router;
	const [rankStatus, setRankStatus] = useState<RankStatus | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [champions, setChampions] = useState<ChampionById[]>([]);

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
					if (data.name) {
						let championsArr = Object.keys(data.championsById).map((id) => {
							return {
								id: data.championsById[id].id,
								name: data.championsById[id].name,
								img_url: data.championsById[id].image_url,
							};
						});

						setSeasons(data.seasons);
						setChampions(championsArr);
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
						setRankStatus({
							soloRank: data.league_stats[0],
							freeRank: data.league_stats[1],
							mostChampions: data.most_champions,
						});
					}
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
				<div className={styles.historyWraper}>
					{rankStatus && (
						<RankHistory status={rankStatus} champions={champions} />
					)}
				</div>
			</main>

			<footer className={styles.footer}>
				<p>본 프로젝트는 포트폴리용으로 제작된 OP.GG 클론 프로젝트 입니다</p>
			</footer>
		</div>
	);
};

export default SummonerPage;
