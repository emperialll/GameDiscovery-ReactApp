import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
    id: number;
    name: string;
  }
  
  interface fetchGamesResponse {
    count: number;
    results: Game[];
  }
  
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]); // state variable to store game objects
    const [error, setError] = useState(""); // state variable to store errors
  
    // useEffect to send fetch request to backend
    useEffect(() => {
        const controller = new AbortController();
      apiClient
        .get<fetchGamesResponse>("/games", {signal: controller.signal})
        .then((res) => setGames(res.data.results))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

      return () => controller.abort();
    }, []);

    return {games, error}
}

export default useGames;