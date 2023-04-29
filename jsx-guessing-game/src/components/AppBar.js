import styled from "@emotion/styled";
import { useNavigate} from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();
    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = 'gray';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'inherit';
    };

    const Bar = styled.div`
    background-color: #f1f1f1;
    padding: 0.01%;
    text-align: center;
    height: 100px
    `;

    const SideColumn = styled.div`
    background-color: inherit;
    float: left;
    width: 40%;
    height: 100%;
    margin: auto auto;
    `;

    const MiddleColumn = styled.div`
    background-color: inherit;
    float: left;
    width: 20%;
    height: 100%;
    margin: auto auto;
    `;

    const Button = styled.button`
    height: 98%;
    width: 42%;
    font-size: 2.5vw;
    margin: auto auto;
    border: 0px;
    border-left: 1px solid;
    border-right: 1px solid;
    cursor: pointer;
    `;

    const Title = styled.button`
    height: 98%;
    width: 100%;
    text-align: center;
    border: 0px;
    font-size: 140%;
    font-weight: bold;
    `;

    return (
        <>
            <Bar>
                <SideColumn>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => { navigate("/") }}
                    >
                        Play
                    </Button>
                </SideColumn>
                <MiddleColumn>
                    <Title>Guessing Game</Title>
                </MiddleColumn>
                <SideColumn>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => { navigate("/stats") }}
                    >
                        Statistics
                    </Button>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => { navigate("/settings") }}
                    >
                        Settings
                    </Button>
                </SideColumn>
            </Bar>
        </>
    )
}



export default TopBar;

