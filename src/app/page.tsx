'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BookOpen, Calendar, Clock, User, LogOut, Bell, Brain } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()
  const [assignments, setAssignments] = useState([])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <BookOpen className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Classroom AI
            </h1>
            <p className="text-gray-600 mb-8">
              Smart Assignment Assistant powered by AI
            </p>
            <button
              onClick={() => signIn('google')}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Classroom AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-600" />
              <Brain className="h-6 w-6 text-indigo-600" />
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Assignment Dashboard
          </h2>
          <p className="text-gray-600">
            Track your assignments and get AI-powered assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Pending Assignments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Missing Assignments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Completed Assignments</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Assignments
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Connect to Google Classroom to view your assignments
              </p>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
                Sync Assignments
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}