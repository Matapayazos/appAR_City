import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, NgModule } from '@angular/core';
import 'rxjs/Subject';
import { addDays, addMinutes } from 'date-fns';
import { CalendarUtils, CalendarModule } from 'angular-calendar';
import { validateEvents } from 'angular-calendar/modules/common/util';
import { CalendarResizeHelper } from 'angular-calendar/modules/common/calendar-resize-helper.provider';
import { CalendarDragHelper } from 'angular-calendar/modules/common/calendar-drag-helper.provider';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';

class CalendarWeekHoursViewComponent {
    constructor(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        this.events = [];
        this.excludeDays = [];
        this.tooltipPlacement = 'bottom';
        this.tooltipAppendToBody = true;
        this.precision = 'days';
        this.dayStartHour = 0;
        this.dayStartMinute = 0;
        this.dayEndHour = 23;
        this.dayEndMinute = 59;
        this.hourSegments = 2;
        this.hourSegmentHeight = 30;
        this.dayHeaderClicked = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.hourSegmentClicked = new EventEmitter();
        this.eventTimesChanged = new EventEmitter();
        this.beforeViewRender = new EventEmitter();
        this.hours = [];
        this.eventRows = [];
        this.currentResizes = new Map();
        this.locale = locale;
    }
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    ngOnChanges(changes) {
        if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (changes.events || changes.viewDate || changes.excludeDays) {
            this.refreshBody();
        }
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
    }
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    resizeStarted(weekViewContainer, weekEvent, resizeEvent) {
        this.currentResizes.set(weekEvent, {
            originalOffset: weekEvent.offset,
            originalSpan: weekEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        const                  resizeHelper = new CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    resizing(weekEvent, resizeEvent, dayWidth) {
        const                  currentResize = this.currentResizes.get(weekEvent);
        if (resizeEvent.edges.left) {
            const                  diff = Math.round(+resizeEvent.edges.left / dayWidth);
            weekEvent.offset = currentResize.originalOffset + diff;
            weekEvent.span = currentResize.originalSpan - diff;
        }
        else if (resizeEvent.edges.right) {
            const                  diff = Math.round(+resizeEvent.edges.right / dayWidth);
            weekEvent.span = currentResize.originalSpan + diff;
        }
    }
    resizeEnded(weekEvent) {
        const                  currentResize = this.currentResizes.get(weekEvent);
        let                  daysDiff;
        if (currentResize.edge === 'left') {
            daysDiff = weekEvent.offset - currentResize.originalOffset;
        }
        else {
            daysDiff = weekEvent.span - currentResize.originalSpan;
        }
        weekEvent.offset = currentResize.originalOffset;
        weekEvent.span = currentResize.originalSpan;
        let                  newStart = weekEvent.event.start;
        let                  newEnd = weekEvent.event.end;
        if (currentResize.edge === 'left') {
            newStart = addDays(newStart, daysDiff);
        }
        else if (newEnd) {
            newEnd = addDays(newEnd, daysDiff);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: weekEvent.event });
        this.currentResizes.delete(weekEvent);
    }
    eventDragged(weekEvent, draggedByPx, dayWidth) {
        const                  daysDragged = draggedByPx / dayWidth;
        if (daysDragged !== 0) {
            const                  newStart = addDays(weekEvent.event.start, daysDragged);
            let                  newEnd;
            if (weekEvent.event.end) {
                newEnd = addDays(weekEvent.event.end, daysDragged);
            }
            this.eventTimesChanged.emit({ newStart, newEnd, event: weekEvent.event });
        }
    }
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    dragStart(weekViewContainer, event) {
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        const                  dragHelper = new CalendarDragHelper(weekViewContainer, event);
        this.validateDrag = ({ x, y }) => this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
        this.cdr.markForCheck();
    }
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.beforeViewRender.emit({
            header: this.days
        });
    }
    refreshBody() {
        this.eventRows = this.utils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true
        }).eventRows;
    }
    refreshHourGrid() {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.refreshHourGrid();
    }
    eventDropped(dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    }
}
CalendarWeekHoursViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'iq-calendar-week-hours-view',
                template: `
        <div class="cal-week-hours-view" #weekViewContainer>
            <iq-calendar-week-hours-view-header
                [days]="days"
                [locale]="locale"
                [customTemplate]="headerTemplate"
                (dayHeaderClicked)="dayHeaderClicked.emit($event)"
                (eventDropped)="eventTimesChanged.emit($event)">
            </iq-calendar-week-hours-view-header>
            <div class="cal-days-container">
                <div class="cal-day-container">
                    <div class="cal-day-view">
                        <div class="cal-hour-rows">
                            <div class="cal-events">
                                <div class="cal-hour"
                                     [class.cal-week-hour-even]="i % 2 === 0"
                                     [class.cal-week-hour-odd]="i % 2 === 1"
                                     *ngFor="let hour of hours; let i = index">
                                    <iq-calendar-week-hours-day-view-hour-segment
                                        *ngFor="let segment of hour.segments"
                                        [style.height.px]="hourSegmentHeight"
                                        [segment]="segment"
                                        [segmentHeight]="hourSegmentHeight"
                                        [locale]="locale"
                                        [customTemplate]="hourSegmentTemplate"
                                        [class.cal-drag-over]="segment.dragOver"
                                        mwlDroppable
                                        (dragEnter)="segment.dragOver = true"
                                        (dragLeave)="segment.dragOver = false"
                                        (drop)="segment.dragOver = false; eventDropped($event, segment)">
                                    </iq-calendar-week-hours-day-view-hour-segment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cal-day-container"
                     [class.cal-past]="day.isPast"
                     [class.cal-today]="day.isToday"
                     [class.cal-future]="day.isFuture"
                     *ngFor="let day of days">
                    <iq-calendar-week-hours-day-view [dayStartHour]="dayStartHour"
                                                     [dayStartMinute]="dayStartMinute"
                                                     [dayEndHour]="dayEndHour"
                                                     [dayEndMinute]="dayEndMinute"
                                                     [events]="events"
                                                     [viewDate]="day.date"
                                                     [hourSegments]="hourSegments"
                                                     [hourSegmentHeight]="hourSegmentHeight"
                                                     [eventWidth]="(weekViewContainer.offsetWidth / 8)"
                                                     (eventClicked)="eventClicked.emit($event)"
                                                     (hourSegmentClicked)="hourSegmentClicked.emit($event)"
                                                     (eventTimesChanged)="eventTimesChanged.emit($event)"
                                                     [eventTitleTemplate]="eventTitleTemplate"
                                                     [eventTemplate]="eventTemplate">
                    </iq-calendar-week-hours-day-view>
                </div>
            </div>
        </div>
    `
            },] },
];
CalendarWeekHoursViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: CalendarUtils, },
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
];
CalendarWeekHoursViewComponent.propDecorators = {
    "viewDate": [{ type: Input },],
    "events": [{ type: Input },],
    "excludeDays": [{ type: Input },],
    "refresh": [{ type: Input },],
    "locale": [{ type: Input },],
    "tooltipPlacement": [{ type: Input },],
    "tooltipTemplate": [{ type: Input },],
    "tooltipAppendToBody": [{ type: Input },],
    "weekStartsOn": [{ type: Input },],
    "headerTemplate": [{ type: Input },],
    "eventTemplate": [{ type: Input },],
    "eventTitleTemplate": [{ type: Input },],
    "precision": [{ type: Input },],
    "weekendDays": [{ type: Input },],
    "dayStartHour": [{ type: Input },],
    "dayStartMinute": [{ type: Input },],
    "dayEndHour": [{ type: Input },],
    "dayEndMinute": [{ type: Input },],
    "hourSegments": [{ type: Input },],
    "hourSegmentHeight": [{ type: Input },],
    "hourSegmentTemplate": [{ type: Input },],
    "dayHeaderClicked": [{ type: Output },],
    "eventClicked": [{ type: Output },],
    "hourSegmentClicked": [{ type: Output },],
    "eventTimesChanged": [{ type: Output },],
    "beforeViewRender": [{ type: Output },],
};

class CalendarWeekHoursViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
CalendarWeekHoursViewEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'iq-calendar-week-hours-view-event',
                template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody">
      <div
        class="cal-event"
        [style.backgroundColor]="weekEvent.event.color.secondary"
        [mwlCalendarTooltip]="weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event"
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody">
        <mwl-calendar-event-actions [event]="weekEvent.event"></mwl-calendar-event-actions>
        <mwl-calendar-event-title
          [event]="weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          view="week"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody
      }">
    </ng-template>
  `
            },] },
];
CalendarWeekHoursViewEventComponent.ctorParameters = () => [];
CalendarWeekHoursViewEventComponent.propDecorators = {
    "weekEvent": [{ type: Input },],
    "tooltipPlacement": [{ type: Input },],
    "tooltipAppendToBody": [{ type: Input },],
    "customTemplate": [{ type: Input },],
    "eventTitleTemplate": [{ type: Input },],
    "tooltipTemplate": [{ type: Input },],
    "eventClicked": [{ type: Output },],
};

const MINUTES_IN_HOUR = 60;

class CalendarWeekHoursDayViewComponent {
    constructor(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        this.events = [];
        this.hourSegments = 2;
        this.hourSegmentHeight = 30;
        this.dayStartHour = 0;
        this.dayStartMinute = 0;
        this.dayEndHour = 23;
        this.dayEndMinute = 59;
        this.eventWidth = 150;
        this.eventSnapSize = this.hourSegmentHeight;
        this.tooltipPlacement = 'top';
        this.tooltipAppendToBody = true;
        this.eventClicked = new EventEmitter();
        this.hourSegmentClicked = new EventEmitter();
        this.eventTimesChanged = new EventEmitter();
        this.beforeViewRender = new EventEmitter();
        this.hours = [];
        this.width = 0;
        this.currentResizes = new Map();
        this.locale = locale;
    }
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    }
    eventDropped(dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    }
    resizeStarted(event, resizeEvent, dayViewContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        const                  resizeHelper = new CalendarResizeHelper(dayViewContainer);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    resizing(event, resizeEvent) {
        const                  currentResize = this.currentResizes.get(event);
        if (resizeEvent.edges.top) {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (resizeEvent.edges.bottom) {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    }
    resizeEnded(dayEvent) {
        const                  currentResize = this.currentResizes.get(dayEvent);
        let                  pixelsMoved;
        if (currentResize.edge === 'top') {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        const                  pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        const                  minutesMoved = pixelsMoved * pixelAmountInMinutes;
        let                  newStart = dayEvent.event.start;
        let                  newEnd = dayEvent.event.end;
        if (currentResize.edge === 'top') {
            newStart = addMinutes(newStart, minutesMoved);
        }
        else if (newEnd) {
            newEnd = addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
        this.currentResizes.delete(dayEvent);
    }
    dragStart(event, dayViewContainer) {
        const                  dragHelper = new CalendarDragHelper(dayViewContainer, event);
        this.validateDrag = ({ x, y }) => this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
        this.cdr.markForCheck();
    }
    eventDragged(dayEvent, draggedInPixels) {
        const                  pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        const                  minutesMoved = draggedInPixels * pixelAmountInMinutes;
        if (minutesMoved !== 0) {
            const                  newStart = addMinutes(dayEvent.event.start, minutesMoved);
            let                  newEnd;
            if (dayEvent.event.end) {
                newEnd = addMinutes(dayEvent.event.end, minutesMoved);
            }
            this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
        }
    }
    refreshHourGrid() {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        this.beforeViewRender.emit({
            body: this.hours
        });
    }
    refreshView() {
        const                  originalDayView = this.utils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: this.hourSegmentHeight
        });
        originalDayView.events.forEach((event) => {
            if (event.isProcessed) {
                return;
            }
            this.scaleOverlappingEvents(event.event.start, event.event.end, originalDayView.events);
        });
        this.view = originalDayView;
    }
    scaleOverlappingEvents(startTime, endTime, events) {
        let                  newStartTime = startTime;
        let                  newEndTime = endTime;
        const                  overlappingEvents = [];
        let                  maxLeft = 0;
        events.forEach((event) => {
            if (event.isProcessed) {
                return;
            }
            if (event.event.start < startTime && event.event.end > startTime) {
                newStartTime = event.event.start;
            }
            else if (event.event.end > endTime && event.event.start < endTime) {
                newEndTime = event.event.end;
            }
            else if (event.event.end <= endTime && event.event.start >= startTime) {
            }
            else {
                return;
            }
            if (event.left > maxLeft) {
                maxLeft = event.left;
            }
            overlappingEvents.push(event);
        });
        if (startTime === newStartTime && endTime === newEndTime) {
            const                  divisorFactor = Math.floor(maxLeft / this.eventWidth) + 1;
            overlappingEvents.forEach((event) => {
                event.isProcessed = true;
                event.left /= divisorFactor;
                event.width /= divisorFactor;
            });
        }
        else {
            this.scaleOverlappingEvents(newStartTime, newEndTime, events);
        }
    }
    refreshAll() {
        this.refreshHourGrid();
        this.refreshView();
    }
}
CalendarWeekHoursDayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'iq-calendar-week-hours-day-view',
                template: `
        <div class="cal-day-view" #dayViewContainer>
            <mwl-calendar-all-day-event
                *ngFor="let event of view.allDayEvents"
                [event]="event"
                [customTemplate]="allDayEventTemplate"
                [eventTitleTemplate]="eventTitleTemplate"
                (eventClicked)="eventClicked.emit({event: event})">
            </mwl-calendar-all-day-event>
            <div class="cal-hour-rows">
                <div class="cal-events">
                    <div
                        #event
                        *ngFor="let dayEvent of view?.events"
                        class="cal-event-container"
                        [class.cal-draggable]="dayEvent.event.draggable"
                        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
                        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
                        [ngClass]="dayEvent.event.cssClass"
                        mwlResizable
                        [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
                        [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"
                        [validateResize]="validateResize"
                        (resizeStart)="resizeStarted(dayEvent, $event, dayViewContainer)"
                        (resizing)="resizing(dayEvent, $event)"
                        (resizeEnd)="resizeEnded(dayEvent)"
                        mwlDraggable
                        [dragAxis]="{x: false, y: dayEvent.event.draggable && currentResizes.size === 0}"
                        [dragSnapGrid]="{y: eventSnapSize}"
                        [validateDrag]="validateDrag"
                        (dragStart)="dragStart(event, dayViewContainer)"
                        (dragEnd)="eventDragged(dayEvent, $event.y)"
                        [style.marginTop.px]="dayEvent.top"
                        [style.height.px]="dayEvent.height"
                        [style.marginLeft.px]="dayEvent.left"
                        [style.width.px]="dayEvent.width - 1">
                        <mwl-calendar-day-view-event
                            [dayEvent]="dayEvent"
                            [tooltipPlacement]="tooltipPlacement"
                            [tooltipTemplate]="tooltipTemplate"
                            [tooltipAppendToBody]="tooltipAppendToBody"
                            [customTemplate]="eventTemplate"
                            [eventTitleTemplate]="eventTitleTemplate"
                            (eventClicked)="eventClicked.emit({event: dayEvent.event})">
                        </mwl-calendar-day-view-event>
                    </div>
                    <div class="cal-hour"
                         [class.cal-week-hour-even]="i % 2 === 0"
                         [class.cal-week-hour-odd]="i % 2 === 1"
                         *ngFor="let hour of hours; let i = index">
                        <iq-calendar-week-hours-day-view-hour-segment
                            *ngFor="let segment of hour.segments"
                            [hourVisible]="false"
                            [style.height.px]="hourSegmentHeight"
                            [segment]="segment"
                            [segmentHeight]="hourSegmentHeight"
                            [locale]="locale"
                            [customTemplate]="hourSegmentTemplate"
                            (mwlClick)="hourSegmentClicked.emit({date: segment.date})"
                            [class.cal-drag-over]="segment.dragOver"
                            mwlDroppable
                            (dragEnter)="segment.dragOver = true"
                            (dragLeave)="segment.dragOver = false"
                            (drop)="segment.dragOver = false; eventDropped($event, segment)">
                        </iq-calendar-week-hours-day-view-hour-segment>
                    </div>
                </div>

            </div>
        </div>
    `
            },] },
];
CalendarWeekHoursDayViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: CalendarUtils, },
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
];
CalendarWeekHoursDayViewComponent.propDecorators = {
    "viewDate": [{ type: Input },],
    "events": [{ type: Input },],
    "hourSegments": [{ type: Input },],
    "hourSegmentHeight": [{ type: Input },],
    "dayStartHour": [{ type: Input },],
    "dayStartMinute": [{ type: Input },],
    "dayEndHour": [{ type: Input },],
    "dayEndMinute": [{ type: Input },],
    "eventWidth": [{ type: Input },],
    "refresh": [{ type: Input },],
    "locale": [{ type: Input },],
    "eventSnapSize": [{ type: Input },],
    "tooltipPlacement": [{ type: Input },],
    "tooltipTemplate": [{ type: Input },],
    "tooltipAppendToBody": [{ type: Input },],
    "hourSegmentTemplate": [{ type: Input },],
    "allDayEventTemplate": [{ type: Input },],
    "eventTemplate": [{ type: Input },],
    "eventTitleTemplate": [{ type: Input },],
    "eventClicked": [{ type: Output },],
    "hourSegmentClicked": [{ type: Output },],
    "eventTimesChanged": [{ type: Output },],
    "beforeViewRender": [{ type: Output },],
};

class CalendarWeekHoursDayViewHourSegmentComponent {
    constructor() {
        this.hourVisible = true;
    }
}
CalendarWeekHoursDayViewHourSegmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'iq-calendar-week-hours-day-view-hour-segment',
                template: `
        <ng-template
            #defaultTemplate
            let-segment="segment"
            let-locale="locale">
            <div
                class="cal-hour-segment"
                [style.height.px]="segmentHeight"
                [class.cal-hour-start]="segment.isStart"
                [class.cal-after-hour-start]="!segment.isStart"
                [ngClass]="segment.cssClass">
                <div class="cal-time" *ngIf="hourVisible">
                    {{ segment.date | calendarDate:'dayViewHour':locale }}
                </div>
            </div>
        </ng-template>
        <ng-template
            [ngTemplateOutlet]="customTemplate || defaultTemplate"
            [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
        </ng-template>
    `
            },] },
];
CalendarWeekHoursDayViewHourSegmentComponent.ctorParameters = () => [];
CalendarWeekHoursDayViewHourSegmentComponent.propDecorators = {
    "segment": [{ type: Input },],
    "segmentHeight": [{ type: Input },],
    "locale": [{ type: Input },],
    "customTemplate": [{ type: Input },],
    "hourVisible": [{ type: Input },],
};

class CalendarWeekHoursViewHeaderComponent {
    constructor() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
CalendarWeekHoursViewHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'iq-calendar-week-hours-view-header',
                template: `
        <ng-template
            #defaultTemplate
            let-days="days"
            let-locale="locale"
            let-dayHeaderClicked="dayHeaderClicked"
            let-eventDropped="eventDropped">
            <div class="cal-day-headers">
                <div class="cal-header">
                </div>
                <div
                    class="cal-header"
                    *ngFor="let day of days"
                    [class.cal-past]="day.isPast"
                    [class.cal-today]="day.isToday"
                    [class.cal-future]="day.isFuture"
                    [class.cal-weekend]="day.isWeekend"
                    [class.cal-drag-over]="day.dragOver"
                    [ngClass]="day.cssClass"
                    (mwlClick)="dayHeaderClicked.emit({day: day})"
                    mwlDroppable
                    (dragEnter)="day.dragOver = true"
                    (dragLeave)="day.dragOver = false"
                    (drop)="day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})">
                    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
                    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
                </div>
            </div>
        </ng-template>
        <ng-template
            [ngTemplateOutlet]="customTemplate || defaultTemplate"
            [ngTemplateOutletContext]="{days: days, locale: locale, dayHeaderClicked: dayHeaderClicked, eventDropped: eventDropped}">
        </ng-template>
    `
            },] },
];
CalendarWeekHoursViewHeaderComponent.ctorParameters = () => [];
CalendarWeekHoursViewHeaderComponent.propDecorators = {
    "days": [{ type: Input },],
    "locale": [{ type: Input },],
    "customTemplate": [{ type: Input },],
    "dayHeaderClicked": [{ type: Output },],
    "eventDropped": [{ type: Output },],
};

class CalendarWeekHoursViewModule {
}
CalendarWeekHoursViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CalendarModule,
                    ResizableModule,
                    DragAndDropModule
                ],
                declarations: [
                    CalendarWeekHoursViewComponent,
                    CalendarWeekHoursViewHeaderComponent,
                    CalendarWeekHoursViewEventComponent,
                    CalendarWeekHoursDayViewComponent,
                    CalendarWeekHoursDayViewHourSegmentComponent
                ],
                exports: [
                    CalendarWeekHoursViewComponent,
                    CalendarWeekHoursViewHeaderComponent,
                    CalendarWeekHoursViewEventComponent,
                    CalendarWeekHoursDayViewComponent,
                    CalendarWeekHoursDayViewHourSegmentComponent
                ]
            },] },
];
CalendarWeekHoursViewModule.ctorParameters = () => [];

export { CalendarWeekHoursViewModule, CalendarWeekHoursDayViewHourSegmentComponent as ɵe, CalendarWeekHoursDayViewComponent as ɵd, CalendarWeekHoursViewEventComponent as ɵc, CalendarWeekHoursViewHeaderComponent as ɵb, CalendarWeekHoursViewComponent as ɵa };
//# sourceMappingURL=angular-calendar-week-hours-view.js.map
