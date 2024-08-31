import { getTimeFromNow } from '../../helpers/Time'
import './DateControl.css'

type DateControlProps = {
    value?: string
    onTimeChanged: (value: string) => void
}

export const DateControl = ({
    value,
    onTimeChanged
}: DateControlProps) => {

    const inputValue = value ? value : '00:00'

    const handleButtonClick = () => 
        onTimeChanged(getTimeFromNow() ?? '00:00')

    const handleInputClick = (e: React.ChangeEvent<HTMLInputElement>) => 
        onTimeChanged(e.target.value)

    return (
        <div className="dateControl">
            <input className="inputControl" type="time" value={inputValue} onChange={handleInputClick} />
            <span className="material-symbols-outlined manualSetButton" onClick={handleButtonClick} title="Hora actual">
                schedule
            </span>
        </div>
    )
}
