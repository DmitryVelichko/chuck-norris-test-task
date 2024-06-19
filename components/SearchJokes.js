'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchJokes.module.css';

export default function SearchJokes() {
    const [query, setQuery] = useState('');
    const [jokes, setJokes] = useState([]);
    const [prevQueries, setPrevQueries] = useState(new Set());
    const [totalJokes, setTotalJokes] = useState("0")
    const [loading, setLoading] = useState(false); 



    function handleSearch() {
        
        if(query.length < 4) {
            alert("Мало символов для запроса! Нужно минимум 4.")
        }

        if(prevQueries.has(query)) {
            alert(`Запрос "${query}" уже был. Введите новый запрос или обновите страницу.`)
        }

        

        if (query.length >= 4 && !prevQueries.has(query)) {
            setLoading(true);
            axios.get(`/api/jokes?query=${query}`)
                .then(response => {
                    setTotalJokes(response.data.total)
                    setJokes(response.data.result);
                    setPrevQueries(new Set([...prevQueries, query]));
                    setLoading(false);
                })
                .catch(error => console.error('Error fetching jokes:', error));
                
               
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.smallContainer}>
                <input
                    type="text"
                    placeholder="Искать шутки..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.searchInput}
                />

                <button onClick={handleSearch} className={styles.searchButton}>Поиск</button>
            </div>
            <p className={styles.totalCount}>Всего шуток: {totalJokes}</p>
            {loading && <div className={styles.spinner}>Loading...</div>}
            <div className={styles.jokesContainer}>
            {totalJokes === 0 ? <div className={styles.noJokesFound}>Шуток не найдено! </div> : null}
                {jokes.map(joke => (
                    <div key={joke.id} className={styles.jokeCard}>
                        {joke.value}
                    </div>
                ))}
            </div>
        </div>
    );
}


// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useQuery } from 'react-query';
// import axios from 'axios';
// import { setQuery, setJokes, setTotalCount } from '../features/searchSlice';

// const fetchJokes = async (query) => {
//     const { data } = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
//     return data;
// };

// const SearchJokes = () => {
//     const dispatch = useDispatch();
//     const { query, jokes, totalCount } = useSelector((state) => state.search);
//     const [input, setInput] = useState('');

//     const { refetch } = useQuery(['searchJokes', query], () => fetchJokes(query), {
//         enabled: false,
//         onSuccess: (data) => {
//             dispatch(setJokes(data.result));
//             dispatch(setTotalCount(data.total));
//         },
//     });

//     async function handleSearch () {
//         const data = await fetchJokes();
//         console.log(data.json());
//         if (input.length >= 4 && input !== query) {
//           dispatch(setQuery(input));
//           refetch();
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Search jokes..."
//             />
//             <button onClick={handleSearch}>Search</button>
//             <p>Total count: {totalCount}</p>
//             <div>
//                 {jokes.map((joke) => (
//                     <div key={joke.id}>
//                         <p>{joke.value}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchJokes;

