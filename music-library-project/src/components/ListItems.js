import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Item from './Item';
import { useState } from 'react';

const ListItems = ({ type, items }) => {
    console.log("Items are here? ", items)
    const cards = items
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {type == 'search' &&
                    cards.map((card) => (
                        <Item key={card.id} data={card} type={type} />
                    ))
                }
            </Grid>
        </Container>
    )
}

export default ListItems;

