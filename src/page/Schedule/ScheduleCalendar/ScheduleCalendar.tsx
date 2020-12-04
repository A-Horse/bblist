import React, { useState } from 'react';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Column, Table } from '../../../components/Table/Table';
import { es } from './events';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment); // or globalizeLocalizer


export function ScheduleCalendar() {
  const [events, setEvents] = useState(es);
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const newEvent = (event) => {
    // let idList = state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // setState({
    //   events: state.events.concat([hour]),
    // })
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);

    //alert(`${event.title} was resized to ${start}-${end}`)
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  const dragFromOutsideItem = () => {
    return draggedEvent;
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    const event = {
      // @ts-ignore
      id: draggedEvent!.id,
      // @ts-ignore
      title: draggedEvent!.title,
      start,
      end,
      allDay: allDay,
    };

    setDraggedEvent(draggedEvent);
    moveEvent({ event, start, end } as any);
  };

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        defaultDate={new Date(2015, 3, 12)}
        popup={true}
        dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
      />
    </div>
  );
}
