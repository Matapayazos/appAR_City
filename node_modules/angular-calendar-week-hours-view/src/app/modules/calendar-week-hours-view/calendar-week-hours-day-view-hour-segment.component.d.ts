import { TemplateRef } from '@angular/core';
import { DayViewHourSegment } from 'calendar-utils';
export declare class CalendarWeekHoursDayViewHourSegmentComponent {
    segment: DayViewHourSegment;
    segmentHeight: number;
    locale: string;
    customTemplate: TemplateRef<any>;
    hourVisible: boolean;
}
