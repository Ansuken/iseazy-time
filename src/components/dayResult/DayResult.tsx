import { getRestTime, isEmpty } from '../../helpers/TimeCalculations'
import { DayFilled } from '../../types/DayFilled'

export const DayResult = ({day}: {day: DayFilled}) => {

    return (
        <h1 className={`${getRestTime({day}) >= 0 ? 'success' : 'error'}`}>
            {!isEmpty({day}) && getRestTime({day})}
        </h1>)
}