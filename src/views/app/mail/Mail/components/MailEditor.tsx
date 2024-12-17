import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { useMailStore } from '../store/mailStore'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import client from '@/services/graphql/apolloClient'
import { CREATE_NOTIFICATION } from '@/graphql/mutations/notification'
import { Select } from '@/components/ui'
import { useQuery } from '@apollo/client'
import { getCredentials } from '@/graphql/queries/auth'

type FormSchema = {
    to: string
    content?: string
    title?: string
}

const validationSchema: ZodType<FormSchema> = z.object({
    to: z.string().min(1, { message: 'Please enter recipient' }),
    title: z.string(),
    content: z.string().min(1, { message: 'Please enter message' }),
})

// const options = [
//     { value: 'user1@example.com', label: 'User 1' },
//     { value: 'user2@example.com', label: 'User 2' },
//     { value: 'user3@example.com', label: 'User 3' },
// ]

const MailEditor = () => {
    const { mail, messageDialog, toggleMessageDialog } = useMailStore()

    const [formSubmitting, setFormSubmitting] = useState(false)

    const { data } = useQuery(getCredentials)

    const [ids , setIds] = useState<any>([])

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FormSchema>({
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if(data){
            data.getCredentials.map((item:any) => {
                setIds([...ids, {value: item.id, label: item.id}])
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (messageDialog.mode === 'reply') {
            reset({
                to: mail.from,
                title: `Re:${mail.title}`,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageDialog.mode])

    const handleDialogClose = () => {
        toggleMessageDialog({
            mode: '',
            open: false,
        })
        reset({
            to: '',
            title: '',
            content: '',
        })
    }

    const onSubmit = async (value: FormSchema) => {
        console.log('values', value)
        setFormSubmitting(true)

        await client.mutate({
            mutation: CREATE_NOTIFICATION,
            variables: {
                createNotificationInput: {
                    title: value.title,
                    content: value.content,
                    active : true,
                    to: ids,
                },
            },
        }).then((res) => {
                setFormSubmitting(false)
           res.data.createNotification && toast.push(<Notification type="success">
                Notification sent successfully
            </Notification>, {
                placement: 'top-center',
            })

            res.errors && toast.push(<Notification type="danger">
                Error sending notification
            </Notification>, {
                placement: 'top-center',
            })
        }
        ).catch((err) => {
            toast.push(<Notification type="danger">
                Error sending notification  {err}
            </Notification>, {
                placement: 'top-center',
            })
            setFormSubmitting(false)
        })

        
        setFormSubmitting(false)
        handleDialogClose()
    }

    return (
        <Dialog
            isOpen={messageDialog.open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h4 className="mb-4">
                {messageDialog.mode === 'new' && 'New Notification'}
                {messageDialog.mode === 'reply' && 'Reply to Notification'}
            </h4>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="max-h-[calc(80vh-100px)] overflow-auto p-2"
            >
                <FormItem
                    label="Title:"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                autoComplete="off"
                                placeholder="Add a subject"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {/* <FormItem
                    label="To:"
                    invalid={Boolean(errors.to)}
                    errorMessage={errors.to?.message}
                >
                    <Controller
                        name="to"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            options={options}
                            placeholder="Select recipient"
                            onChange={(option) => field.onChange(option?.value)} // Update value on change
                            onBlur={field.onBlur}
                            value={options.find((option) => option.value === field.value)} // Maintain selected value
                        />
                        )}
                    />
                </FormItem> */}
                <FormItem
                    label="Message"
                    invalid={Boolean(errors.content)}
                    errorMessage={errors.content?.message}
                >
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <RichTextEditor
                                content={field.value}
                                invalid={Boolean(errors.content)}
                                onChange={({ html }) => {
                                    field.onChange(html)
                                }}
                                
                            />
                        )}
                    />
                </FormItem>
                <div className="text-right mt-4">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        type="button"
                        onClick={handleDialogClose}
                    >
                        Discard
                    </Button>
                    <Button
                        variant="solid"
                        loading={formSubmitting}
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </Form>
        </Dialog>
    )
}

export default MailEditor
