import React from 'react'
import { basePath } from '../api-hooks'
import { StockAnalysis2, StockAnalysisPublicationControllerApi } from '../client'
import { UnsecuredApp } from '../components/App'
import { Browse } from '../components/Pages/Browse/Browse'

interface Props {
    stockAnalyses: StockAnalysis2[]
}

function BrowsePage(props: Props) {

    const { stockAnalyses } = props

    return (
        <UnsecuredApp>
            <Browse stockAnalyses={stockAnalyses} />
        </UnsecuredApp>
    )
}

BrowsePage.getInitialProps = async () => {
    const stockAnalyzer = new StockAnalysisPublicationControllerApi(null, basePath);
    const { data } = await stockAnalyzer.findPublishedStockAnalyses()
    return { stockAnalyses: data }
}

export default BrowsePage
