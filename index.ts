import inquirer from "inquirer";

interface BankAccount {
    accountnumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkbalance(): void;
}

class BankAccount implements BankAccount {
    accountnumber: number;
    balance: number;

    constructor(accountnumber: number, balance: number) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }

    // DEBIT MONEY
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} successful. Remaining balance: ${this.balance}.`);
        } else {
            console.log("Insufficient balance.");
        }
    }

    // CREDIT MONEY
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposit of ${amount} is successful. Remaining balance: ${this.balance}`);
        } else {
            console.log("Deposit amount must be greater than zero.");
        }
    }

    // CHECK BALANCE
    checkbalance(): void {
        console.log(`Current balance is: ${this.balance}`);
    }
}

// CUSTOMER CLASS
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// CREATE BANK ACCOUNTS
const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];

// CREATE CUSTOMERS
const customers: Customer[] = [
    new Customer("Kashaf", "Fatima", "Female", 27, 3377283888, accounts[0]),
    new Customer("Mirha", "Khan", "Female", 29, 3467789432, accounts[1]),
    new Customer("Hamdan", "Khan", "Male", 35, 3357890531, accounts[2])
];

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "input",
            message: "Enter your account number:"
        });

        const CustomerArray = customers as Customer[]; // Assuming Customer is the correct type
        const foundCustomer = CustomerArray.find(customer => customer.account.accountnumber === parseInt(accountNumberInput.accountNumber));
        const Customer = customers.find(customer => customer.account.accountnumber === parseInt(accountNumberInput.accountNumber));

        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check balance", "Exit"]
            });

            switch (ans.select) {
                case "Deposit":
                    const DepositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    });
                    Customer.account.deposit(DepositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw",
                    });
                    Customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check balance":
                    Customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\nThank you for using our bank services. Have a great day!");
                    return;
            }
        } else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}

// Call the service function to start the program
service();
