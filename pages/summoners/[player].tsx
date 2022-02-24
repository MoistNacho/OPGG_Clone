import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const { query } = router;

	useEffect(() => {
		if (Object.keys(query).length !== 0) {
			axios
				.get(
					"https://www.op.gg/api/spectates/XjUyBtjFMPClaTxO79xsHuATvIUsHYBDYv_RwsqVla4U-No?region=kr"
				)
				.then((response) => {
					console.log(response);
				});
		}
	}, [query]);

	return <div>abc</div>;
};

export default SummonerPage;
