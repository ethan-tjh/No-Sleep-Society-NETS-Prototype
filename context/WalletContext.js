import React, {createContext, useContext, useReducer} from 'react';
import {evaluatePayment} from '../engine/loopEngine';
import {loopDefinitions} from '../data/mockLoops';

const WalletContext = createContext(null);

const initialState = {
    transactions: [],
    loopProgress: {},
};

function walletReducer(state, action) {
    switch (action.type) {
        case 'RECORD_PAYMENT':
            return {
                ...state,
                transactions: [...state.transactions, action.payment],
                loopProgress: action.loopProgress,
            };
        default:
            return state;
    }
}

export function WalletProvider({children}) {
    const [state, dispatch] = useReducer(walletReducer, initialState);

    // recordPayment is the single entry point for "payment succeeded" —
    // called the same way whether triggered from Pay.js or Scan.js, so
    // downstream logic doesn't care which NETS rail fired it.
    const recordPayment = (payment) => {
        const {loopProgress, results} = evaluatePayment(payment, loopDefinitions, state.loopProgress);
        dispatch({type: 'RECORD_PAYMENT', payment, loopProgress});
        return results;
    };

    const value = {
        transactions: state.transactions,
        loopProgress: state.loopProgress,
        loopDefinitions,
        recordPayment,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}