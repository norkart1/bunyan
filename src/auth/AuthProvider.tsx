import {
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect,
    useState,
} from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiSignIn, apiSignOut } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import type {
    SignInCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User,
    Token,
} from '@/@types/auth'
import type { ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import client from '@/services/graphql/apolloClient'
import { CHECK_LOGGED_IN } from '@/graphql/queries/auth'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = forwardRef<IsolatedNavigatorRef>((_, ref) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
})

const checkLoggedIn = async () => {
    const { data, loading, error } = await client.query({
        query: CHECK_LOGGED_IN,
        // include cookie in the header
        fetchPolicy: 'network-only',
        context: {
            headers: {
                cookie: document.cookie,
            },
        },
    })

    return {
        data: data?.checkLoggedIn,
        loading,
        error,
    }
}

function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()

    const [authenticated, setAuthenticated] = useState(token ? true : false)
    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const redirect = () => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)

        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
    }

    const handleSignIn = (tokens: Token, user?: User) => {
        setToken(tokens.accessToken)
        setSessionSignedIn(true)

        if (user) {
            setUser(user)
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser(null as User)
        setSessionSignedIn(false)
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        try {
            const resp = await apiSignIn(values)
            console.log(resp)

            if (resp) {
                handleSignIn(
                    { accessToken: resp.data?.login?.token },
                    resp.data?.login?.user,
                )
                setAuthenticated(true)

                return {
                    status: 'success',
                    message: '',
                }
            }
            return {
                status: 'failed',
                message: 'Unable to sign in',
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors.message,
            }
        }
    }

    const signOut = async () => {
        try {
            await apiSignOut()
        } finally {
            setAuthenticated(false)
            handleSignOut()
            navigatorRef.current?.navigate(appConfig.unAuthenticatedEntryPath)
        }
    }

    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }

    useEffect(() => {
        if (!token || token) {
            checkLoggedIn().then((data) => {
                console.log(data)

                if (data.data) {
                    setUser(data.data.user)
                    setSessionSignedIn(true)
                    setAuthenticated(true)
                    // set token to the store
                    setToken(data.data.token)
                } else {
                    navigatorRef.current?.navigate(
                        appConfig.authenticatedEntryPath,
                    )
                    setSessionSignedIn(false)
                }
            })
        } else {
            redirect()
            setSessionSignedIn(false)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

IsolatedNavigator.displayName = 'IsolatedNavigator'

export default AuthProvider
