import { Avatar, Card } from '@/components/ui'
import { useSessionUser } from '@/store/authStore'
const WelcomeBox = () => {
    const user = useSessionUser((state) => state.user)

    return (
        <Card className="w-full border border-gray-400">
            <div className="flex justify-center mx-auto flex-col">
                <p className="text-2xl font-normal ">Assalamu Alaikum,</p>
                <p className="text-2xl font-bold text-gray-800 mb-2 w-64">
                    {user?.username} Mahallu Admin
                </p>
                <p>Have a look on current statistics</p>
            </div>
        </Card>
    )
}

export default WelcomeBox
