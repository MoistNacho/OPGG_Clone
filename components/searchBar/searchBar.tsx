import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./searchBar.module.scss";
import opggSubmitSvg from "../../design/svg/button/icon-gg-white.svg";
import axios from "axios";
import { ChampionProps } from "../../pages";
import { Champion, Position } from "../../pages/_app";
import { TierData } from "../../types/opgg_types";

type ProfileData = {
	acct_id: string;
	id: number;
	intternal_name: string;
	level: number;
	name: string;
	profile_image_url: string;
	puuid: string;
	solo_tier_info: TierData | null;
	sumonner_id: string;
	updated_at: string;
};

const SearchBar: React.VFC<ChampionProps> = ({ champions }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [users, setUsers] = useState<ProfileData[] | null>(null);
	const [champion, setChampion] = useState<Champion | null>(null);
	const [searchState, setSearchState] = useState<boolean>(false);

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!inputRef.current) return;

		const pattern = /([^가-힣a-z\x20])/i;
		const name = inputRef.current.value;
		if (name && !pattern.test(name)) {
			// 유저정보 서칭
			await axios
				.get(
					`https://lol-api-summoner.op.gg/api/kr/complete/summoners?keyword=${name}`
				)
				.then((response) => {
					setUsers(response.data.data.slice(0, 4));
				})
				.catch((error) => {
					return console.error(error);
				});

			// 챔피언정보 서칭
			searchChampion(e);
		} else {
			setUsers(null);
			setChampion(null);
		}
	};

	const searchChampion = async (e: React.ChangeEvent<HTMLInputElement>) => {
		let findChampion = champions.find((a) => {
			return a.name.startsWith(e.target.value);
		});

		if (findChampion) {
			const positions: Position[] = await axios
				.get(
					`https://lol-api-champion.op.gg/api/champions/ranked/${findChampion.id}/summaries`
				)
				.then((response) => {
					return response.data.data.positions.map(
						(item: { name: string; stats?: {} }) => {
							return item.name;
						}
					);
				});

			findChampion = { ...findChampion, position: positions };
			setChampion(findChampion);
		} else {
			setChampion(null);
		}
	};

	const translatePosition = (position: Position[]): string => {
		const translate = position.map((str) => {
			switch (str) {
				case "ADC":
					return "원딜";
				case "JUNGLE":
					return "정글";
				case "MID":
					return "미드";
				case "SUPPORT":
					return "서포터";
				case "TOP":
					return "탑";
				default:
					return "";
			}
		});

		return translate.join(", ");
	};

	return (
		<div className={styles.searchWrapper}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(2);
				}}
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="소환사명..."
					onChange={handleSearch}
					onFocus={() => {
						setSearchState(true);
					}}
					onBlur={() => {
						setSearchState(false);
					}}
				/>
				<button type="submit">
					<Image
						src={opggSubmitSvg}
						alt="opgg-submit_icon"
						width={30}
						height={15}
					/>
				</button>
				{searchState && (
					<div className={styles.searchState}>
						{users && (
							<div className={styles.usersWrapper}>
								<ul>
									{users.map((user: ProfileData) => {
										let tier;

										if (user.solo_tier_info) {
											const tierInfo = user.solo_tier_info;
											tier =
												tierInfo &&
												`${
													tierInfo.tier[0] +
													tierInfo.tier
														.slice(1, tierInfo.tier.length)
														.toLowerCase()
												} ${tierInfo.division} - ${tierInfo.lp}LP`;
										}

										return (
											<li key={user.id}>
												<a className={styles.profileLink}>
													<div className={styles.icon}>
														<img
															src={user.profile_image_url}
															alt="user-profile_icon"
														/>
													</div>
													<div className={styles.info}>
														<span className={styles.name}>
															{inputRef.current &&
																user.name.includes(inputRef.current.value) && (
																	<span>{inputRef.current.value}</span>
																)}
															{inputRef.current &&
																user.name.replace(inputRef.current.value, "")}
														</span>
														{user.solo_tier_info ? (
															<span className={styles.desc}>{tier}</span>
														) : (
															<span className={styles.desc}>
																Level {user.level}
															</span>
														)}
													</div>
												</a>
											</li>
										);
									})}
									{champion && (
										<li>
											<a className={styles.championLink}>
												<div className={styles.icon}>
													<img src={champion.imgUrl} alt="champion_icon" />
												</div>
												<div className={styles.info}>
													<span className={styles.name}>
														{inputRef.current &&
															champion.name.includes(
																inputRef.current.value
															) && <span>{inputRef.current.value}</span>}
														{inputRef.current &&
															champion.name.replace(inputRef.current.value, "")}
													</span>
													<span className={styles.desc}>
														{champion.position &&
															translatePosition(champion.position)}
													</span>
												</div>
											</a>
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
				)}
			</form>
		</div>
	);
};

export default SearchBar;
