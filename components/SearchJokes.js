'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchJokes.module.css';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalJokes } from '../features/jokesSlice';

export default function SearchJokes() {
    const [query, setQuery] = useState('');
    const [prevQueries, setPrevQueries] = useState(new Set());
    const dispatch = useDispatch();
    const totalJokes = useSelector((state) => state.jokes.totalJokes);


    const { data, isLoading, isError, refetch } = useQuery(
        ['jokes', query],
        () => axios.get(`/api/jokes?query=${query}`).then(res => res.data),
        {
            enabled: false,
            onSuccess: (data) => {
                setPrevQueries(new Set([...prevQueries, query]));
                dispatch(setTotalJokes(data.total));
            }
        }
    );


    function handleSearch() {


        if (query.length < 4) {
            alert("Мало символов для запроса! Нужно минимум 4.")

        }

        if (prevQueries.has(query)) {
            alert(`Запрос "${query}" уже был. Введите новый запрос или обновите страницу.`)

        }

        refetch()
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
            {isLoading && (<div className={styles.suspenseFallback}>
                <div className={styles.spinner}></div>
                <p>Loading...</p>
            </div>)}
            {isError && <div className={styles.noJokesFound}>Ошибка при загрузке шуток! Попробуйте еще раз.</div>}
            <div className={styles.jokesContainer}>
                {!isLoading && data?.total === 0 && (<div className={styles.noJokesFound}>Шуток не найдено! </div>)}
                {data?.result.map(joke => (
                    <div key={joke.id} className={styles.jokeCard}>
                        {joke.value}
                    </div>
                ))}
            </div>
        </div>
    );
}
