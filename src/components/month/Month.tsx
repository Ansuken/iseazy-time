import './Month.css'
import { Day } from '../day/Day';
import { DayFilled } from '../../types/DayFilled';
import { Dispatch, SetStateAction } from 'react';

type MonthProps = {
    sheet: DayFilled[]
    setSheet: Dispatch<SetStateAction<DayFilled[] | undefined>>
}

export const Month = ({
    sheet,
    setSheet
}: MonthProps) => {

    return (
        <div className="month">
            { sheet.map((sheetDay, index) => <Day sheetDay={sheetDay} key={index} setSheet={setSheet}/>) }
        </div>
    )
}
