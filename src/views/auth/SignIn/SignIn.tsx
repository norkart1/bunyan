import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

type SignInProps = {
    disableSubmit?: boolean
}

export const SignInBase = ({ disableSubmit }: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    return (
        <div className="">
            <div>
                <div className="mb-8 text-3xl font-extrabold w-full text-center flex items-center justify-center">
                    <Logo
                        type="streamline"
                        mode={mode}
                        imgClass="mx-auto"
                        logoWidth={100}
                    />
                </div>
                <div className="flex items-center justify-center flex-col mb-8 mt-4">
                    <p className="mb-2 text-5xl font-extrabold text-primary">
                        Marhaban!
                    </p>
                    <p className="text-lg font-normal heading-text">
                        Please login to your account.
                    </p>
                </div>
                {message && (
                    <Alert showIcon className="mb-4" type="danger">
                        <span className="break-all">{message}</span>
                    </Alert>
                )}
                <SignInForm
                    disableSubmit={disableSubmit}
                    setMessage={setMessage}
                    className=""
                />
            </div>
        </div>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
