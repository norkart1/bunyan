import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './components/ProfileSection'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { useEffect } from 'react'
import AnalyticsSection from './components/Analytics'
import { useDynamicQuery } from '@/utils/hooks/useFetchData'
import { useDynamicMutation } from '@/utils/hooks/useMutationData'
import { useQuery } from '@apollo/client'
import { FindAllDistrictsDocument } from '@/generated/graphql'
import { FIND_ALL_DISTRICTS } from '@/graphql/queries/district'
import PostsTable from './components/Posts'
import JobsTable from './components/Jobs'
import EventsTable from './components/Events'
import TasksTable from './components/Tasks'

const { TabNav, TabList } = Tabs

const CustomerDetails: any = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const tab = searchParams.get('tab') // Retrieve the value of 'tab'
    const tabList = [
        { title: 'Analytics', key: 'analytics' },
        { title: 'Tasks', key: 'tasks' },
        { title: 'Posts', key: 'posts' },
        { title: 'Jobs', key: 'jobs' },
        { title: 'Events', key: 'events' },
    ]

    useEffect(() => {
        // if tab is not in the list, redirect to the first tab
        if (!tabList.some((item) => item.key === tab)) {
            navigate(`${window.location.pathname}?tab=${tabList[0].key}`)
        }
    }, [tab])

    const { loading, data, error } = useDynamicQuery({
        entity: 'districts',
        fields: ['name'],
        operationName: 'findDistricts',
        variables: { limit: 10, offset: 0 },
        variableTypes: { limit: 'Int!', offset: 'Int!' },
    })

    const { data: data3 } = useQuery(FindAllDistrictsDocument, {
        variables: {
            limit: 10,
            offset: 0,
        },
    })

    const { data: data4 } = useQuery(FIND_ALL_DISTRICTS, {
        variables: {
            limit: 10,
            offset: 0,
        },
    })

    const {
        mutate,
        data: data2,
        error: error2,
    } = useDynamicMutation({
        entity: 'createDistrict',
        fields: ['name'],
        operationName: 'createDistrict',
        variables: {
            createDistrictInput: {
                name: '',
            },
        },
        variableTypes: { createDistrictInput: 'CreateDistrictInput!' },
    })

    const dataOG = {
        id: '1',
        name: 'Pookkolathur Mahallu',
        nameID: 'Musthaq Minhaaj',
        firstName: 'Angelina',
        lastName: 'Gotelli',
        email: 'carolyn_h@hotmail.com',
        img: 'https://ecme-react.themenate.net/img/others/gallery/img-34.webp',
        role: 'admin',
        lastOnline: 1723430400,
        status: 'active',
        title: 'Product Manager',
        personalInfo: {
            location: 'New York, US',
            address: '123 Main St',
            postcode: '10001',
            city: 'New York',
            country: 'US',
            dialCode: '+1',
            birthday: '10/10/1992',
            phoneNumber: '+12-123-1234',
            facebook: 'facebook.com',
            twitter: 'twitter.com',
            pinterest: 'pinterest.com',
            linkedIn: 'linkedin',
        },
        orderHistory: [
            {
                id: '#36223',
                item: 'Acme pro plan (monthly)',
                status: 'pending',
                amount: 59.9,
                date: 1739132800,
            },
            {
                id: '#34283',
                item: 'Acme pro plan (monthly)',
                status: 'paid',
                amount: 59.9,
                date: 1736790880,
            },
            {
                id: '#32234',
                item: 'Acme pro plan (monthly)',
                status: 'paid',
                amount: 59.9,
                date: 1734090880,
            },
        ],
        paymentMethod: [
            {
                cardHolderName: 'Angelina Gotelli',
                cardType: 'VISA',
                expMonth: '12',
                expYear: '25',
                last4Number: '0392',
                primary: true,
            },
            {
                cardHolderName: 'Angelina Gotelli',
                cardType: 'MASTER',
                expMonth: '06',
                expYear: '25',
                last4Number: '8461',
                primary: false,
            },
        ],
        subscription: [
            {
                plan: 'Business board basic',
                status: 'active',
                billing: 'monthly',
                nextPaymentdate: 1739132800,
                amount: 59.9,
            },
        ],
        totalSpending: 4367.15,
    }

    const isLoading = false

    return (
        <Loading loading={isLoading}>
            {!isEmpty(dataOG) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={dataOG as any} />
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between">
                            <p className="text-2xl font-bold text-gray-800 p-2 ">
                                Mahallu Profile
                            </p>
                        </div>
                        <Tabs defaultValue="analytics" value={tab as string}>
                            <TabList>
                                {tabList.map((item) => (
                                    <div
                                        onClick={() =>
                                            navigate(
                                                `${window.location.pathname}?tab=${item.key}`,
                                            )
                                        }
                                    >
                                        <TabNav key={item.key} value={item.key}>
                                            {item.title}
                                        </TabNav>
                                    </div>
                                ))}
                            </TabList>
                            <div className="p-4 bg-neutral rounded-2xl py-6 mt-6">
                                {tab === 'analytics' ? (
                                    <AnalyticsSection />
                                ) : tab === 'posts' ? (
                                    <PostsTable />
                                ) : tab === 'jobs' ? (
                                    <JobsTable />
                                ) : tab === 'tasks' ? (
                                    <TasksTable />
                                ) : tab === 'events' ? (
                                    <EventsTable />
                                ) : (
                                    <AnalyticsSection />
                                )}
                            </div>
                        </Tabs>
                    </div>


                </div>
            )}
        </Loading>
    )
}

export default CustomerDetails
