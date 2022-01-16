import React, { createContext, useEffect, useReducer, useContext } from "react";
import generateMessage, { Message, Priority } from "../Api";
import { useSnackbarContext } from './SnackbarContext'

type State = {
  errorMessages: Message[],
  warningMessages: Message[],
  infoMessages: Message[],
  loadMessages: boolean
}

const initialState: State = {
  errorMessages: [],
  warningMessages: [],
  infoMessages: [],
  loadMessages: true
};

enum ActionKind {
  toggle_message_load = 'toggle_message_load',
  clear_all_message = 'clear_all_message',
  remove_single_message = 'remove_single_message',
  add_new_message = 'add_new_message',
}

type Action = {
  type: ActionKind,
  payload: Message | null
}

const MessageReducer = (state: State, action: Action): State => {

  const { type, payload } = action;

  switch (type) {

    case ActionKind.toggle_message_load:
      return {
        ...state,
        loadMessages: !state.loadMessages
      };

    case ActionKind.clear_all_message:
      return {
        ...state,
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      };

    case ActionKind.add_new_message:
      if (payload?.priority === Priority.Error) {
        return {
          ...state,
          errorMessages: state.errorMessages.concat(payload)
        }
      }
      else if (payload?.priority === Priority.Warn) {
        return {
          ...state,
          warningMessages: state.warningMessages.concat(payload)
        }
      }
      else if (payload?.priority === Priority.Info) {
        return {
          ...state,
          infoMessages: state.infoMessages.concat(payload)
        }
      }
      else {
        return state
      }

    case ActionKind.remove_single_message:
      if (payload?.priority === Priority.Error) {
        const index = state.errorMessages.indexOf(payload);
        if (index > -1) {
          const cloneArr = [...state.errorMessages]
          cloneArr.splice(index, 1)
          return {
            ...state,
            errorMessages: cloneArr
          }
        }
      }
      else if (payload?.priority === Priority.Warn) {
        const index = state.warningMessages.indexOf(payload);
        if (index > -1) {
          const cloneArr = [...state.warningMessages]
          cloneArr.splice(index, 1)
          return {
            ...state,
            warningMessages: cloneArr
          }
        }
      }
      else if (payload?.priority === Priority.Info) {
        const index = state.infoMessages.indexOf(payload);
        if (index > -1) {
          const cloneArr = [...state.infoMessages]
          cloneArr.splice(index, 1)
          return {
            ...state,
            infoMessages: cloneArr
          }
        }
      }
      return state

    default:
      return state;
  }
};

type ContextContent = State & {
  toggleMessageLoad: () => void,
  clearAllMessage: () => void,
  removeSingleMessage: (message: Message) => void
}

const MessageContext = createContext<ContextContent | null>(null);

const useMessageContext = () => useContext(MessageContext)


const MessageProvider: React.FC = (props: any) => {
  const [state, dispatch] = useReducer(MessageReducer, initialState);
  const snackbarContext = useSnackbarContext()
  const toggleMessageLoad = () => {
    dispatch({
      type: ActionKind.toggle_message_load,
      payload: null
    });
  };

  const addNewMessage = (message: Message) => {

    if (message.priority === Priority.Error) {
      snackbarContext?.openSnackbar(message.message)
    }

    dispatch({
      type: ActionKind.add_new_message,
      payload: message
    })
  }
  const clearAllMessage = () => {
    dispatch({
      type: ActionKind.clear_all_message,
      payload: null
    })
  }

  const removeSingleMessage = (message: Message) => {
    dispatch({
      type: ActionKind.remove_single_message,
      payload: message
    })
  }

  useEffect(() => {
    if (!state.loadMessages) return

    const cleanUp = generateMessage((message: Message) => {
      addNewMessage(message)
    });
    return cleanUp;
    //eslint-disable-next-line
  }, [state.loadMessages]);


  return (
    <MessageContext.Provider
      value={{
        ...state,
        toggleMessageLoad,
        clearAllMessage,
        removeSingleMessage
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export { useMessageContext, MessageProvider };
