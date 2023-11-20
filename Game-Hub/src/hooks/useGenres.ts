import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface fetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]); // state variable to store game objects
    const [error, setError] = useState(""); // state variable to store errors
    const [isLoading, setLoading] = useState(false);
  
    // useEffect to send fetch request to backend
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
        .get<fetchGenresResponse>("/genres", {signal: controller.signal})
        .then((res) => {
            setGenres(res.data.results)
            setLoading(false)
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
            setLoading(false);
        });

      return () => controller.abort();
    }, []);

    return {genres, error, isLoading}
};

export default useGenres;