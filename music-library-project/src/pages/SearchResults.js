import React, { useEffect, useState } from 'react';

import ListItems from '../components/ListItems';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function SearchResults() {
    const query = useParams()
    const [items, setItems] = useState([])
    console.log("Query,", query.entry);

    useEffect(() => {
        const getResult = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query.entry}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cc15021543msh4f1f720c4802207p1dee0ejsnea57365bbe43',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setItems(result.data.slice(0, 24))
                return true
            } catch (error) {
                console.error(error);
            }
        }

        getResult();
    }, [query.entry])

    if (items === "") {
        return (
            <>
                <main>
                    Searching...
                    <Box
                        sx={{
                            pt: '25vh',
                            pb: '25vh',
                        }}
                    />
                </main>
            </>
        );
    }

    return (
        <>
            <main>
                <Box sx={{pt: '3vh'}}/>
                <ListItems type='search' items={items}></ListItems>
            </main>
        </>
    );
}