import React from 'react'
import { basePath } from '../api-hooks'
import { StockAnalysis2, StockAnalysisPublicationControllerApi } from '../client'
import { UnsecuredApp } from '../components/App'
import { Browse } from '../components/Pages/Browse/Browse'

function BrowsePage() {
    return (
        <UnsecuredApp>
            <Browse  />
        </UnsecuredApp>
    )
}

export default BrowsePage
