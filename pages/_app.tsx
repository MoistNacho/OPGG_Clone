import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import axios from "axios";
import { Champion } from "../types/opgg_types";

function MyApp({ Component, pageProps }: AppProps) {
	const [champions, setChampions] = useState<Champion[] | null>(null);

	useEffect(() => {
		axios
			.get(
				"http://ddragon.leagueoflegends.com/cdn/12.4.1/data/ko_KR/champion.json"
			)
			.then((response) => {
				const resObj = response.data.data;
				let championsArr = Object.keys(resObj).map((champion) => {
					return {
						id: resObj[champion].id,
						name: resObj[champion].name,
						title: resObj[champion].title,
						info: resObj[champion].blurb,
						imgUrl: `http://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${champion}.png`,
					};
				});

				setChampions(championsArr);
			})
			.catch((error) => {
				console.error("챔피언 정보를 불러올 수 없습니다." + error);
			});
	}, []);
	return <Component {...pageProps} champions={champions} />;
}

export default MyApp;
