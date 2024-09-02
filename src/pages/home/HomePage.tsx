import './HomePage.css'
import { useCallback, useEffect, useState } from "react"
import { DayFilled } from "../../types/DayFilled"
import { getMonthName } from "../../helpers/Time"
import {
    getCreatedSheet,
    getSheetFromStorageByDate,
    getSheetsFromStorage,
    hasBreaksTime,
    hasDisclaimer,
    hasLongDays,
    hasSchedule
} from "../../helpers/Storage"
import { Month } from "../../components/month/Month"
import { Button } from "../../components/button/Button"
import { MonthResult } from '../../components/monthResult/MonthResult'

export const HomePage = () => {
    const storedMonth = localStorage.getItem('month') ?? new Date().getMonth().toString()
    const storedYear = localStorage.getItem('year') ?? new Date().getFullYear().toString()

    const [month, setMonth] = useState(parseInt(storedMonth))
    const [year, setYear] = useState(parseInt(storedYear))


    const getSheetFromStorage = useCallback((): DayFilled[] | undefined => 
        getSheetFromStorageByDate({
            year,
            month
        }), [year, month])

    const [sheet, setSheet] = useState<DayFilled[] | undefined>(getSheetFromStorage())

    const handleMonthChange = (increase: boolean) => {
        const calculatedMonth = month + (increase ? 1 : -1)
        const increasedMonth = calculatedMonth === -1 ? 11 : calculatedMonth === 12 ? 0 : calculatedMonth

        if ( calculatedMonth === -1 ) handleYearChange(false)
        else if (calculatedMonth === 12) handleYearChange(true)

        setMonth(increasedMonth)
        localStorage.setItem('month', increasedMonth.toString())
    }

    const handleYearChange = (increase: boolean) => {
        const newYear = year + (increase ? 1 : -1)
        setYear(newYear)
        localStorage.setItem('year', newYear.toString())
    }

    const createSheet = () => {
        const sheets = getSheetsFromStorage()
        const newSheet: DayFilled[] = getCreatedSheet({
            year,
            month
        })
        setSheet(newSheet)
        localStorage.setItem('sheets', JSON.stringify(sheets.concat(newSheet)))
    }

    useEffect(() => 
        setSheet(getSheetFromStorage())
    , [year, month, getSheetFromStorage])

    return (
        <div className="home">
            <div className="monthWrapper">
                {
                hasDisclaimer() && 
                    <div className="disclaimer">
                        {!hasLongDays() && <p>Revisa la configuración para agregar días de trabajo largos</p>}
                        {!hasBreaksTime() && <p>Revisa la configuración para agregar tiempo de descanso</p>}
                        {!hasSchedule() && <p>Revisa la configuración para agregar horarios de trabajo</p>}
                    </div>
                }
                
                <div className="monthTitle">
                    <div className="monthText">{getMonthName(month)} {year}</div>
                    <div className="monthChange">
                        <MonthResult month={month} year={year} />
                        <span className="monthChangeArrow material-symbols-outlined" onClick={() => handleMonthChange(false)}>chevron_left</span>
                        <span className="monthChangeArrow material-symbols-outlined" onClick={() => handleMonthChange(true)}>chevron_right</span>
                    </div>
                </div>
                <div className="monthView">
                    {sheet && sheet.length > 0 && <Month sheet={sheet} setSheet={setSheet} />}
                    {!sheet || sheet.length === 0 && 
                        <div className="emptySheet">
                            No hay datos para este mes
                            <Button title="Crear Hoja del mes" onClick={createSheet} disabled={hasDisclaimer()} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}