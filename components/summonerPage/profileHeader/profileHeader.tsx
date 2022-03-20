import React from "react";
import { Profile } from "../../../pages/summoners/[player]";
import { Season } from "../../../types/opgg_types";
import styles from "./profileHeader.module.scss";

const commaNumber = require("comma-number");

interface ProfileProps {
	profile: Profile;
	seasons: Season[];
}

const ProfileHeader: React.VFC<ProfileProps> = ({ profile, seasons }) => {
	return (
		<div className={styles.profileContainer}>
			{profile.previous_seasons.length > 0 && (
				<ul className={styles.seasonList}>
					{profile.previous_seasons
						.map((item) => {
							const seasonNumber =
								"S" +
								seasons.find((season) => season.id === item.season_id)
									?.display_value;

							const seasonTier =
								item.tier_info.tier[0] +
								item.tier_info.tier
									.slice(1, item.tier_info.tier.length)
									.toLowerCase();

							return (
								<li key={item.season_id}>
									{seasonNumber} {seasonTier}
								</li>
							);
						})
						.reverse()}
				</ul>
			)}
			<div className={styles.mainWrap}>
				<div className={styles.banner}>
					<div className={styles.iconWrap}>
						{profile.league_stats[0].tier_info.border_image_url && (
							<div
								className={styles.rankBorder}
								style={{
									backgroundImage: `url(
									${profile.league_stats[0].tier_info.border_image_url}
								)`,
								}}
							></div>
						)}
						<img src={profile.profile_image_url} alt="profile Icon" />
						<span className={styles.level}>{profile.level}</span>
					</div>
				</div>
				<div className={styles.profile}>
					<div className={styles.info}>
						<span className={styles.name}>{profile.name}</span>
						<button>
							<img
								src="https://s-lol-web.op.gg/static/images/icon/common/icon-favoriteStar-on.png?v=1646127701899"
								alt="star"
							/>
							즐겨찾기
						</button>
						{profile?.ladder_rank && (
							<div className={styles.ladder}>
								<a>
									{"래더랭킹 "}
									<span className={styles.ranking}>
										{commaNumber(profile.ladder_rank.rank)}
									</span>
									{` 위 (상위 ${(
										(profile.ladder_rank.rank / profile.ladder_rank.total) *
										100
									).toFixed(2)}%)`}
								</a>
							</div>
						)}
					</div>

					<div className={styles.buttons}>
						<button>전적 갱신</button>
					</div>

					<div className={styles.lastUpdate}>
						최근 업데이트 : {profile.updated_at.slice(0, 10)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
