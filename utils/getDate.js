class GetDate {
    constructor() {
        this.date = new Date();
    };

    returnDate() { 
        const currentDate = this.date;

        const date = {
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };

        date.month = this.getMonthName(date.month);

        return date;
    };

    getMonthName(monthNumber) {
        const monthName = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        return monthName[monthNumber];
    };

    returnTime() {
        const currentTime = this.date;

        let time = {
            hour: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
        };

        if(time.hour < 10) {
            time.hour = `0${time.hour}`
        };

        if(time.minutes < 10) {
            time.minutes = `0${time.minutes}`
        };

        return time;
    };
};

module.exports = GetDate;