import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedEndDate: new Date(),
        selected: 0,
        cost: this.getCost(new Date(), 1)
    };

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.pervMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    getCost(startDate, numOfDays) {
        const dateString = dateFns.format(startDate, 'MM%2FDD%2FYYYY');
        fetch(`api/bananabudget/${dateString}/${numOfDays}`)
            .then(res => res.json())
            .then(res => this.setState({cost: res.cost}));
        
    }

    renderCells() {
        const { currentMonth, selectedDate, selectedEndDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div 
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "selected" 
                            : dateFns.isSameDay(day, selectedEndDate) ? "selected2"  
                            : dateFns.isWithinRange(day, selectedDate, selectedEndDate) ? "between" : "" 
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        const { selectedDate, selected } = this.state;
    
        if (selected === 0) {
             // choose start day
            this.setState({
                selectedDate: day,
                selectedEndDate: day,
                selected: 1
            })
            this.getCost(day, 1);
        } else {
            if (dateFns.isBefore(day, selectedDate)) {
                this.setState({
                    selectedDate: day,
                    selectedEndDate: day,
                    selected: 1
                })
                this.getCost(day, 1);
            } else {
                this.setState({
                    selectedEndDate: day,
                    selected: 0
                })
                this.getCost(this.state.selectedDate, dateFns.differenceInCalendarDays(day, this.state.selectedDate) + 1);
            }
        }
        
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    pervMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    render() {
        const { selectedDate, selectedEndDate, cost } = this.state;
        const days = dateFns.differenceInCalendarDays(selectedEndDate, selectedDate) + 1;
        return (
            <div>
                <div className="calendar">
                    { this.renderHeader() }
                    { this.renderDays() }
                    { this.renderCells() }
                </div>
                <div className="description">
                    <p><b>START DATE:</b><span> { selectedDate.toDateString() } </span></p>
                    <p><b>END DATE:</b><span> { selectedEndDate.toDateString() }</span></p>
                    <p><b>DAYS:</b> { days }</p>
                    <p><b>COST:</b> { cost }</p>
                </div>
            </div>
        );
    }
}

export default Calendar;