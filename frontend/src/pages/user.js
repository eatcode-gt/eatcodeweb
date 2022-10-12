import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import CalendarHeatmap from 'react-calendar-heatmap';

const User = () => {
  
  const today = new Date();

  return (
    
    <div>
      <ProfileCard />
      <CalendarHeatmap
        startDate={shiftDate(today, -365)}
        endDate={today}
        values={[
          { date: '2022-01-01', count: 1 },
          { date: '2022-01-03', count: 4 },
          { date: '2022-01-06', count: 2 },
          // ...and so on
        ]}
        classForValue={(values) => {
          if (!values) {
            return "color-empty";
          }
          return `${values.count}` < 7
            ? `color-github-${values.count}`
            : `color-github-7`;
        }}
        tooltipDataAttrs={(data) => {
          let readableDate = new Date(data.date).toDateString();

          if (data.count === null) {
            return null;
          } else {
            return {
              "data-tip": `${data.count} submissions on ${readableDate}`,
            };
          }
        }}
        showWeekdayLabels={false}
      />
    </div>
  );
};

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
  
export default User;