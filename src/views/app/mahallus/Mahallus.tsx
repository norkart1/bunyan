import { DebouceInput } from "@/components/shared"
import { Button, Card, Skeleton, Tag } from "@/components/ui"
import { Mahallu } from "@/generated/graphql"
import { FIND_ALL_MAHALLUS } from "@/graphql/queries/mahallu"
import { useSessionUser } from "@/store/authStore"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { CgEye } from "react-icons/cg"
import { useNavigate } from "react-router-dom"

export default function Mahallus() {
    const navigate = useNavigate()
    const user = useSessionUser((state) => state.user)
    const [mahallus, setMahallus] = useState<Mahallu[]>([])
    const [search, setSearch] = useState<string>('')
    const filters = user?.districtId ? {
        name: { contains: search, mode: 'insensitive' },
        village: {
            zone: {
                districtId: user.districtId
            }
        }
    } : user?.zoneId ? {
        name: { contains: search, mode: 'insensitive' },
        village: {
            zoneId: user.zoneId
        }
    } : user?.villageId ? {
        name: { contains: search, mode: 'insensitive' },
        villageId: user.villageId
    } : {
        name: { contains: search, mode: 'insensitive' }
    }

    const { data, loading, error } = useQuery(FIND_ALL_MAHALLUS, {
        variables: {
            filters,
            limit: 39,
            offset: 0,
            orderBy: {},
            relationsToFilter: {}
        }
    })

    useEffect(() => {
        if (data) {
            setMahallus(data.mahallus)
        }
    }, [data])

    return (
        <Card className="w-full h-full">
            <h3 className="mb-4">All Mahallus</h3>
            <DebouceInput
                placeholder="Search"
                className="mb-4"
                onChange={(e) => setSearch(e.target.value)}
            />
            {
                loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div className="max-w-lg">
                                <Card className="p-2">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-5 w-32" />
                                        </div>
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <div className="flex flex-col gap-1 items-end">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : mahallus.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        mahallus?.map((mahallu) => (
                            <>
                                <div className="max-w-lg">
                                    <Card
                                        clickable
                                        className="hover:shadow-lg transition duration-150 ease-in-out"
                                        onClick={(e) => console.log('Card Clickable', e)}
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex gap-4 items-center">
                                                <Button variant="solid" size='xs'>{mahallu?.regNo}</Button>
                                                <h5>{mahallu?.name}</h5>
                                            </div>
                                            <div className="flex h-8 w-8 bg-gray-200 justify-center items-center rounded-full">
                                                <CgEye
                                                    className={`self-center cursor-pointer`}
                                                    size={20}
                                                    onClick={() =>
                                                        navigate(`/mahallu-details/${mahallu.id}`)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <p className="text-md"><span className="font-bold">Village: </span>{mahallu?.village?.name}</p>
                                            <p className="text-md"><span className="font-bold">Place: </span>{mahallu?.place}</p>
                                        </div>
                                    </Card>
                                </div>
                            </>
                        ))
                    }
                </div>
                ) : error ? (
                    <div className="w-full flex justify-center">{error?.message}</div>
                ) : (
                    <div className="w-full flex justify-center">No Mahallus Found</div>
                )
            }
        </Card>
    )
}