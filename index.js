function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
  }

  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInObj = {
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date,
    };
    this.timeInEvents.push(timeInObj);
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutObj = {
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date,
    };
    this.timeOutEvents.push(timeOutObj);
    return this;
  }

  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100;
    return hoursWorked;
  }

  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    const pay = hours * this.payPerHour;
    return pay;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray,firstName){
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords){
  let totalPay= employeeRecords.reduce(acc,employeeRecord=>{
    return acc + allWagesFor.call(employeeRecord)},0)
    return totalPay 
}

