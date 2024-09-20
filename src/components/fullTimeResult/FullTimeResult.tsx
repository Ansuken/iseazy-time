import { getTotalMinutesFromAllSheets } from '../../helpers/TimeCalculations'
import './FullTimeResult.css'

export const FullTimeResult = () => {
    
    const fullTimeResult = getTotalMinutesFromAllSheets()

    return (
        <div className="fullTimeResultWrapper">
            <div className="fullTimeResultTitle">Total general:</div>
            <div className={`${fullTimeResult >= 0 ? 'success' : 'error'}`}>
                {fullTimeResult}
            </div>
        </div>
        
    )
}