import React from 'react'
import {basePath} from '../../../api-hooks'
import {PublishedStockAnalysisControllerApi, StockAnalysis2} from '../../../client'
import {UnsecuredApp} from '../../../components/App'
import {Narrative} from '../../../components/Pages/PublishedStockAnalysesNarrative'

interface Props {
    stockAnalysis: StockAnalysis2
}

export default function NarrativePage(props: Props) {
    return (
        <UnsecuredApp>
            <Narrative result={props.stockAnalysis} />
        </UnsecuredApp>
    )
}

NarrativePage.getInitialProps = async (ctx) => {
    const stockAnalyzer = new PublishedStockAnalysisControllerApi(null, basePath);
    const { data: stockAnalysis } = await stockAnalyzer.getPublishedStockAnalysis(ctx.query.id)
    return { stockAnalysis: stockAnalysis }
}
