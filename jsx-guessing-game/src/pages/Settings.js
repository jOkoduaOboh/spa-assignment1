import { useState } from "react";
import { getMaxGuessVal, getMinGuessVal, getNumOfGuesses, setMaxGuessVal, setMinGuessVal, setNumOfGuesses } from "../components/SettingValues";
import styled from "@emotion/styled";

const NumInput = ({ value, onKeyUp }) => {
    const StyledNumInput = styled.input`
    width:80px
    `;
    return (
        <StyledNumInput type="number" defaultValue={value} onKeyUp={onKeyUp} />
    )
}
const Settings = () => {
    const [notify, setNotify] = useState(false)

    const handleKeyUp = (e, type) => {
        if (e.key === "Enter") {
            switch (type) {
                case 'num':
                    setNumOfGuesses(e.target.value);
                    break;
                case 'min':
                    setMinGuessVal(e.target.value);
                    break;
                case 'max':
                    setMaxGuessVal(e.target.value);
                    break;
                default:
            }
            setNotify(true);
            setTimeout(() => {
                setNotify(false)
            }, 1500);
        }
    }

    return (
        <>
            <div><strong>Guesses Allowed</strong>:</div>
            <NumInput value={getNumOfGuesses()} onKeyUp={(e) => { handleKeyUp(e, "num") }} />
            <p></p>
            <div><strong>Guess Range</strong>:</div>
            <div>
                <NumInput value={getMinGuessVal()} onKeyUp={(e) => { handleKeyUp(e, "min") }} />
                <em> to </em>
                <NumInput value={getMaxGuessVal()} onKeyUp={(e) => { handleKeyUp(e, "max") }} />
            </div>
            {notify === true && <div>
                <br />
                <h3> <em>Successfully Updated!</em> </h3>
            </div>}
        </>
    )

}

export default Settings;