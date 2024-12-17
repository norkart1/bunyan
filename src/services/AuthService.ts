
import type {
    SignInCredential,
    SignInResponse,
} from '@/@types/auth'
import client from './graphql/apolloClient';
import { LOGIN, LOGOUT } from '@/graphql/mutations/auth';

export async function apiSignIn(data: SignInCredential) {
   return client.mutate({
        mutation: LOGIN,
        variables: data,
    })
}


export async function apiSignOut() {
    return client.mutate({
        mutation: LOGOUT,
    })
}