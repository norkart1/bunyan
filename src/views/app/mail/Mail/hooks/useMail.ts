import { useMailStore } from '../store/mailStore'
import useSWRMutation from 'swr/mutation'
import type {
    GetMailsResponse,
    GetMailResponse,
    GetMailsRequest,
    GetMailRequest,
} from '../types'
import client from '@/services/graphql/apolloClient';
import { FIND_MY_NOTIFICATIONS, FIND_MY_SENT_NOTIFICATIONS, FIND_NOTIFICATION_BY_ID } from '@/graphql/queries/notification';
import { useState } from 'react';
import { useSessionUser } from '@/store/authStore';
import { RoleEnum } from '@/generated/graphql';


export const transformNotificationToMailFormat = (notifications : any) => {
    if(!notifications) return [];
    return notifications?.map((notification:any) => ({
        id: notification.id.toString(),
        name: notification.createdBy?.username || 'Unknown',
        label: '',
        group: 'received',
        flagged: false,
        starred: false,
        from: `${notification.createdBy?.username?.toLowerCase()}@yourcompany.com`,
        avatar: '/img/avatars/default-avatar.jpg', // Customize as needed
        title: notification.title || 'Notification',
        mail: [
            // only need first 60 characters of the content after that ...
            notification.credentials?.map((credential:any) => credential.username.toLowerCase() ).join(', ').substring(0, 20) + '...'
        ],
        message: [
            {
                id: notification.id.toString(),
                name: notification.createdBy?.username || 'Unknown',
                mail: [
                    notification.credentials?.map((credential:any) => credential.username.toLowerCase() )
                ],
                from: `${notification.createdBy?.username?.toLowerCase()}@yourcompany.com`,
                avatar: '/img/avatars/default-avatar.jpg',
                date: new Date(notification.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                content: `${notification.content || 'No content available'}`,
                attachment: [] // Add attachment logic if needed
            }
        ]
    }));
};

const useMail = () => {

    const {
        setMailList,
        setMail,
        selectedMailId,
        setMailListFetched,
        setSelectedMail,
    } = useMailStore()

    const [isMailsFetching, setIsMailsFetching] = useState(false);
    const [isMailFetching, setIsMailFetching] = useState(false);
    const user = useSessionUser((state) => state.user);

    const fetchMails = async (category : string) => {
        setMailList([]);
        setIsMailsFetching(true);
        try {

            let data = [];

            if(category === 'sent' || user?.role === RoleEnum.SuperAdmin) {
                const {data : mySentNotifications} = await client.query({
                    query: FIND_MY_SENT_NOTIFICATIONS,
                    variables: {
                        limit: 3,
                        offset: 0,
                    },
                    fetchPolicy: 'no-cache'
                });
                data  = mySentNotifications.mySentNotifications;
        }else{
            const { data : myNotifications } = await client.query({
                query: FIND_MY_NOTIFICATIONS,
                variables: {
                    limit: 3,
                    offset: 0,
                },
                fetchPolicy: 'no-cache'
            });
            data  = myNotifications.myNotifications;
            
        }
            


            // Transform notifications to mail format
            const transformedMails = transformNotificationToMailFormat(data);
        console.log('transformedMails', transformedMails);
        
            setSelectedMail([]);
            setMailList(transformedMails || []);
            setMailListFetched(true);
        } catch (error) {
            console.error('Failed to fetch mails:', error);
            setMailListFetched(false);
        } finally {
            setIsMailsFetching(false);
        }
    };


    

    const fetchMail = async (mailId: string) => {
        setIsMailFetching(true)
        try {
            const {data} = await client.query({
                query: FIND_NOTIFICATION_BY_ID,
                variables: {
                    id: parseInt(mailId)
                },
                fetchPolicy: 'no-cache'
            });
            const transformedMail = transformNotificationToMailFormat([data.notification]);
            setSelectedMail(transformedMail[0]);
            setMail(transformedMail[0])

        } catch (error) {
            console.error('Failed to fetch mail:', error)
        }
    }

    return {
        fetchMails,
        isMailsFetching,
        fetchMail,
        isMailFetching,
    }
}

export default useMail
