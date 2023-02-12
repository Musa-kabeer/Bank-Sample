'use strict';
// BANK APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
///////////////////////////////////////
///////////////////////////
///////////////
///////

// displayMovements
const displayMovements = movements => {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i, _) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const markup = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">$${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', markup);
  });
};

const displayUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(n => n[0].toLowerCase())
      .join('');
  });
};

displayUsername(accounts);

const displaySummary = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => cur + acc);

  labelBalance.textContent = `${acc.balance}$`;

  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);

  labelSumIn.textContent = `${income}$`;

  const out = acc.movements.filter(mov => mov < 0);
  const output =
    out.length === 0 ? '0000' : out.reduce((acc, cur) => acc + cur);

  labelSumOut.textContent = `${output}$`;

  const interest = Math.floor(
    acc.movements.reduce((acc, cur) => acc + cur) / 8.3
  );

  labelSumInterest.textContent = `${interest}$`;
};

// LOGIN
let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(acc => {
    return acc.username === inputLoginUsername.value;
  });

  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    // Clear Inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;
    displaySummary(currentAccount);
    displayMovements(currentAccount.movements);
  }
});

// TRANSFER
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;

  const receiverAcc = accounts.find(acc => {
    return acc.username === inputTransferTo.value;
  });

  if (
    receiverAcc &&
    receiverAcc.username !== currentAccount.username &&
    amount > 0
  ) {
    // Clear Inputs
    inputTransferTo.value = '';
    inputTransferAmount.value = '';

    // Push Amount
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    displaySummary(currentAccount);
    displayMovements(currentAccount.movements);
  }
});

// LOAN
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  let amount = +inputLoanAmount.value;

  if (amount > 0) {
    currentAccount.movements.push(amount);

    inputLoanAmount.value = '';

    displaySummary(currentAccount);
    displayMovements(currentAccount.movements);
  }
});

// CLOSE
btnClose.addEventListener('click', e => {
  e.preventDefault();
  const index = accounts.findIndex(
    acc => acc.username === inputCloseUsername.value
  );

  if (currentAccount.pin === +inputClosePin.value) {
    inputCloseUsername.value = '';
    inputClosePin.value = '';

    containerApp.style.opacity = 0;
    accounts.splice(index, 1);
  }
});

// SORT
btnSort.addEventListener('click', e => {
  e.preventDefault();
});
