'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

var loan = function() {

  var account = {

    borrowed: 550000,
    balance: 286000,
    monthlyPayment: 1700,
    defaulted: 0,
    defaultsToForeclose: 5,
    foreclosed: false
  };

  var missPayment = function() {

    account.defaulted++;

    if(account.defaulted >= account.defaultsToForeclose) {

      account.foreclosed = true;
    };
  };

  return {

    getBalance: function() {

      return account.balance;
    },

    receivePayment: function(amount) {

      account.balance = account.balance - amount;

      if(amount<account.monthlyPayment) {

        missPayment();
      };
    },

    getMonthlyPayment: function() {

      return account.monthlyPayment;
    },

    isForeclosed: function() {

      return account.foreclosed;
    }
  };

};

// borrower()

var borrower = function(loan) {

  var account = {

    monthlyIncome: 1350,
    funds: 2800,
    loan: loan
  };

  return {

    getFunds: function() {

      return account.funds;
    },

    makePayment: function() {

      var payment = 0;

      if(account.loan.getBalance() < account.loan.getMonthlyPayment()) {

        payment = account.loan.getBalance();

      } else {

        payment = account.loan.getMonthlyPayment();
      }

      if(account.funds > payment) {

        account.funds = account.funds - payment;

        account.loan.receivePayment(payment);

      } else {

        account.loan.receivePayment(account.funds);
        account.funds = 0;
      };
    },

    payDay: function() {

      account.funds += account.monthlyIncome;
    }
  };
};

stevesLoan = loan();

steve = borrower(stevesLoan);

while(!stevesLoan.isForeclosed()) {

  steve.payDay();
  steve.makePayment();
  month++;

  console.log(month);
};

monthsUntilEvicted = month;
