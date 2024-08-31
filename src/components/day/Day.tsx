import './Day.css'
import { DateControl } from '../dateControl/DateControl';
import { DayFilled } from '../../types/DayFilled';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { getFormattedDate } from '../../helpers/Time';
import { updateSheetDay } from '../../helpers/Storage';
import { DayResult } from '../dayResult/DayResult';

export const Day = ({sheetDay, setSheet}: {sheetDay: DayFilled, setSheet: Dispatch<SetStateAction<DayFilled[] | undefined>>}) => {

    const day = useMemo(()=> 
        getFormattedDate(new Date(sheetDay.year, sheetDay.month, sheetDay.day))
    , [sheetDay])

    if (!sheetDay || sheetDay.isWeekend) return null;

    const handleChange = (kind: string, value?: string, ) => {
        setSheet(sheet => {
            if (!sheet) return sheet
            const currentDay = sheet.find(day => day.day === sheetDay.day && day.month === sheetDay.month && day.year === sheetDay.year)
            if (!currentDay) return sheet

            const newState =  sheet.map(day => {
                if (day.day === sheetDay.day && day.month === sheetDay.month && day.year === sheetDay.year) {
                    if ( kind === 'isHoliday' ) {
                        return {
                            ...day,
                            isHoliday: !day.isHoliday
                        }
                    } else if ( kind === 'isLongDay' ) {
                        return {
                            ...day,
                            isLongDay: !day.isLongDay
                        }
                    } else if ( kind === 'reset' ) {
                        return {
                            ...day,
                            startDate: '00:00',
                            endDate: '00:00',
                            startQuickBreak: '00:00',
                            endQuickBreak: '00:00',
                            startBreak: '00:00',
                            endBreak: '00:00'
                        }
                    } else { 
                        return {
                            ...day,
                            [kind]: value
                        }
                    }
                }
                return day;
            })

            updateSheetDay({
                sheetDay: newState.find(day => day.day === sheetDay.day && day.month === sheetDay.month && day.year === sheetDay.year),
                day: sheetDay.day,
                month: sheetDay.month,
                year: sheetDay.year
            })

            return newState;
        })
        
    }

    
    return (
        <div className={`dayWrapper ${sheetDay.isHoliday ? 'holiday' : ''}`}>
            <div className="dataWrapper">
                <div className="day">
                    {day}
                </div>
                {!sheetDay.isHoliday ? <div className="conceptsWrapper">
                    <div className="dayConcept">
                        Hora de inicio
                        <DateControl value={sheetDay.startDate} onTimeChanged={(value: string)=>handleChange('startDate', value)} />
                    </div>
                    <div className="dayConcept">
                        Inicio descanso
                        <DateControl value={sheetDay.startQuickBreak} onTimeChanged={(value: string)=>handleChange('startQuickBreak', value)} />
                    </div>
                    <div className="dayConcept">
                        Fin descanso
                        <DateControl value={sheetDay.endQuickBreak} onTimeChanged={(value: string)=>handleChange('endQuickBreak', value)} />
                    </div>
                    {sheetDay.isLongDay && <div className="dayConcept">
                        Inicio Comida
                        <DateControl value={sheetDay.startBreak} onTimeChanged={(value: string)=>handleChange('startBreak', value)} />
                    </div>}
                    {sheetDay.isLongDay && <div className="dayConcept">
                        Fin Comida
                        <DateControl value={sheetDay.endBreak} onTimeChanged={(value: string)=>handleChange('endBreak', value)} />
                    </div>}
                    <div className="dayConcept">
                        Hora de fin
                        <DateControl value={sheetDay.endDate} onTimeChanged={(value: string)=>handleChange('endDate', value)} />
                    </div>
                </div> :<div className="holidayText">LIBRE</div> }
            </div>

            <div className="dayFooter">
                <DayResult day={sheetDay} />
                <div className="dayActions">
                    <span title="Es vacaciones" className={`actionIcon material-symbols-outlined ${sheetDay.isHoliday ? 'actionIconActive' : ''}`} onClick={() => handleChange('isHoliday')}>
                        beach_access
                    </span>
                    {!sheetDay.isHoliday && <span title="Es día largo" className={`actionIcon material-symbols-outlined ${sheetDay.isLongDay ? 'actionIconActive' : ''}`} onClick={() => handleChange('isLongDay')}>
                        more_time
                    </span>}
                    {!sheetDay.isHoliday && <span title="Resetear" className={`actionIcon material-symbols-outlined`} onClick={() => handleChange('reset')}>
                        restart_alt
                    </span>}
                </div>
            </div>
            
        </div>
        
    )
}
