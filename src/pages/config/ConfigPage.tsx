import { useState } from 'react'
import './ConfigPage.css'
import { getBreaksTime, getLongDays, getSchedule } from '../../helpers/Storage'
import { Breaks } from '../../types/Breaks'
import { Schedule } from '../../types/Schedule'
export const ConfigPage = () => {

    const [longDays, setLongDays] = useState<number[]>(getLongDays())
    const [breaksTime, setBreaksTime] = useState<Breaks>({
            shortBreak: getBreaksTime().shortBreak || 0,
            longBreak: getBreaksTime().longBreak || 0
        }
    )
    const [schedule, setSchedule] = useState<Schedule>(getSchedule())

    const isLongDayChecked = (day: number) => 
        longDays.includes(day)

    const handleDayClick = (day: number) => {
        const newDays = longDays.includes(day) ? longDays.filter(d => d !== day) : [...longDays, day]
        setLongDays(newDays)
        localStorage.setItem('longDays', JSON.stringify(newDays))
    }

    const increaseShortBreak = () => 
        setBreaksTime((state) => {
            const newState = {
                ...breaksTime,
                shortBreak: state.shortBreak + 1
            }
            localStorage.setItem('breaksTime', JSON.stringify(newState))
            return newState
        })
    const decreaseShortBreak = () => 
        setBreaksTime((state) => {
            const newState = {
                ...breaksTime,
                shortBreak: state.shortBreak - 1 > 0 ? state.shortBreak - 1 : 0
            }
            localStorage.setItem('breaksTime', JSON.stringify(newState))
            return newState
        })
    const increaseLongBreak = () => 
        setBreaksTime((state) => {
            const newState = {
                ...breaksTime,
                longBreak: state.longBreak + 1
            }
            localStorage.setItem('breaksTime', JSON.stringify(newState))
            return newState
        })
    const decreaseLongBreak = () => 
        setBreaksTime((state) => {
            const newState = {
                ...breaksTime,
                longBreak: state.longBreak - 1 > 0 ? state.longBreak - 1 : 0
            }
            localStorage.setItem('breaksTime', JSON.stringify(newState))
            return newState
        })

    const handleScheduleChange = (kind: 'shortDay' | 'longDay', time: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setSchedule(state => {
            const newState = {
                ...state,
                [kind]: {
                    ...state[kind],
                    [time]: e.target.value
                }
            }
            localStorage.setItem('schedule', JSON.stringify(newState))
            return newState;
        })
    }
    return (
        <div className="config">
            <h1>Configuración</h1>
            <div className="configWrapper">
                <div className="card">
                    <h3 className="cardTitle">Tipo de días</h3>
                    <p>Elige qué días de la semana son largos por defecto. Cualquier cambio en esta configuración tendrá efecto en la próxima carga de hoja del mes</p>
                    <div className="workingDays">
                        <span className={`workingDay ${isLongDayChecked(1) && 'longDay'}`} onClick={()=>handleDayClick(1)}>Lunes</span>
                        <span className={`workingDay ${isLongDayChecked(2) && 'longDay'}`} onClick={()=>handleDayClick(2)}>Martes</span>
                        <span className={`workingDay ${isLongDayChecked(3) && 'longDay'}`} onClick={()=>handleDayClick(3)}>Miércoles</span>
                        <span className={`workingDay ${isLongDayChecked(4) && 'longDay'}`} onClick={()=>handleDayClick(4)}>Jueves</span>
                        <span className={`workingDay ${isLongDayChecked(5) && 'longDay'}`} onClick={()=>handleDayClick(5)}>Viernes</span>
                    </div>
                </div>
                <div className="card">
                    <h3 className="cardTitle">Tiempo de descanso</h3>
                    <p>Elige el tiempo de descanso por defecto para el desanso corto y la comida.</p>
                    <div className="breakTime">
                        <div className="breakTimeItem">
                            <label>Corto (mins)</label>
                            <div className="breakControl">
                                <span className="breakSymbol material-symbols-outlined" onClick={decreaseShortBreak}>
                                    remove
                                </span>
                                <span className="breakTimeText">{breaksTime.shortBreak}</span>
                                <span className="breakSymbol material-symbols-outlined" onClick={increaseShortBreak}>
                                    add
                                </span>
                            </div>
                            
                        </div>
                        <div className="breakTimeItem">
                            <label>Comida (mins)</label>
                            <div className="breakControl">
                                <span className="breakSymbol material-symbols-outlined" onClick={decreaseLongBreak}>
                                    remove
                                </span>
                                <span className="breakTimeText">{breaksTime.longBreak}</span>
                                <span className="breakSymbol material-symbols-outlined" onClick={increaseLongBreak}>
                                    add
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h3 className="cardTitle">Horario estándar</h3>
                    <p>Elige el horario estándar para el trabajo</p>
                    <div className="schedule">
                        <div className="scheduleItem">
                            <label>Día largo</label>
                            <input type="time" value={schedule.longDay?.start||'00:00'} onChange={(e)=>handleScheduleChange('longDay', 'start', e)} />
                            <input type="time" value={schedule.longDay?.end||'00:00'} onChange={(e)=>handleScheduleChange('longDay', 'end', e)} />
                        </div>
                        <div className="scheduleItem">
                            <label>Día corto</label>
                            <input type="time" value={schedule.shortDay?.start||'00:00'} onChange={(e)=>handleScheduleChange('shortDay', 'start', e)} />
                            <input type="time" value={schedule.shortDay?.end||'00:00'} onChange={(e)=>handleScheduleChange('shortDay', 'end', e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}