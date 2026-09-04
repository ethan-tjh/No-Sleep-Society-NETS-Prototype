import React, {createContext, useContext, useReducer} from 'react';
import {evaluatePayment} from '../engine/loopEngine';
import {computeStreak, getPetLevel} from '../engine/petEngine';
import {computeBudgetSummary} from '../engine/budgetEngine';
import {loopDefinitions} from '../data/mockLoops';
import {petLevelThresholds} from '../data/mockPetLevels';
import {monthlyBudget, buildSeedSpending} from '../data/mockBudget';

const WalletContext = createContext(null);

// Lazy init so buildSeedSpending()'s relative dates are computed at actual
// app launch, not at bundle-build time.
function createInitialState() {
    return {
        transactions: [], // drives loop progress + pet level/streak — only grows via recordPayment()
        historicalSpending: buildSeedSpending(), // Home budget stats only — never touches loop/pet logic
        loopProgress: {},
        petName: null,
        petSpecies: null,
    };
}

function walletReducer(state, action) {
    switch (action.type) {
        case 'RECORD_PAYMENT':
            return {
                ...state,
                transactions: [...state.transactions, action.payment],
                loopProgress: action.loopProgress,
            };
        case 'SET_PET':
            return {
                ...state,
                petName: action.name,
                petSpecies: action.species,
            };
        default:
            return state;
    }
}

export function WalletProvider({children}) {
    const [state, dispatch] = useReducer(walletReducer, undefined, createInitialState);

    // recordPayment is the single entry point for "payment succeeded" —
    // called the same way whether triggered from Pay.js or Scan.js, so
    // downstream logic doesn't care which NETS rail fired it.
    const recordPayment = (payment) => {
        const {loopProgress, results} = evaluatePayment(payment, loopDefinitions, state.loopProgress);
        dispatch({type: 'RECORD_PAYMENT', payment, loopProgress});
        return results;
    };

    const setPet = ({name, species}) => {
        dispatch({type: 'SET_PET', name, species});
    };

    // Pet level and streak are derived, not stored — they're always a pure
    // function of transactions, so there's no risk of them drifting out of
    // sync with the underlying data.
    const qualifyingCount = state.transactions.filter((t) => t.status === 'success').length;
    const petLevelInfo = getPetLevel(qualifyingCount, petLevelThresholds);
    const streak = computeStreak(state.transactions);

    // Budget stats use seed + live transactions together, so Home reflects
    // both realistic history AND every payment made during the demo — but
    // loop/pet logic above only ever reads state.transactions (live only).
    const allSpending = [...state.historicalSpending, ...state.transactions];
    const budgetSummary = computeBudgetSummary(allSpending, monthlyBudget);

    const value = {
        transactions: state.transactions,
        loopProgress: state.loopProgress,
        loopDefinitions,
        recordPayment,
        petName: state.petName,
        petSpecies: state.petSpecies,
        setPet,
        petLevelInfo,
        streak,
        qualifyingCount,
        budgetSummary,
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