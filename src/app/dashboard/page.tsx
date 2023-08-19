import { getAuthSession } from '@/lib/nextauth'
import React from 'react'
import { redirect } from 'next/navigation'
import QuizMeCard from '@/components/dashboard/QuizMeCard'
import HistoryCard from '@/components/dashboard/HistoryCard'
import HotTopicsCard from '../../components/dashboard/HotTopicsCard'
import RecentActivities from '../../components/dashboard/RecentActivities'
import DetailsDialog from '@/components/DetailsDialog'

export const metadata = {
    title: 'QuizBraniac',
}

const Dashboard = async () => {
  // This code is checking for a valid user session before allowing access to a page or route
  const session = await getAuthSession() 
  if (!session?.user) {
    return redirect('/')
  }
    return (
      // mx-auto - Sets margin auto on left and right to horizontally center.
      <main className='p-8 mx-auto max-w-7xl'>
          {/* vertically center children elements within a flex container */}
          <div className='flex items-center'>
            <h2 className='mr-3 text-3xl font-bold tracking-tight'>Dashboard</h2>
            <DetailsDialog />
          </div>
          
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <QuizMeCard />
            <HistoryCard />
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
            <HotTopicsCard />
            <RecentActivities />
          </div>
      </main>
  )
}

export default Dashboard