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
            minute: currentTime.getMinutes(),
            seconds: currentTime.getSeconds()
        };

        if(time.hour < 10) {
            time.hour = `0${time.hour}`
        };

        if(time.minute < 10) {
            time.minute = `0${time.minute}`
        };

        if(time.seconds < 10) {
            time.seconds = `0${time.seconds}`
        };

        return time;
    };
};

module.exports = GetDate;