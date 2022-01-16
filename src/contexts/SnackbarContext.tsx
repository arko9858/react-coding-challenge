import React, { useReducer, createContext, useContext, useEffect } from "react";
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';

type State = {
    open: boolean,
    message: String,
}

const initialState: State = {
    open: false,
    message: "",
};

enum ActionKind {
    open_snackbar = 'open_snackbar',
    close_snackbar = 'close_snackbar',
}

type Action = {
    type: ActionKind,
    payload: String | null
}


const SnackbarReducer = (state: State, action: Action) => {

    const { type, payload } = action;

    switch (type) {
        case ActionKind.open_snackbar:
            return {
                ...state,
                open: true,
                message: payload ? payload : ''
            };
        case ActionKind.close_snackbar:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};

type ContextContent = {
    openSnackbar: (message: String) => void,
}

const SnackbarContext = createContext<ContextContent | null>(null);

const useSnackbarContext = () => useContext(SnackbarContext)

const SnackbarProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(SnackbarReducer, initialState);

    const openSnackbar = (message: String) => {
        dispatch({
            type: ActionKind.open_snackbar,
            payload: message,
        });
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({
            type: ActionKind.close_snackbar,
            payload: null
        });
    }
    // to auto close snackbar after 2 seconds
    useEffect(() => {
        if (!state.open) return
        let autoHideSnackbar: ReturnType<typeof setTimeout>;
        autoHideSnackbar = setTimeout(() => {
            dispatch({
                type: ActionKind.close_snackbar,
                payload: null
            })
        }, 2000);

        return () => {
            clearTimeout(autoHideSnackbar)
        }
    }, [state])

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            <Snackbar open={state.open} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} transitionDuration={{ enter: 500, exit: 500 }}>
                <Alert severity="error" onClose={handleClose}>{state.message}</Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    )
};

export { useSnackbarContext, SnackbarProvider };
