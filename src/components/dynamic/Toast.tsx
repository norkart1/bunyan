import { Notification, toast } from '../ui'

export default function Toast(
    type: 'success' | 'warning' | 'danger' | 'info',
    text: string,
) {
    toast.push(<Notification title={text} type={type}></Notification>, {
        placement: 'top-center',
    })
}
