import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";

export default function RequestApi() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchPosts()
            .then(data => {
                console.log(data);
                setPosts(data);
            })
            .catch(error => console.error("Erro ao buscar dados:", error))
            .finally(() => setLoading(false));
        }, 
        [] // com isso aqui ele vai rodar apenas uma vez, quando o componente for montado, se tirar ele, vai rodar toda vez que o componente for atualizado, o que pode causar um loop infinito
    );

    return <div>{loading ? "Carregando..." : <pre>{JSON.stringify(posts, null, 2)}</pre>}</div>;
}
