import { getSheetFromStorageByDate } from '../../helpers/Storage'
import { getTotalMinutesFromSheet } from '../../helpers/TimeCalculations'
import './MonthResult.css'

export const MonthResult = ({ month, year }: { month: number, year: number }) => {

    const sheet = getSheetFromStorageByDate({
        year,
        month
    })
    
    if (!sheet) return null

    return (
        <div className="monthResultWrapper">
            <div className="monthResultTitle">Total del mes:</div>
            <div className={`${getTotalMinutesFromSheet({sheet}) >= 0 ? 'success' : 'error'}`}>
                {getTotalMinutesFromSheet({sheet})}
            </div>
        </div>
        
    )
}