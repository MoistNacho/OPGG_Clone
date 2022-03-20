import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Home.module.scss";
import logoPic from "../design/img/logo/opgg_logo.jpg";
import SearchBar from "../components/searchBar/searchBar";
import { Champion } from "../types/opgg_types";

export interface ChampionProps {
	champions: Champion[];
}

const Home: NextPage<ChampionProps> = ({ champions }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Clone OP.GG</title>
				<meta name="description" content="OP.GG 클론 프로젝트" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.logoContainer}>
					<Image src={logoPic} alt="opgg_logo" />
				</div>
				<SearchBar champions={champions} />
			</main>

			<footer className={styles.footer}>
				<p>본 프로젝트는 포트폴리용으로 제작된 OP.GG 클론 프로젝트 입니다</p>
			</footer>
		</div>
	);
};

export default Home;
