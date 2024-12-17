import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/'
import Tooltip from '@/components/ui/Tooltip'
import { FaSuitcaseRolling } from 'react-icons/fa6'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FaChevronRight, FaHandsHelping, FaTags } from 'react-icons/fa'
import { PiWebcamBold } from 'react-icons/pi'
import { BiBadge, BiTrophy } from 'react-icons/bi'
import Ranking from './Ranking'
import { useQuery } from '@apollo/client'
import { FIND_MAHALLU_BY_ID } from '@/graphql/queries/mahallu'
import { useEffect, useState } from 'react'
import { Mahallu } from '@/generated/graphql'
import { Tag } from '@/components/ui'

type MahalluInfoFieldProps = {
    title?: string
    value?: string
}

const MahalluInfoField = ({ title, value }: MahalluInfoFieldProps) => {
    return (
        <div>
            <span className="">{title}</span>
            <p className="heading-text font-semibold ">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data = {} }: any) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const params = useParams()

    const tab = searchParams.get('tab')
    const [mahalluData, setMahalluData] = useState<Mahallu | null>(null)
    const {
        data: mahallu,
        error: mahalluError,
        loading: mahalluLoading,
    } = useQuery(FIND_MAHALLU_BY_ID, {
        variables: {
            id: parseInt(params.id as string),
        },
    })

    useEffect(() => {
        if (mahallu) {
            setMahalluData(mahallu?.mahallu)
        }
    }, [mahallu])

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Avatar.Group
                    chained
                    className="flex"
                    maxCount={2}
                    omittedAvatarProps={{
                        shape: 'circle',
                        size: 34,
                        className: 'bg-slate-200 text-slate-800',
                    }}
                    omittedAvatarTooltip
                    onOmittedAvatarClick={() =>
                        console.log('Omitted Avatar Clicked')
                    }
                >
                    {
                        mahalluData?.badges?.map((badge) => (
                            <Avatar size={34} src={badge.icon as string} />
                        ))
                    }
                </Avatar.Group>
            </div>
            {/* Details Section */}
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                {/* Image and Name */}
                <div className="flex xl:flex-col items-center xl:items-start justify-start w-full gap-2">
                    {/* <Avatar size={130} shape="circle" src={data.img} /> */}
                    <div className="flex flex-col">
                        <Tag className='flex bg-primary-mild w-1/3 justify-center'>
                            <p className='text-white'>{mahalluData?.regNo}</p>
                        </Tag>
                        <h4 className="font-bold text-2xl">
                            {mahalluData?.name} MAHALLU
                        </h4>
                    </div>
                </div>
                {/* Other Details */}
                <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-y-2 gap-x-4 mt-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4">
                            <MahalluInfoField
                                title="Location"
                                value={mahalluData?.place as string}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={mahalluData?.contact as string}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <MahalluInfoField
                                title="Village"
                                value={mahalluData?.village?.name as string}
                            />
                            <MahalluInfoField
                                title="Pincode"
                                value={mahalluData?.pinCode as string}
                            />
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-slate-200 mt-2" />

                    {/* <div className="flex gap-8 mt-4">
                        <div className="flex flex-col gap-2">
                            <MahalluInfoField
                                title="President"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Secretary"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Treasurer"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Khatheeb"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="President"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Secretary"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Treasurer"
                                value={data.nameID}
                            />
                            <MahalluInfoField
                                title="Khatheeb"
                                value={data.nameID}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                            <MahalluInfoField
                                title="Phone"
                                value={data.personalInfo?.phoneNumber}
                            />
                        </div>
                    </div> */}

                    <Card className="bg-white  border transform transition-all duration-300">
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2 ">
                            <BiTrophy className="h-6 w-6" />
                            Total Points
                        </h3>
                        <p className="text-4xl font-bold">
                            {mahalluData?.totalPoints}
                        </p>
                    </Card>
                    <div className="h-[1px] w-full bg-slate-200 mt-2" />

                    <Ranking />

                    {/* <div className="h-[1px] w-full bg-slate-200 mt-2" />

                    <Button className="mt-2" variant="solid">
                        View Committee
                    </Button> */}
                </div>
            </div>
        </Card>
    )
}

export default ProfileSection
