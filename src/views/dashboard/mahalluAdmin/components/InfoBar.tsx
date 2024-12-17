import { COUNT_FAMILIES } from '@/graphql/queries/family'
import { COUNT_MAHALLUS, FIND_MAHALLU_BY_ID } from '@/graphql/queries/mahallu'
import { COUNT_MEMBERS } from '@/graphql/queries/member'
import { COUNT_TASKS } from '@/graphql/queries/task'
import { COUNT_TASK_PARTICIPANTS } from '@/graphql/queries/task-participant'
import { useSessionUser } from '@/store/authStore'
import { useQuery } from '@apollo/client'
import React from 'react'
import { PiCheckFatDuotone, PiInfinityDuotone, PiUserDuotone, PiUsersFourDuotone } from 'react-icons/pi'

const InfoBar = () => {
  const { user } = useSessionUser((state) => state)

  const { data: families, error: familiesError, loading: familiesLoading } = useQuery(COUNT_FAMILIES, {
    variables: {
      relationsToFilter: {},
      filters: {},
    },
  })

  const { data: tasks, error: tasksError, loading: tasksLoading } = useQuery(COUNT_TASKS, {
    variables: {
      relationsToFilter: {},
      filters: {},
    },
  })

  const { data: taskParticipants, error: taskParticipantsError, loading: taskParticipantsLoading } = useQuery(COUNT_TASK_PARTICIPANTS, {
    variables: {
      relationsToFilter: {},
      filters: {},
    },
  })

  const { data: members, error: membersError, loading: membersLoading } = useQuery(COUNT_MEMBERS, {
    variables: {
      relationsToFilter: {},
      filters: {},
    },
  })

  const { data: singleMahallu, error: singleMahalluError, loading: singleMahalluLoading } = useQuery(FIND_MAHALLU_BY_ID, {
    variables: {
      id: user?.mahalluId
    }
  })

  return (
    <div className='mb-6'>
      {
        familiesLoading || tasksLoading || taskParticipantsLoading || membersLoading || singleMahalluLoading ? (
          <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400 animate-pulse">
            {/* Card 1 */}
            <div className="relative pt-8 pb-4 md:py-6 px-8">
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-64 bg-gray-300 rounded"></div>
            </div>

            {/* Card 2 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-gray-300 w-20 h-20"></div>
              <div className="flex items-start justify-center flex-col">
                <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
              </div>
              {/* Vertical line */}
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-300 lg:block md:block hidden"></div>
            </div>

            {/* Card 3 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-gray-300 w-20 h-20"></div>
              <div className="flex items-start justify-center flex-col">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-28 bg-gray-300 rounded"></div>
              </div>
              {/* Vertical and horizontal lines */}
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-300 lg:block md:block hidden"></div>
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-300 block md:hidden"></div>
            </div>

            {/* Card 4 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-gray-300 w-20 h-20"></div>
              <div className="flex items-start justify-center flex-col">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-28 bg-gray-300 rounded"></div>
              </div>
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-300 block md:hidden"></div>
            </div>
          </div>
        ) : familiesError || tasksError || taskParticipantsError || membersError || singleMahalluError ? (
          <div className="w-full h-28 relative bg-neutral rounded-3xl  border border-gray-400 flex justify-center items-center">
            <p className='text-lg'>{familiesError?.message || tasksError?.message || taskParticipantsError?.message || membersError?.message || singleMahalluError?.message}</p>
          </div>
        ) : (
          <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400">
            {/* Card 1 */}
            <div className="relative pt-8 pb-4 md:py-6 px-8">
              <p className="text-md">Assalamu Alaikum,</p>
              <p className="text-2xl text-gray-950">
                {singleMahallu?.mahallu?.name} MAHALLU
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-[#E7FFCD] w-20 h-20 items-center justify-center flex">
                <PiUsersFourDuotone className='w-14 h-14' />
              </div>
              <div className="flex items-start justify-center flex-col">
                <p className="text-xs">Total Families</p>
                <p className="text-3xl text-gray-950 font-medium">
                  {families?.countFamily}
                </p>
              </div>
              {/* Vertical line */}
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
            </div>

            {/* Card 3 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-[#FFF7CD] w-20 h-20 items-center justify-center flex">
                <PiCheckFatDuotone className='w-14 h-14' />
              </div>
              <div className="flex items-start justify-center flex-col">
                <p className="text-xs">Total Tasks Completed</p>
                <p className="text-3xl text-gray-950 font-medium">
                  {taskParticipants?.countTaskParticipant} <span className='text-base'>of</span> {tasks?.countTask}
                </p>
              </div>
              {/* Vertical line */}
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
            </div>

            {/* Card 4 */}
            <div className="relative py-6 px-4 flex gap-4">
              <div className="rounded-full bg-[#CDDBFF] w-20 h-20 items-center justify-center flex">
                <PiInfinityDuotone className='w-14 h-14' />
              </div>
              <div className="flex items-start justify-center flex-col">
                <p className="text-xs">Total Points</p>
                <p className="text-3xl text-gray-950 font-medium">{singleMahallu?.mahallu?.totalPoints}</p>
              </div>
              <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default InfoBar
