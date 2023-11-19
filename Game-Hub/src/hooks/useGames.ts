import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
  }
  
   interface fetchGamesResponse {
    count: number;
    results: Game[];
  }
  
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]); // state variable to store game objects
    const [error, setError] = useState(""); // state variable to store errors
    const [isLoading, setLoading] = useState(false);
  
    // useEffect to send fetch request to backend
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
        .get<fetchGamesResponse>("/games", {signal: controller.signal})
        .then((res) => {
            setGames(res.data.results)
            setLoading(false)
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
            setLoading(false);
        });

      return () => controller.abort();
    }, []);

    return {games, error, isLoading}
}

export default useGames;