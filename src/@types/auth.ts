import { Credential } from "@/generated/graphql"

export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    token: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = Credential | null

export type Token = {
    accessToken: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
