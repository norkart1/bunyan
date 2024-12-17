import {
    HiOutlineInbox,
    HiOutlinePaperAirplane,
    HiOutlinePencil,
    HiOutlineStar,
    HiOutlineTrash,
} from 'react-icons/hi'
import type { Group, Label } from './types'

export const groupList: Group[] = [
    { value: 'inbox', label: 'Inbox', icon: <HiOutlineInbox className='' /> },
    { value: 'sent', label: 'Sent', icon: <HiOutlinePaperAirplane /> },
]

export const labelList: Label[] = [
    
]
