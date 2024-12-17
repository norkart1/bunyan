import { Button, Card } from '@/components/ui'
import { Fatwa } from '@/generated/graphql'
import { BiCalendar, BiPhone } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

interface FatwaProps {
    fatwa: Fatwa
}

const FatwaCard = ({ fatwa }: FatwaProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }
    const maskMobileNumber = (mobile: string) => {
        return mobile.slice(0, 3) + '****' + mobile.slice(-4)
    }

    const navigate = useNavigate()

    return (
        <Card
            key={fatwa.id}
            // className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Fatwa #{fatwa.id}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {fatwa.question}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BiCalendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(fatwa.askedAt)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BiPhone className="mr-2 h-4 w-4" />
                    <span>
                        {maskMobileNumber(fatwa?.questionerMobile as string)}
                    </span>
                </div>
                <div className="text-sm font-medium">
                    Status:{' '}
                    <span
                        className={`
                  ${fatwa.status === 'PENDING' ? 'text-yellow-600' : ''}
                  ${fatwa.status === 'ANSWERED' ? 'text-green-600' : ''}
                  ${fatwa.status === 'REJECTED' ? 'text-red-600' : ''}
                `}
                    >
                        {fatwa.status}
                    </span>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-2xl">
                <Button
                    className="w-full "
                    variant={
                        fatwa.status === 'PENDING'
                            ? 'solid'
                            : ('outline' as any)
                    }
                    color="neutral"
                    onClick={() => navigate(`/answer-fatwa/${fatwa.id}`)}
                >
                    {fatwa.status === 'PENDING' ? 'Answer' : 'View'}
                </Button>
            </div>
        </Card>
    )
}

export default FatwaCard
