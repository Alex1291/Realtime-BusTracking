import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./bigCalender.scss";
import { request } from "../../axios_Helper";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState(Views.WEEK);
  const [calendarEvents, setCalendarEvents] = useState([
    { title: "", start: "", end: "" },
  ]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routeDuration, setRouteDuration] = useState(0);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await request(
          "GET",
          "http://localhost:8090/api/v1/routes",
          {}
        );
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      if (!selectedRoute) return;
      try {
        const response = await request(
          "GET",
          `http://localhost:8090/api/v1/routes/${selectedRoute}`,
          {}
        );

        setRouteDuration(response.data.route_duration);
      } catch (error) {
        console.error("Error fetching route details:", error);
      }
    };

    fetchRouteDetails();
  }, [selectedRoute]);

  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
  };

  const formats = {
    dateFormat: "YYYY-MM-DD",
    dayFormat: (date) => moment(date).format("YYYY-MM-DD"),
    dayHeaderFormat: (date) => moment(date).format("YYYY-MM-DD"),
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format("YYYY-MM-DD")} – ${moment(end).format(
        "YYYY-MM-DD"
      )}`,
    agendaHeaderFormat: ({ start, end }) =>
      `${moment(start).format("YYYY-MM-DD")} – ${moment(end).format(
        "YYYY-MM-DD"
      )}`,
    agendaDateFormat: "YYYY-MM-DD",
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!selectedRoute) return;
      try {
        const response = await request(
          "GET",
          "http://localhost:8090/api/v1/schedules",
          {}
        );

        const filteredSchedules = response.data.filter(
          (schedule) => schedule.schedule_route === selectedRoute
        );

        const formattedEvents = [];

        filteredSchedules.forEach((schedule) => {
          const startDate = new Date(schedule.scheduleDurationStart);
          const endDate = schedule.scheduleDurationEnd
            ? new Date(schedule.scheduleDurationEnd)
            : startDate;

          // Convert schedule_time to HH:MM format
          const [hours, minutes] = schedule.schedule_time
            .split(":")
            .map(Number);

          if (schedule.scheduleRepeat === "Yes") {
            const dayMapping = {
              Sunday: 0,
              Monday: 1,
              Tuesday: 2,
              Wednesday: 3,
              Thursday: 4,
              Friday: 5,
              Saturday: 6,
            };

            // Handle repeating schedules
            const daysOfWeek = schedule.schedule_days
              .split(",")
              .map((day) => day.trim()); // ["Monday", "Wednesday"]

            // Convert schedule_days into numeric values for easier comparison
            const scheduledDays = daysOfWeek.map((day) => dayMapping[day]);

            for (
              let d = new Date(startDate);
              d <= endDate;
              d.setDate(d.getDate() + 1)
            ) {
              if (scheduledDays.includes(d.getDay())) {
                const eventStart = new Date(
                  d.getFullYear(),
                  d.getMonth(),
                  d.getDate(),
                  hours,
                  minutes
                );
                const eventEnd = new Date(
                  eventStart.getTime() + routeDuration * 60000
                );

                formattedEvents.push({
                  title: schedule.schedule_name,
                  start: eventStart,
                  end: eventEnd,
                });
              }
            }
          } else {
            // Handle non-repeating schedules
            const eventStart = new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              hours,
              minutes
            );
            const eventEnd = new Date(
              eventStart.getTime() + routeDuration * 60000
            );

            formattedEvents.push({
              title: schedule.schedule_name,
              start: eventStart,
              end: eventEnd,
            });
          }
        });

        setCalendarEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [selectedRoute, routeDuration]);

  return (
    <div className="calendar">
      <select
        onChange={handleRouteChange}
        value={selectedRoute}
        className="custom-select"
      >
        <option value="">Select a Route</option>
        {routes.map((route) => (
          <option key={route.id} value={route.id}>
            {route.route_name}
          </option>
        ))}
      </select>

      <Calendar
        localizer={localizer}
        events={calendarEvents || []}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.DAY}
        dayLayoutAlgorithm="no-overlap"
        view={view}
        views={["week", "day", "agenda"]}
        style={{ height: "98%" }}
        min={new Date(2025, 1, 0, 6, 0, 0)}
        max={new Date(2030, 1, 0, 21, 0, 0)}
        formats={formats}
        onView={(newView) => {
          setView(newView);
        }}
      />
    </div>
  );
};

export default BigCalendar;
