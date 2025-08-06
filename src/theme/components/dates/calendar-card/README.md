# Calendar Card Components

A comprehensive set of calendar and date components built with the same BaseCard system, designed for consistent styling across light and dark themes with hard edges (0px border radius).

## Components

### CalendarCard

A full calendar with month/year navigation, event indicators, and date selection.

```tsx
import { CalendarCard } from '@/theme/components/dates/calendar-card';

<CalendarCard
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
  onMonthChange={handleMonthChange}
  events={{
    '2024-07-05': 2,
    '2024-07-10': 1,
  }}
/>;
```

### CalendarDayCard

Individual calendar day cards with different states and event indicators.

```tsx
import { CalendarDayCard } from '@/theme/components/dates/calendar-card';

{
  /* Header day (days of week) */
}
<CalendarDayCard day='mo' type='header' />;

{
  /* Active day */
}
<CalendarDayCard day={15} type='active' onClick={() => handleDayClick(15)} />;

{
  /* Today */
}
<CalendarDayCard day={5} type='today' onClick={() => handleDayClick(5)} />;

{
  /* Selected day */
}
<CalendarDayCard day={10} type='selected' onClick={() => handleDayClick(10)} />;

{
  /* Day with events */
}
<CalendarDayCard
  day={20}
  type='active'
  hasEvents={true}
  eventCount={3}
  onClick={() => handleDayClick(20)}
/>;

{
  /* Inactive/empty day */
}
<CalendarDayCard type='inactive' />;
```

### DatePickerCard

Month and year selection cards for calendar navigation.

```tsx
import { DatePickerCard } from '@/theme/components/dates/calendar-card';

{
  /* Month picker */
}
<DatePickerCard
  value='january'
  type='month'
  onClick={() => handleMonthSelect(0)}
  isSelected={currentMonth === 0}
/>;

{
  /* Year picker */
}
<DatePickerCard
  value={2024}
  type='year'
  onClick={() => handleYearSelect(2024)}
  isSelected={currentYear === 2024}
/>;
```

### DateHeaderCard

Date header cards for separating content by date (perfect for blog posts, events, etc.).

```tsx
import { DateHeaderCard } from '@/theme/components/dates/calendar-card';

{
  /* Year header */
}
<DateHeaderCard date={2024} format='year' />;

{
  /* Month header */
}
<DateHeaderCard date='2024-07-01' format='month' />;

{
  /* Full date header */
}
<DateHeaderCard date={new Date()} format='full' />;

{
  /* Interactive date header */
}
<DateHeaderCard
  date={2024}
  format='year'
  interactive={true}
  onClick={() => handleYearClick(2024)}
/>;
```

## Props

### CalendarCard Props

- `selectedDate?: Date` - Currently selected date
- `onDateSelect?: (date: Date) => void` - Date selection callback
- `onMonthChange?: (month: number, year: number) => void` - Month/year change callback
- `events?: { [key: string]: number }` - Events data (date string -> event count)
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date
- `className?: string` - Additional CSS classes

### CalendarDayCard Props

- `day?: number | string` - Day number or text (for headers)
- `onClick?: () => void` - Click handler
- `type: 'inactive' | 'active' | 'header' | 'selected' | 'today'` - Card type
- `hasEvents?: boolean` - Whether day has events
- `eventCount?: number` - Number of events
- `isDisabled?: boolean` - Whether day is disabled

### DatePickerCard Props

- `value: string | number` - Month name or year number
- `type: 'month' | 'year'` - Picker type
- `onClick?: () => void` - Click handler
- `isSelected?: boolean` - Whether currently selected
- `isDisabled?: boolean` - Whether disabled

### DateHeaderCard Props

- `date: string | number | Date` - Date value
- `format?: 'year' | 'month' | 'day' | 'full'` - Display format
- `onClick?: () => void` - Click handler
- `interactive?: boolean` - Whether interactive
- `style?: React.CSSProperties` - Additional styles

## Usage Examples

### Blog with Date Headers

```tsx
// Date structure: 2024 > July > Blog Posts
<DateHeaderCard date={2024} format="year" />

<div style={{ marginLeft: '1rem' }}>
  <DateHeaderCard date="2024-07-01" format="month" />

  <div style={{ marginLeft: '1rem' }}>
    <BlogPost title="First July Post" />
    <BlogPost title="Second July Post" />
  </div>

  <DateHeaderCard date="2024-06-01" format="month" />

  <div style={{ marginLeft: '1rem' }}>
    <BlogPost title="June Post" />
  </div>
</div>
```

### Event Calendar

```tsx
const events = {
  '2024-07-05': 2, // 2 events on July 5th
  '2024-07-10': 1, // 1 event on July 10th
  '2024-07-15': 3, // 3 events on July 15th
};

<CalendarCard
  selectedDate={selectedDate}
  onDateSelect={(date) => {
    setSelectedDate(date);
    // Show events for selected date
  }}
  events={events}
/>;
```

### Portfolio Timeline

```tsx
// Group portfolio items by year
<DateHeaderCard date={2024} format="year" interactive />
<div style={{ marginLeft: '1rem' }}>
  <PortfolioCard title="Project A" />
  <PortfolioCard title="Project B" />
</div>

<DateHeaderCard date={2023} format="year" interactive />
<div style={{ marginLeft: '1rem' }}>
  <PortfolioCard title="Project C" />
</div>
```

### Custom Calendar Grid

```tsx
const daysOfWeek = ['su', 'm', 'tu', 'w', 'th', 'f', 'sa'];

<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
  }}
>
  {/* Header row */}
  {daysOfWeek.map((day) => (
    <CalendarDayCard key={day} day={day} type='header' />
  ))}

  {/* Calendar days */}
  {calendarDays.map((day, index) => (
    <CalendarDayCard
      key={index}
      day={day.number}
      type={getdayType(day)}
      onClick={() => handleDayClick(day)}
      hasEvents={day.eventCount > 0}
      eventCount={day.eventCount}
    />
  ))}
</div>;
```

### Date Range Picker

```tsx
// Month selection
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.5rem'
}}>
  {months.map((month, index) => (
    <DatePickerCard
      key={month}
      value={month.toLowerCase()}
      type="month"
      onClick={() => handleMonthSelect(index)}
      isSelected={index === currentMonth}
    />
  ))}
</div>

// Year selection
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '0.5rem'
}}>
  {years.map(year => (
    <DatePickerCard
      key={year}
      value={year}
      type="year"
      onClick={() => handleYearSelect(year)}
      isSelected={year === currentYear}
    />
  ))}
</div>
```

## Features

- **Consistent Styling**: All cards use the BaseCard system with hard edges
- **Theme Support**: Automatic light/dark mode adaptation
- **Event Indicators**: Visual indicators for days with events
- **Multiple States**: Support for different day states (today, selected, inactive, etc.)
- **Accessibility**: Keyboard navigation and screen reader support
- **Responsive**: Adapts to different screen sizes
- **Flexible**: Easy to compose into custom layouts
- **Type Safety**: Full TypeScript support

## Calendar Layouts

### 7-Column Grid (Standard Calendar)

```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}
```

### 3-Column Grid (Month Picker)

```css
.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
```

### 4-Column Grid (Year Picker)

```css
.year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
```

## Integration with Blog/Content Cards

The calendar cards are designed to work seamlessly with your existing content card system:

```tsx
// Combined layout
<DateHeaderCard date={2024} format="year" />

<div style={{ marginLeft: '1rem' }}>
  <DateHeaderCard date="2024-07-01" format="month" />

  <GridCardContainer>
    {blogPosts.map(post => (
      <GridCard key={post.id} {...post} />
    ))}
  </GridCardContainer>
</div>
```

All components maintain the same visual consistency with hard edges, consistent shadows, and theme support as your other card components.
