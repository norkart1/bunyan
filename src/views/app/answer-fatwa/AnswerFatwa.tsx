import { Button, Card, Input } from '@/components/ui'
import { Fatwa } from '@/generated/graphql'
import { FIND_ALL_FATWAS, FIND_FATWA_BY_ID } from '@/graphql/queries/fatwa'
import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { BiCalendar, BiPhone, BiUser } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import AnswerLoading from './components/AnswerLoading'
import { ANSWER_FATWA } from '@/graphql/mutations/fatwa'
import toast from 'react-hot-toast'
import { convertToYYYYMonthDD, timeAgo } from '@/utils/dateHelper'

type FatwaStatus = 'PENDING' | 'ANSWERED' | 'REJECTED'

const FatwaAnswerPage = () => {
    const [fatwa, setFatwa] = useState<Fatwa | null>(null)
    const [answer, setAnswer] = useState(fatwa?.answer || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const params = useParams<{ id: string }>()

    const [allFatwas, setAllFatwas] = useState<Fatwa[]>([])

    const {
        data: FindFatwa,
        error: FatwaError,
        loading: FatwaLoading,
    } = useQuery(FIND_FATWA_BY_ID, {
        variables: {
            fatwaId: parseInt(params.id || '1'),
        },
    })

    const [answerFatwa] = useMutation(ANSWER_FATWA, {
        // refetchQueries: [{ query: FIND_FATWA_BY_ID }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Fatwa answered successfully', {
                id: 'toastId',
                duration: 5000,
            })
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to update badge'
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    useEffect(() => {
        if (FindFatwa) {
            setFatwa(FindFatwa.fatwa)
            setAnswer(FindFatwa.fatwa?.answer)
        }
    }, [FindFatwa])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!answer) {
            setError('Answer is required')
            return
        }

        setIsSubmitting(true)

        try {
            await answerFatwa({
                variables: {
                    answerFatwaId: parseInt(params.id || '1'),
                    answer,
                },
            })

            setAnswer('')
            setError('')
        } catch (error: any) {
            setError(error?.message || 'Failed to submit answer')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const maskMobileNumber = (mobile: string) => {
        return mobile.slice(0, 3) + '****' + mobile.slice(-4)
    }

    return FatwaLoading ? (
        <AnswerLoading />
    ) : fatwa ? (
        <Card className="bg-gray-100 border-none">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {fatwa.status === 'PENDING'
                    ? 'Answer Fatwa'
                    : 'Edit Fatwa Answer'}
            </h1>

            <Card className="">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Fatwa #{fatwa.id}
                    </h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            Question:
                        </h3>
                        <p className="text-gray-600">{fatwa.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                            <BiCalendar className="mr-2 h-4 w-4" />
                            <span>Asked on: {formatDate(fatwa.askedAt)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <BiPhone className="mr-2 h-4 w-4" />
                            <span>
                                Questioner:{' '}
                                {maskMobileNumber(
                                    fatwa?.questionerMobile as string,
                                )}
                            </span>
                        </div>
                    </div>

                    {fatwa.status === 'ANSWERED' && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Current Answer:
                            </h3>
                            <p className="text-gray-600">{fatwa.answer}</p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <BiCalendar className="mr-2 h-4 w-4" />
                                    <span>
                                        Answered on:{' '}
                                        {timeAgo(new Date(fatwa.answeredAt))}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <BiUser className="mr-2 h-4 w-4" />
                                    <span>
                                        Answered by:{' '}
                                        {fatwa?.answeredBy?.username}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="answer"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {fatwa.status === 'PENDING'
                                    ? 'Your Answer:'
                                    : 'Edit Answer:'}
                            </label>
                            <Input
                                textArea
                                id="answer"
                                placeholder="Type your answer here..."
                                rows={6}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-emerald-500"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="mb-4 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                            variant="solid"
                        >
                            {isSubmitting
                                ? 'Submitting...'
                                : fatwa.status === 'PENDING'
                                  ? 'Submit Answer'
                                  : 'Update Answer'}
                        </Button>
                    </form>
                </div>
            </Card>
        </Card>
    ) : (
        <Card className="bg-gray-100 border-none">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Fatwa Answer
            </h1>

            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Fatwa Not Found
                </h2>
                <p className="text-gray-600">
                    The fatwa you are looking for does not exist. Please try
                    again later.
                </p>
            </div>
        </Card>
    )
}

export default FatwaAnswerPage
