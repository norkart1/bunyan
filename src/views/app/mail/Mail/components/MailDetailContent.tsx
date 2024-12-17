import { forwardRef } from 'react'
import IconText from '@/components/shared/IconText'
import Avatar from '@/components/ui/Avatar'
import ScrollBar from '@/components/ui/ScrollBar'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import ReactHtmlParser from 'html-react-parser'
import { HiOutlineClock } from 'react-icons/hi'
import type { Mail, Message } from '../types'
import type { ScrollBarRef } from '@/components/ui/ScrollBar'
import type { PropsWithChildren } from 'react'
import { BiFile } from 'react-icons/bi'
import ProfileAvatar from './ProfileAvatar'

type MailDetailContentProps = PropsWithChildren<{
    mail?: Partial<Mail>
}>

const ToMail = [
    {
        name: 'All Mahallu Admins',
    },
    {
        name : 'All Village Admins'
    },
    {
        name : 'All Zone Admins'
    },
    {
        name : 'All District Admins'
    },
]

const MailDetailContent = forwardRef<ScrollBarRef, MailDetailContentProps>(
    (props, ref) => {
        const { mail = {} } = props

        return (
            <div className="absolute top-0 left-0 h-full w-full ">
                <ScrollBar
                    ref={ref}
                    autoHide
                    className="overflow-y-auto h-[calc(100%-100px)]"
                >
                    <div className="h-full px-6">
                        {mail.message?.map((msg, index) => (
                            <div key={msg.id}>
                                <div
                                    className={classNames(
                                        'py-8 ltr:pr-4 rtl:pl-4',
                                        !isLastChild(
                                            mail.message as Message[],
                                            index,
                                        ) &&
                                            'border-b border-gray-200 dark:border-gray-700',
                                    )}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <ProfileAvatar
                                               alt={msg.name}
                                                src={msg.avatar}
                                                className=''
                                            />
                                            <div>
                                                <div className="font-bold truncate heading-text">
                                                    {msg.name}
                                                </div>
                                                <div>
                                                    To:{' '}
                                                    {mail.mail?.map(
                                                        (to, index) => (
                                                            <span
                                                                key={index + index}
                                                            >
                                                                {to}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <IconText
                                            icon={
                                                <HiOutlineClock className="text-lg" />
                                            }
                                        >
                                            <span className="font-semibold">
                                                {msg.date}
                                            </span>
                                        </IconText>
                                    </div>
                                    <div className="mt-8">
                                        {ReactHtmlParser(msg.content)}
                                    </div>
                                    {msg.attachment?.length > 0 && (
                                        <div className="mt-6 inline-flex flex-wrap gap-4">
                                            {msg.attachment.map((item) => (
                                                <div
                                                    key={item.file}
                                                    className="min-w-full md:min-w-[230px] rounded-2xl dark:bg-gray-800 border border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-700 py-4 px-3.5 inline-flex items-center gap-2 transition-all cursor-pointer"
                                                >
                                                    <BiFile
                                                        type={item.type}
                                                    />
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                                                            {item.file}
                                                        </div>
                                                        <span className="">
                                                            {item.size}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollBar>
            </div>
        )
    },
)

MailDetailContent.displayName = 'MailDetailContent'

export default MailDetailContent
