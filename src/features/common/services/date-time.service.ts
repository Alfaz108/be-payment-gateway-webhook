import { Injectable } from '@nestjs/common';
import {
    endOfDay,
    endOfMonth,
    getMonth,
    getYear,
    startOfDay,
    startOfMonth,
} from 'date-fns';

@Injectable()
export class DateTimeService {
    getStartAndEndDate(
        startDate: Date,
        endDate: Date,
    ): { startMonth: Date; endMonth: Date } {
        if (
            startDate.toString() !== 'Invalid Date' &&
            endDate.toString() !== 'Invalid Date'
        ) {
            return { startMonth: startDate, endMonth: endDate };
        } else {
            const date = new Date();

            const month = getMonth(date);
            const year = getYear(date);

            return this.getStartAndEndOfMonth(year, month);
        }
    }

    getStartAndEndOfMonth(
        year: number,
        month: number,
    ): { startMonth: Date; endMonth: Date } {
        const startDate: Date = startOfMonth(new Date(year, month));

        const endDate: Date = endOfMonth(startDate);

        return { startMonth: startDate, endMonth: endDate };
    }

    getStartAndEndOfCurrentDay(): { startOfDay: Date; endOfDay: Date } {
        const date: Date = new Date();

        const startOfDayDate: Date = startOfDay(date);

        const endOfDayDate: Date = endOfDay(date);

        return { startOfDay: startOfDayDate, endOfDay: endOfDayDate };
    }
}
