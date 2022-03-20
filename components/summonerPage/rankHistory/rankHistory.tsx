import React, { useState } from "react";
import {
	ChampionById,
	LeagueInfo,
	RankStatus,
} from "../../../types/opgg_types";
import styles from "./rankHistory.module.scss";

interface HistoryProps {
	status: RankStatus;
	champions: ChampionById[];
}

type MostFilter = "All" | "Solo" | "Free";

const RankHistory: React.VFC<HistoryProps> = ({ status, champions }) => {
	const { soloRank, freeRank, mostChampions } = status;
	const [mostFilter, setMostFilter] = useState<MostFilter>("All");

	const tierToPascal = (item: LeagueInfo): string => {
		const tier =
			item.tier_info.tier[0] +
			item.tier_info.tier.slice(1, item.tier_info.tier.length).toLowerCase() +
			` ${item.tier_info.division}`;

		return tier;
	};

	const winRate = (win: number, lose: number): number => {
		const result = Math.floor((win / (win + lose)) * 100);

		return result;
	};

	return (
		<section className={styles.container}>
			<article className={styles.soloRankBox}>
				<div className={styles.rankMedal}>
					<img src={soloRank.tier_info.tier_image_url} />
				</div>
				<div className={styles.info}>
					<span className={styles.type}>솔로랭크</span>
					<span className={styles.tier}>{tierToPascal(soloRank)}</span>
					<div className={styles.tierInfo}>
						<span className={styles.status}>
							<b>{soloRank.tier_info.lp} LP</b> / {soloRank.win}승{" "}
							{soloRank.lose}패
						</span>
						<span className={styles.winRate}>
							승률 {winRate(soloRank.win, soloRank.lose)}%
						</span>
					</div>
					<span className={styles.leagueTitle}>
						{soloRank.league.translate}
					</span>
				</div>
			</article>
			<article className={styles.freeRankBox}>
				<div className={styles.rankMedal}>
					<img src={freeRank.tier_info.tier_image_url} />
				</div>
				<div className={styles.info}>
					<span className={styles.type}>자유랭크</span>
					<span className={styles.tier}>{tierToPascal(freeRank)}</span>
					<div className={styles.tierInfo}>
						<span className={styles.status}>
							<b>{freeRank.tier_info.lp} LP</b> / {freeRank.win}승{" "}
							{freeRank.lose}패
						</span>
						<span className={styles.winRate}>
							승률 {winRate(freeRank.win, freeRank.lose)}%
						</span>
					</div>
				</div>
			</article>
			<article className={styles.mostChampions}>
				<ul className={styles.filter}>
					<li
						className={
							mostFilter === "All" ? styles.activate : styles.deactivate
						}
					>
						<button
							onClick={() => {
								setMostFilter("All");
							}}
						>
							S2022 전체
						</button>
					</li>
					<li
						className={
							mostFilter === "Solo" ? styles.activate : styles.deactivate
						}
					>
						<button
							onClick={() => {
								setMostFilter("Solo");
							}}
						>
							솔로랭크
						</button>
					</li>
					<li
						className={
							mostFilter === "Free" ? styles.activate : styles.deactivate
						}
					>
						<button
							onClick={() => {
								setMostFilter("Free");
							}}
						>
							자유랭크
							<br />
							5v5
						</button>
					</li>
				</ul>
				<ul className={styles.champions}>
					{mostChampions.champion_stats.map((champion, index) => {
						if (index > 6) return;

						const iconUrl = champions.find((item) => {
							return item.id === champion.id;
						})?.img_url;

						return (
							<li key={index}>
								<div className={styles.icon}>
									<img src={iconUrl} />
								</div>
							</li>
						);
					})}
				</ul>
			</article>
		</section>
	);
};

export default RankHistory;
