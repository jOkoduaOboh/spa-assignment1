import styled from "@emotion/styled";
import Stat, { getGuessTendency, getGuessesPerWin, getTotalGuesses, getWins } from "../components/Stat";

const Statistics = () => {
    const Test = styled.div`
    justify-content: center;
    `
    return (
        <Test>
            <Stat title={"Wins:"} value={getWins()} />
            <Stat title={"Total Guesses:"} value={getTotalGuesses()} />
            <Stat title={"Avg Guesses Per Win:"} value={getGuessesPerWin()} />
            <Stat title={"Guess Tendency:"} value={getGuessTendency()} />
        </Test>

    )
}

export default Statistics;