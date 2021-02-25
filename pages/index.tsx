import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { App } from '../components/App'
import { ModelEditor } from '../components/ModelEditor/ModelEditor'

export default function Home() {
  return (
    <App>
      <ModelEditor />
    </App>
  )
}
