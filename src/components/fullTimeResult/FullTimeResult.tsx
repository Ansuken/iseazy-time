import { useMemo } from 'react'
import { getTotalMinutesFromAllSheets } from '../../helpers/TimeCalculations'
import './FullTimeResult.css'

export const FullTimeResult = () => {
    
    const fullTimeResult = useMemo(()=>{
        return getTotalMinutesFromAllSheets()
    }, [])

    return (
        <div className="fullTimeResultWrapper">
            <div className="fullTimeResultTitle">Total general:</div>
            <div className={`${fullTimeResult >= 0 ? 'success' : 'error'}`}>
                {fullTimeResult}
            </div>
        </div>
        
    )
}