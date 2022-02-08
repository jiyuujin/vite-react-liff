import React, { createContext, ReactNode, useContext, useReducer } from 'react'
import { User } from 'firebase/auth'

type AuthActions =
  | { type: 'SIGN_IN'; payload: { user: User } }
  | { type: 'SIGN_OUT' }

type AuthState =
  | {
      state: 'SIGNED_IN'
      currentUser: User
    }
  | {
      state: 'SIGNED_OUT'
    }
  | {
      state: 'UNKNOWN'
    }

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  if (action.type === 'SIGN_IN') {
    return {
      state: 'SIGNED_IN',
      currentUser: action.payload.user,
    }
  }
  return {
    state: 'SIGNED_OUT',
  }
}

type AuthContextProps = {
  state: AuthState
  dispatch: (value: AuthActions) => void
}

export const AuthContext = createContext<AuthContextProps>({
  state: { state: 'UNKNOWN' },
  dispatch: (val) => {
    //
  },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: 'UNKNOWN' })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  const { state } = useContext(AuthContext)
  return {
    state,
  }
}

export const useUser = () => {
  const { dispatch } = useContext(AuthContext)
  return {
    signIn: (user: User) => {
      dispatch({ type: 'SIGN_IN', payload: { user } })
    },
    signOut: () => {
      dispatch({ type: 'SIGN_OUT' })
    },
  }
}
