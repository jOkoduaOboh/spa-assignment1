import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Item from './Item';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ListItems = () => {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {cards.map((card) => (
                <Item key={card}/>
                ))}
            </Grid>
        </Container>
    )
}

export default ListItems;

