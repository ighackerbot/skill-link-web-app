export type UserRole = "student" | "faculty" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatarUrl?: string
  bio?: string
  courses: string[]
  skills: string[]
  learningGoals?: string
  skillPoints: number
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  name: string
  code: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category?: string
}

export interface Match {
  id: string
  userId: string
  matchedUserId: string
  score: number
  commonCourses: string[]
  complementarySkills: string[]
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

export interface Session {
  id: string
  tutorId: string
  studentId: string
  title: string
  description: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  meetingLink?: string
  createdAt: Date
}

export interface Post {
  id: string
  authorId: string
  content: string
  isAnonymous: boolean
  likes: number
  commentCount: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  isAnonymous: boolean
  likes: number
  createdAt: Date
}

export interface OfficeHours {
  id: string
  facultyId: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  capacity: number
  bookedSlots: number
  location?: string
  isVirtual: boolean
  meetingLink?: string
}

export interface Roadmap {
  id: string
  userId: string
  title: string
  goals: RoadmapGoal[]
  createdAt: Date
  updatedAt: Date
}

export interface RoadmapGoal {
  id: string
  title: string
  description?: string
  completed: boolean
  completedAt?: Date
}
