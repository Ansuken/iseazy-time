import { isLongDay, isWeekend } from "./Time"
import { DayFilled } from "../types/DayFilled"
import { Breaks } from "../types/Breaks"
import { Schedule } from "../types/Schedule"

export const getSheetsFromStorage = (): DayFilled[] => {
    const storedSheet: DayFilled[] = JSON.parse(localStorage.getItem('sheets') ?? '[]')
    return storedSheet
}

export const getSheetFromStorageByDate = ({
    year,
    month
}: {
    year: number
    month: number
}): DayFilled[] | undefined => {
    const storedSheet: DayFilled[] = JSON.parse(localStorage.getItem('sheets') ?? '[]')
    return storedSheet.filter(day => day.month === month && day.year === year)
}

export const getCreatedSheet = ({year, month}: {
    year: number
    month: number
}) => {
    const newSheet: DayFilled[] = []
    const days = new Date(year, month + 1, 0).getDate()
    for (let i = 1; i <= days; i++) {
        const dayDate = new Date(year, month, i)
        const newDay: DayFilled = {
            day: i,
            month,
            year,
            isLongDay: isLongDay(dayDate),
            isWeekend: isWeekend(dayDate),
            isHoliday: false,
            startDate: '00:00',
            endDate: '00:00',
            startQuickBreak: '00:00',
            endQuickBreak: '00:00',
            startBreak: '00:00',
            endBreak: '00:00'
        }
        newSheet.push(newDay)
    }
    return newSheet;
}

export const updateSheetDay = ({
    sheetDay,
    day,
    month,
    year,
}: {
    sheetDay: DayFilled | undefined
    day: number
    month: number
    year: number
}) => {
    const storedSheet: DayFilled[] = JSON.parse(localStorage.getItem('sheets') ?? '[]')
    const newStored = storedSheet.map(storedDay => {
        if (storedDay.day === day && storedDay.month === month && storedDay.year === year) {
            return {
                ...storedDay,
                ...sheetDay
            }
        }
        return storedDay
    })
    
    localStorage.setItem('sheets', JSON.stringify(newStored))
}

export const getLongDays = (): number[] => {
    const longDays = JSON.parse(localStorage.getItem('longDays') ?? JSON.stringify([]))
    return longDays
}

export const getBreaksTime = (): Breaks => {
    const breaksTime = JSON.parse(localStorage.getItem('breaksTime') ?? JSON.stringify([]))
    return breaksTime
}

export const getSchedule = (): Schedule => {
    const schedule = JSON.parse(localStorage.getItem('schedule') ?? JSON.stringify({}))
    return schedule
}

export const hasLongDays = (): boolean => {
    const longDays = getLongDays()
    return longDays.length >= 2
}

export const hasBreaksTime = (): boolean => {
    const breaksTime = getBreaksTime()
    return breaksTime.shortBreak > 0 && breaksTime.longBreak > 0
}

export const hasSchedule = (): boolean => {
    const schedule = getSchedule()
    return !!schedule.shortDay.start && !!schedule.shortDay.end && !!schedule.longDay.start && !!schedule.longDay.end
}