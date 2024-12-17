import { Avatar, Button, Card } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

const AiSuggestion = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full border border-gray-400 relative bg-neutral rounded-xl">
            <img
                src="/img/icons/ai-sparkle.svg"
                alt="ai-sparkle"
                className="absolute -left-[3.5rem] -top-8 z-50 w-32"
            />
            <div className="mt-6 flex gap-2 items-end p-4">
                <p className="bg-clip-text text-transparent bg-gradient-to-b from-[#874FFF]  to-[#ddcdf4] text-5xl font-bold  ">
                    AI
                </p>
                <p className="text-4xl font-bold text-gray-700">Suggests...</p>
            </div>
            <div className="my-1 flex justify-center mx-auto flex-col gap-2">
                {/* some suggests here */}
                <div className="bg-[#F9F9FF] h-12 py-2 px-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img
                            src="/img/icons/ai-icon.svg"
                            alt="ai-sparkle"
                            className="w-6 h-6"
                        />
                        <p className="text-sm">
                            Move forward with PRE MARTIAL COURSE task
                        </p>
                    </div>
                    {/* Button Go */}

                    <Button
                        onClick={() => navigate('/view-tasks')}
                        className="hover:text-[#874FFF]"
                        variant="plain"
                    >
                        Go
                    </Button>
                </div>
                <div className="bg-[#FFFFFF] h-12 py-2 px-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img
                            src="/img/icons/ai-icon.svg"
                            alt="ai-sparkle"
                            className="w-6 h-6"
                        />
                        <p className="text-sm">
                            Move forward with the current task
                        </p>
                    </div>
                    {/* Button Go */}

                    <Button
                        onClick={() => navigate('/view-tasks')}
                        className="hover:text-[#874FFF]"
                        variant="plain"
                    >
                        Go
                    </Button>
                </div>
                <div className="bg-[#F9F9FF] h-12 py-2 px-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img
                            src="/img/icons/ai-icon.svg"
                            alt="ai-sparkle"
                            className="w-6 h-6"
                        />
                        <p className="text-sm">Create more posts</p>
                    </div>
                    {/* Button Go */}

                    <Button
                        onClick={() => navigate('/post')}
                        className="hover:text-[#874FFF]"
                        variant="plain"
                    >
                        Go
                    </Button>
                </div>
                <div className="bg-[#FFFFFF] h-12 py-2 px-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img
                            src="/img/icons/ai-icon.svg"
                            alt="ai-sparkle"
                            className="w-6 h-6"
                        />
                        <p className="text-sm">
                            do സുന്ദൂഖ് (പലിശരഹിത വായ്പാനിധി)
                        </p>
                    </div>
                    {/* Button Go */}

                    <Button
                        onClick={() => navigate('/view-tasks')}
                        className="hover:text-[#874FFF]"
                        variant="plain"
                    >
                        Go
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AiSuggestion
