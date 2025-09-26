import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    })

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client })
    
    // Get all courses for the user
    const coursesResponse = await classroom.courses.list()
    const courses = coursesResponse.data.courses || []

    const allAssignments = []

    // Get assignments for each course
    for (const course of courses) {
      try {
        const courseworkResponse = await classroom.courses.courseWork.list({
          courseId: course.id!,
        })
        
        const assignments = courseworkResponse.data.courseWork || []
        
        for (const assignment of assignments) {
          // Get submission status
          const submissionsResponse = await classroom.courses.courseWork.studentSubmissions.list({
            courseId: course.id!,
            courseWorkId: assignment.id!,
            userId: 'me',
          })
          
          const submission = submissionsResponse.data.studentSubmissions?.[0]
          
          allAssignments.push({
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            dueTime: assignment.dueTime,
            courseName: course.name,
            courseId: course.id,
            status: submission?.state || 'NOT_TURNED_IN',
            submissionId: submission?.id,
            creationTime: assignment.creationTime,
            updateTime: assignment.updateTime,
          })
        }
      } catch (courseError) {
        console.error(`Error fetching assignments for course ${course.id}:`, courseError)
      }
    }

    return NextResponse.json({ assignments: allAssignments })
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    )
  }
}