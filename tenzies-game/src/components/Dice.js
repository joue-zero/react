

export default function Dice({value, isHeld, activeDie}) {
    const style = {
        backgroundColor: isHeld? "#59E391" : "#FFF"
    }
    // console.log(activeDice())
    return (
        <div className="die-face" style={style} onClick={activeDie}>
            <p>{value}</p>
        </div>
    );
}