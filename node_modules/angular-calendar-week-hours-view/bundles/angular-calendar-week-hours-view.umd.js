(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('date-fns'), require('angular-calendar'), require('angular-calendar/modules/common/util'), require('angular-calendar/modules/common/calendar-resize-helper.provider'), require('angular-calendar/modules/common/calendar-drag-helper.provider'), require('@angular/common'), require('angular-resizable-element'), require('angular-draggable-droppable')) :
	typeof define === 'function' && define.amd ? define('angular-calendar-week-hours-view', ['exports', '@angular/core', 'rxjs/Subject', 'date-fns', 'angular-calendar', 'angular-calendar/modules/common/util', 'angular-calendar/modules/common/calendar-resize-helper.provider', 'angular-calendar/modules/common/calendar-drag-helper.provider', '@angular/common', 'angular-resizable-element', 'angular-draggable-droppable'], factory) :
	(factory((global['angular-calendar-week-hours-view'] = {}),global.ng.core,global.Rx,global.dateFns,global.angularCalendar,global.util,global.calendarResizeHelper_provider,global.calendarDragHelper_provider,global.ng.common,global.angularResizableElement,global.angularDraggableDroppable));
}(this, (function (exports,core,Subject,dateFns,angularCalendar,util,calendarResizeHelper_provider,calendarDragHelper_provider,common,angularResizableElement,angularDraggableDroppable) { 'use strict';

var CalendarWeekHoursViewComponent = (function () {
    function CalendarWeekHoursViewComponent(cdr, utils, locale) {
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
        this.dayHeaderClicked = new core.EventEmitter();
        this.eventClicked = new core.EventEmitter();
        this.hourSegmentClicked = new core.EventEmitter();
        this.eventTimesChanged = new core.EventEmitter();
        this.beforeViewRender = new core.EventEmitter();
        this.hours = [];
        this.eventRows = [];
        this.currentResizes = new Map();
        this.locale = locale;
    }
    CalendarWeekHoursViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarWeekHoursViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
            this.refreshHeader();
        }
        if (changes.events) {
            util.validateEvents(this.events);
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
    };
    CalendarWeekHoursViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarWeekHoursViewComponent.prototype.resizeStarted = function (weekViewContainer, weekEvent, resizeEvent) {
        this.currentResizes.set(weekEvent, {
            originalOffset: weekEvent.offset,
            originalSpan: weekEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        var resizeHelper = new calendarResizeHelper_provider.CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekHoursViewComponent.prototype.resizing = function (weekEvent, resizeEvent, dayWidth) {
        var currentResize = this.currentResizes.get(weekEvent);
        if (resizeEvent.edges.left) {
            var diff = Math.round(+resizeEvent.edges.left / dayWidth);
            weekEvent.offset = currentResize.originalOffset + diff;
            weekEvent.span = currentResize.originalSpan - diff;
        }
        else if (resizeEvent.edges.right) {
            var diff = Math.round(+resizeEvent.edges.right / dayWidth);
            weekEvent.span = currentResize.originalSpan + diff;
        }
    };
    CalendarWeekHoursViewComponent.prototype.resizeEnded = function (weekEvent) {
        var currentResize = this.currentResizes.get(weekEvent);
        var daysDiff;
        if (currentResize.edge === 'left') {
            daysDiff = weekEvent.offset - currentResize.originalOffset;
        }
        else {
            daysDiff = weekEvent.span - currentResize.originalSpan;
        }
        weekEvent.offset = currentResize.originalOffset;
        weekEvent.span = currentResize.originalSpan;
        var newStart = weekEvent.event.start;
        var newEnd = weekEvent.event.end;
        if (currentResize.edge === 'left') {
            newStart = dateFns.addDays(newStart, daysDiff);
        }
        else if (newEnd) {
            newEnd = dateFns.addDays(newEnd, daysDiff);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
        this.currentResizes.delete(weekEvent);
    };
    CalendarWeekHoursViewComponent.prototype.eventDragged = function (weekEvent, draggedByPx, dayWidth) {
        var daysDragged = draggedByPx / dayWidth;
        if (daysDragged !== 0) {
            var newStart = dateFns.addDays(weekEvent.event.start, daysDragged);
            var newEnd = void 0;
            if (weekEvent.event.end) {
                newEnd = dateFns.addDays(weekEvent.event.end, daysDragged);
            }
            this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
        }
    };
    CalendarWeekHoursViewComponent.prototype.getDayColumnWidth = function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    };
    CalendarWeekHoursViewComponent.prototype.dragStart = function (weekViewContainer, event) {
        var _this = this;
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        var dragHelper = new calendarDragHelper_provider.CalendarDragHelper(weekViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekHoursViewComponent.prototype.refreshHeader = function () {
        this.days = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.beforeViewRender.emit({
            header: this.days
        });
    };
    CalendarWeekHoursViewComponent.prototype.refreshBody = function () {
        this.eventRows = this.utils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true
        }).eventRows;
    };
    CalendarWeekHoursViewComponent.prototype.refreshHourGrid = function () {
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
    };
    CalendarWeekHoursViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.refreshHourGrid();
    };
    CalendarWeekHoursViewComponent.prototype.eventDropped = function (dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    };
    return CalendarWeekHoursViewComponent;
}());
CalendarWeekHoursViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'iq-calendar-week-hours-view',
                template: "\n        <div class=\"cal-week-hours-view\" #weekViewContainer>\n            <iq-calendar-week-hours-view-header\n                [days]=\"days\"\n                [locale]=\"locale\"\n                [customTemplate]=\"headerTemplate\"\n                (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n                (eventDropped)=\"eventTimesChanged.emit($event)\">\n            </iq-calendar-week-hours-view-header>\n            <div class=\"cal-days-container\">\n                <div class=\"cal-day-container\">\n                    <div class=\"cal-day-view\">\n                        <div class=\"cal-hour-rows\">\n                            <div class=\"cal-events\">\n                                <div class=\"cal-hour\"\n                                     [class.cal-week-hour-even]=\"i % 2 === 0\"\n                                     [class.cal-week-hour-odd]=\"i % 2 === 1\"\n                                     *ngFor=\"let hour of hours; let i = index\">\n                                    <iq-calendar-week-hours-day-view-hour-segment\n                                        *ngFor=\"let segment of hour.segments\"\n                                        [style.height.px]=\"hourSegmentHeight\"\n                                        [segment]=\"segment\"\n                                        [segmentHeight]=\"hourSegmentHeight\"\n                                        [locale]=\"locale\"\n                                        [customTemplate]=\"hourSegmentTemplate\"\n                                        [class.cal-drag-over]=\"segment.dragOver\"\n                                        mwlDroppable\n                                        (dragEnter)=\"segment.dragOver = true\"\n                                        (dragLeave)=\"segment.dragOver = false\"\n                                        (drop)=\"segment.dragOver = false; eventDropped($event, segment)\">\n                                    </iq-calendar-week-hours-day-view-hour-segment>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"cal-day-container\"\n                     [class.cal-past]=\"day.isPast\"\n                     [class.cal-today]=\"day.isToday\"\n                     [class.cal-future]=\"day.isFuture\"\n                     *ngFor=\"let day of days\">\n                    <iq-calendar-week-hours-day-view [dayStartHour]=\"dayStartHour\"\n                                                     [dayStartMinute]=\"dayStartMinute\"\n                                                     [dayEndHour]=\"dayEndHour\"\n                                                     [dayEndMinute]=\"dayEndMinute\"\n                                                     [events]=\"events\"\n                                                     [viewDate]=\"day.date\"\n                                                     [hourSegments]=\"hourSegments\"\n                                                     [hourSegmentHeight]=\"hourSegmentHeight\"\n                                                     [eventWidth]=\"(weekViewContainer.offsetWidth / 8)\"\n                                                     (eventClicked)=\"eventClicked.emit($event)\"\n                                                     (hourSegmentClicked)=\"hourSegmentClicked.emit($event)\"\n                                                     (eventTimesChanged)=\"eventTimesChanged.emit($event)\"\n                                                     [eventTitleTemplate]=\"eventTitleTemplate\"\n                                                     [eventTemplate]=\"eventTemplate\">\n                    </iq-calendar-week-hours-day-view>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
CalendarWeekHoursViewComponent.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: angularCalendar.CalendarUtils, },
    { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
]; };
CalendarWeekHoursViewComponent.propDecorators = {
    "viewDate": [{ type: core.Input },],
    "events": [{ type: core.Input },],
    "excludeDays": [{ type: core.Input },],
    "refresh": [{ type: core.Input },],
    "locale": [{ type: core.Input },],
    "tooltipPlacement": [{ type: core.Input },],
    "tooltipTemplate": [{ type: core.Input },],
    "tooltipAppendToBody": [{ type: core.Input },],
    "weekStartsOn": [{ type: core.Input },],
    "headerTemplate": [{ type: core.Input },],
    "eventTemplate": [{ type: core.Input },],
    "eventTitleTemplate": [{ type: core.Input },],
    "precision": [{ type: core.Input },],
    "weekendDays": [{ type: core.Input },],
    "dayStartHour": [{ type: core.Input },],
    "dayStartMinute": [{ type: core.Input },],
    "dayEndHour": [{ type: core.Input },],
    "dayEndMinute": [{ type: core.Input },],
    "hourSegments": [{ type: core.Input },],
    "hourSegmentHeight": [{ type: core.Input },],
    "hourSegmentTemplate": [{ type: core.Input },],
    "dayHeaderClicked": [{ type: core.Output },],
    "eventClicked": [{ type: core.Output },],
    "hourSegmentClicked": [{ type: core.Output },],
    "eventTimesChanged": [{ type: core.Output },],
    "beforeViewRender": [{ type: core.Output },],
};
var CalendarWeekHoursViewEventComponent = (function () {
    function CalendarWeekHoursViewEventComponent() {
        this.eventClicked = new core.EventEmitter();
    }
    return CalendarWeekHoursViewEventComponent;
}());
CalendarWeekHoursViewEventComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'iq-calendar-week-hours-view-event',
                template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\">\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n        [mwlCalendarTooltip]=\"weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event\"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\">\n        <mwl-calendar-event-actions [event]=\"weekEvent.event\"></mwl-calendar-event-actions>\n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"week\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody\n      }\">\n    </ng-template>\n  "
            },] },
];
CalendarWeekHoursViewEventComponent.ctorParameters = function () { return []; };
CalendarWeekHoursViewEventComponent.propDecorators = {
    "weekEvent": [{ type: core.Input },],
    "tooltipPlacement": [{ type: core.Input },],
    "tooltipAppendToBody": [{ type: core.Input },],
    "customTemplate": [{ type: core.Input },],
    "eventTitleTemplate": [{ type: core.Input },],
    "tooltipTemplate": [{ type: core.Input },],
    "eventClicked": [{ type: core.Output },],
};
var MINUTES_IN_HOUR = 60;
var CalendarWeekHoursDayViewComponent = (function () {
    function CalendarWeekHoursDayViewComponent(cdr, utils, locale) {
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
        this.eventClicked = new core.EventEmitter();
        this.hourSegmentClicked = new core.EventEmitter();
        this.eventTimesChanged = new core.EventEmitter();
        this.beforeViewRender = new core.EventEmitter();
        this.hours = [];
        this.width = 0;
        this.currentResizes = new Map();
        this.locale = locale;
    }
    CalendarWeekHoursDayViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            util.validateEvents(this.events);
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
    };
    CalendarWeekHoursDayViewComponent.prototype.eventDropped = function (dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.resizeStarted = function (event, resizeEvent, dayViewContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        var resizeHelper = new calendarResizeHelper_provider.CalendarResizeHelper(dayViewContainer);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekHoursDayViewComponent.prototype.resizing = function (event, resizeEvent) {
        var currentResize = this.currentResizes.get(event);
        if (resizeEvent.edges.top) {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (resizeEvent.edges.bottom) {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.resizeEnded = function (dayEvent) {
        var currentResize = this.currentResizes.get(dayEvent);
        var pixelsMoved;
        if (currentResize.edge === 'top') {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        var pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        var minutesMoved = pixelsMoved * pixelAmountInMinutes;
        var newStart = dayEvent.event.start;
        var newEnd = dayEvent.event.end;
        if (currentResize.edge === 'top') {
            newStart = dateFns.addMinutes(newStart, minutesMoved);
        }
        else if (newEnd) {
            newEnd = dateFns.addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
        this.currentResizes.delete(dayEvent);
    };
    CalendarWeekHoursDayViewComponent.prototype.dragStart = function (event, dayViewContainer) {
        var _this = this;
        var dragHelper = new calendarDragHelper_provider.CalendarDragHelper(dayViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekHoursDayViewComponent.prototype.eventDragged = function (dayEvent, draggedInPixels) {
        var pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        var minutesMoved = draggedInPixels * pixelAmountInMinutes;
        if (minutesMoved !== 0) {
            var newStart = dateFns.addMinutes(dayEvent.event.start, minutesMoved);
            var newEnd = void 0;
            if (dayEvent.event.end) {
                newEnd = dateFns.addMinutes(dayEvent.event.end, minutesMoved);
            }
            this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.refreshHourGrid = function () {
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
    };
    CalendarWeekHoursDayViewComponent.prototype.refreshView = function () {
        var _this = this;
        var originalDayView = this.utils.getDayView({
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
        originalDayView.events.forEach(function (event) {
            if (event.isProcessed) {
                return;
            }
            _this.scaleOverlappingEvents(event.event.start, event.event.end, originalDayView.events);
        });
        this.view = originalDayView;
    };
    CalendarWeekHoursDayViewComponent.prototype.scaleOverlappingEvents = function (startTime, endTime, events) {
        var newStartTime = startTime;
        var newEndTime = endTime;
        var overlappingEvents = [];
        var maxLeft = 0;
        events.forEach(function (event) {
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
            var divisorFactor_1 = Math.floor(maxLeft / this.eventWidth) + 1;
            overlappingEvents.forEach(function (event) {
                event.isProcessed = true;
                event.left /= divisorFactor_1;
                event.width /= divisorFactor_1;
            });
        }
        else {
            this.scaleOverlappingEvents(newStartTime, newEndTime, events);
        }
    };
    CalendarWeekHoursDayViewComponent.prototype.refreshAll = function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    return CalendarWeekHoursDayViewComponent;
}());
CalendarWeekHoursDayViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'iq-calendar-week-hours-day-view',
                template: "\n        <div class=\"cal-day-view\" #dayViewContainer>\n            <mwl-calendar-all-day-event\n                *ngFor=\"let event of view.allDayEvents\"\n                [event]=\"event\"\n                [customTemplate]=\"allDayEventTemplate\"\n                [eventTitleTemplate]=\"eventTitleTemplate\"\n                (eventClicked)=\"eventClicked.emit({event: event})\">\n            </mwl-calendar-all-day-event>\n            <div class=\"cal-hour-rows\">\n                <div class=\"cal-events\">\n                    <div\n                        #event\n                        *ngFor=\"let dayEvent of view?.events\"\n                        class=\"cal-event-container\"\n                        [class.cal-draggable]=\"dayEvent.event.draggable\"\n                        [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n                        [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n                        [ngClass]=\"dayEvent.event.cssClass\"\n                        mwlResizable\n                        [resizeEdges]=\"{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}\"\n                        [resizeSnapGrid]=\"{top: eventSnapSize, bottom: eventSnapSize}\"\n                        [validateResize]=\"validateResize\"\n                        (resizeStart)=\"resizeStarted(dayEvent, $event, dayViewContainer)\"\n                        (resizing)=\"resizing(dayEvent, $event)\"\n                        (resizeEnd)=\"resizeEnded(dayEvent)\"\n                        mwlDraggable\n                        [dragAxis]=\"{x: false, y: dayEvent.event.draggable && currentResizes.size === 0}\"\n                        [dragSnapGrid]=\"{y: eventSnapSize}\"\n                        [validateDrag]=\"validateDrag\"\n                        (dragStart)=\"dragStart(event, dayViewContainer)\"\n                        (dragEnd)=\"eventDragged(dayEvent, $event.y)\"\n                        [style.marginTop.px]=\"dayEvent.top\"\n                        [style.height.px]=\"dayEvent.height\"\n                        [style.marginLeft.px]=\"dayEvent.left\"\n                        [style.width.px]=\"dayEvent.width - 1\">\n                        <mwl-calendar-day-view-event\n                            [dayEvent]=\"dayEvent\"\n                            [tooltipPlacement]=\"tooltipPlacement\"\n                            [tooltipTemplate]=\"tooltipTemplate\"\n                            [tooltipAppendToBody]=\"tooltipAppendToBody\"\n                            [customTemplate]=\"eventTemplate\"\n                            [eventTitleTemplate]=\"eventTitleTemplate\"\n                            (eventClicked)=\"eventClicked.emit({event: dayEvent.event})\">\n                        </mwl-calendar-day-view-event>\n                    </div>\n                    <div class=\"cal-hour\"\n                         [class.cal-week-hour-even]=\"i % 2 === 0\"\n                         [class.cal-week-hour-odd]=\"i % 2 === 1\"\n                         *ngFor=\"let hour of hours; let i = index\">\n                        <iq-calendar-week-hours-day-view-hour-segment\n                            *ngFor=\"let segment of hour.segments\"\n                            [hourVisible]=\"false\"\n                            [style.height.px]=\"hourSegmentHeight\"\n                            [segment]=\"segment\"\n                            [segmentHeight]=\"hourSegmentHeight\"\n                            [locale]=\"locale\"\n                            [customTemplate]=\"hourSegmentTemplate\"\n                            (mwlClick)=\"hourSegmentClicked.emit({date: segment.date})\"\n                            [class.cal-drag-over]=\"segment.dragOver\"\n                            mwlDroppable\n                            (dragEnter)=\"segment.dragOver = true\"\n                            (dragLeave)=\"segment.dragOver = false\"\n                            (drop)=\"segment.dragOver = false; eventDropped($event, segment)\">\n                        </iq-calendar-week-hours-day-view-hour-segment>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    "
            },] },
];
CalendarWeekHoursDayViewComponent.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: angularCalendar.CalendarUtils, },
    { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
]; };
CalendarWeekHoursDayViewComponent.propDecorators = {
    "viewDate": [{ type: core.Input },],
    "events": [{ type: core.Input },],
    "hourSegments": [{ type: core.Input },],
    "hourSegmentHeight": [{ type: core.Input },],
    "dayStartHour": [{ type: core.Input },],
    "dayStartMinute": [{ type: core.Input },],
    "dayEndHour": [{ type: core.Input },],
    "dayEndMinute": [{ type: core.Input },],
    "eventWidth": [{ type: core.Input },],
    "refresh": [{ type: core.Input },],
    "locale": [{ type: core.Input },],
    "eventSnapSize": [{ type: core.Input },],
    "tooltipPlacement": [{ type: core.Input },],
    "tooltipTemplate": [{ type: core.Input },],
    "tooltipAppendToBody": [{ type: core.Input },],
    "hourSegmentTemplate": [{ type: core.Input },],
    "allDayEventTemplate": [{ type: core.Input },],
    "eventTemplate": [{ type: core.Input },],
    "eventTitleTemplate": [{ type: core.Input },],
    "eventClicked": [{ type: core.Output },],
    "hourSegmentClicked": [{ type: core.Output },],
    "eventTimesChanged": [{ type: core.Output },],
    "beforeViewRender": [{ type: core.Output },],
};
var CalendarWeekHoursDayViewHourSegmentComponent = (function () {
    function CalendarWeekHoursDayViewHourSegmentComponent() {
        this.hourVisible = true;
    }
    return CalendarWeekHoursDayViewHourSegmentComponent;
}());
CalendarWeekHoursDayViewHourSegmentComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'iq-calendar-week-hours-day-view-hour-segment',
                template: "\n        <ng-template\n            #defaultTemplate\n            let-segment=\"segment\"\n            let-locale=\"locale\">\n            <div\n                class=\"cal-hour-segment\"\n                [style.height.px]=\"segmentHeight\"\n                [class.cal-hour-start]=\"segment.isStart\"\n                [class.cal-after-hour-start]=\"!segment.isStart\"\n                [ngClass]=\"segment.cssClass\">\n                <div class=\"cal-time\" *ngIf=\"hourVisible\">\n                    {{ segment.date | calendarDate:'dayViewHour':locale }}\n                </div>\n            </div>\n        </ng-template>\n        <ng-template\n            [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n            [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale\n      }\">\n        </ng-template>\n    "
            },] },
];
CalendarWeekHoursDayViewHourSegmentComponent.ctorParameters = function () { return []; };
CalendarWeekHoursDayViewHourSegmentComponent.propDecorators = {
    "segment": [{ type: core.Input },],
    "segmentHeight": [{ type: core.Input },],
    "locale": [{ type: core.Input },],
    "customTemplate": [{ type: core.Input },],
    "hourVisible": [{ type: core.Input },],
};
var CalendarWeekHoursViewHeaderComponent = (function () {
    function CalendarWeekHoursViewHeaderComponent() {
        this.dayHeaderClicked = new core.EventEmitter();
        this.eventDropped = new core.EventEmitter();
    }
    return CalendarWeekHoursViewHeaderComponent;
}());
CalendarWeekHoursViewHeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'iq-calendar-week-hours-view-header',
                template: "\n        <ng-template\n            #defaultTemplate\n            let-days=\"days\"\n            let-locale=\"locale\"\n            let-dayHeaderClicked=\"dayHeaderClicked\"\n            let-eventDropped=\"eventDropped\">\n            <div class=\"cal-day-headers\">\n                <div class=\"cal-header\">\n                </div>\n                <div\n                    class=\"cal-header\"\n                    *ngFor=\"let day of days\"\n                    [class.cal-past]=\"day.isPast\"\n                    [class.cal-today]=\"day.isToday\"\n                    [class.cal-future]=\"day.isFuture\"\n                    [class.cal-weekend]=\"day.isWeekend\"\n                    [class.cal-drag-over]=\"day.dragOver\"\n                    [ngClass]=\"day.cssClass\"\n                    (mwlClick)=\"dayHeaderClicked.emit({day: day})\"\n                    mwlDroppable\n                    (dragEnter)=\"day.dragOver = true\"\n                    (dragLeave)=\"day.dragOver = false\"\n                    (drop)=\"day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})\">\n                    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>\n                    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template\n            [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n            [ngTemplateOutletContext]=\"{days: days, locale: locale, dayHeaderClicked: dayHeaderClicked, eventDropped: eventDropped}\">\n        </ng-template>\n    "
            },] },
];
CalendarWeekHoursViewHeaderComponent.ctorParameters = function () { return []; };
CalendarWeekHoursViewHeaderComponent.propDecorators = {
    "days": [{ type: core.Input },],
    "locale": [{ type: core.Input },],
    "customTemplate": [{ type: core.Input },],
    "dayHeaderClicked": [{ type: core.Output },],
    "eventDropped": [{ type: core.Output },],
};
var CalendarWeekHoursViewModule = (function () {
    function CalendarWeekHoursViewModule() {
    }
    return CalendarWeekHoursViewModule;
}());
CalendarWeekHoursViewModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    angularCalendar.CalendarModule,
                    angularResizableElement.ResizableModule,
                    angularDraggableDroppable.DragAndDropModule
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
CalendarWeekHoursViewModule.ctorParameters = function () { return []; };

exports.CalendarWeekHoursViewModule = CalendarWeekHoursViewModule;
exports.ɵe = CalendarWeekHoursDayViewHourSegmentComponent;
exports.ɵd = CalendarWeekHoursDayViewComponent;
exports.ɵc = CalendarWeekHoursViewEventComponent;
exports.ɵb = CalendarWeekHoursViewHeaderComponent;
exports.ɵa = CalendarWeekHoursViewComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-calendar-week-hours-view.umd.js.map
