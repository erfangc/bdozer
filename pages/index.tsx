import { useRouter } from 'next/router'
import React from 'react'
import { App } from '../components/App'
import { Search } from '../components/Mvp/Search'

export default function Home() {
  const router = useRouter()

  function navigate(cik: string) {
    router.push(`/${cik}/narrative2`)
  }

  return (
    <App>
      <Search onSubmit={navigate} />
    </App>
  )
}
