import { TGetClubMember, TGetFaculty, TGetMajor } from "@/app/(admin)/admin/club/_actions/types"
import { create } from 'zustand'
type GlobalState = {
    faculty: TGetFaculty[]
    allStudentClub: TGetClubMember[]
    allMajor: TGetMajor[]
}

type GlobalAction = {
    setFaculty: (faculty: TGetFaculty[]) => void;
    setAllStudentClub: (allStudentClub: TGetClubMember[]) => void;
    setAllMajor: (allMajor: TGetMajor[]) => void;
}

export const useFacultyStore = create<GlobalState & GlobalAction>((set) => ({
    faculty: [],
    setFaculty: (faculty) => set({ faculty }),
    allStudentClub: [],
    setAllStudentClub: (allStudentClub) => set({ allStudentClub }),
    allMajor: [],
    setAllMajor: (allMajor) => set({ allMajor }),
}))