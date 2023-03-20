import { useEffect, useState } from "react";

const getLocalLog = () => {
    const log = localStorage.getItem('transactionLog');
    if(log) {
        return JSON.parse(log);
    } 
    return [];
}

const getLocalBalance = () => {
    const total = localStorage.getItem('balance');
    if(total) {
        return JSON.parse(total);
    }
    return 0;
}

export const Home = () => {

    const [balance, setBalance] = useState(getLocalBalance());

    const [amount, setAmount] = useState<number | ''>('');

    const [error, setError] = useState(false);

    type transactionType = {
        date: Date,
        amount: number | '', 
        action: string
    }[];

    const [transactions, setTransactions] = useState<transactionType>(getLocalLog());

    const handleAdd = () => {
        if(amount) {
            setError(false);
            const transaction = {
                date: new Date(),
                amount: amount,
                action: 'add'
            }
            setTransactions([...transactions, transaction]);
            setBalance(balance + amount);
            setAmount('');
        } else {
            setError(true);
        }
    }

    const handleRemove = () => {
        if(amount) {
            setError(false);
            const transaction = {
                date: new Date(),
                amount: amount,
                action: 'remove'
            }
            setTransactions([...transactions, transaction]);
            setBalance(balance - amount);
            setAmount('');
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e : any) => {
        setAmount(parseInt(e.target.value));
        setError(false);
    }

    useEffect(() => {
        localStorage.setItem('transactionLog', JSON.stringify(transactions));
        localStorage.setItem('balance', JSON.stringify(balance));
    }, [transactions, balance]);

    return (
        <div className="main">
            <h1>Expense Tracker - Basic</h1>
            <div className="balanceForm">
                <label><h3>Balance : {balance}</h3></label> <br/>
                <input 
                    placeholder="Amount..."
                    type='number' 
                    value={amount}
                    onChange={onChangeHandler}
                    style={{borderColor: error===true ? '#eb5656' : 'inherit'}}
                /> <br />
                {error && <p className="error">This is a required field</p>}
                <button type="submit" className="button" onClick={handleAdd}>Add</button>
                <button type="submit" className="button" onClick={handleRemove}>Remove</button>
            </div>

            <div className='displayLog'>
                <h3>Transactions</h3>
                {
                    transactions.map(trans => {
                        return (
                            <p key={JSON.stringify(trans.date)}>{JSON.stringify(trans.date).slice(1, -1)} - {trans.amount} - {trans.action}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}