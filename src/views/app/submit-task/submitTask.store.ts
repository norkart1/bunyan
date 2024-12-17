import { create } from 'zustand'

type SubmitTaskState = {
    files: File[]
}

type SubmitTaskActions = {
    setFiles: (files: File[]) => void
}

const initialState: SubmitTaskState = {
    files: []
}

export const useSubmitTaskStore = create<SubmitTaskState & SubmitTaskActions>(
    (set) => ({
        ...initialState,
        setFiles: (files) => set(() => ({ files }))
    })
)