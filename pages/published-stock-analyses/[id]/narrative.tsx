import React from 'react'
import { basePath } from '../../../api-hooks'
import { StockAnalysis2, StockAnalysisCrudControllerApi } from '../../../client'
import { UnsecuredApp } from '../../../components/App'
import { Narrative } from '../../../components/Pages/Narrative'

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
    const stockAnalyzer = new StockAnalysisCrudControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getStockAnalysis(ctx.query.id)
    return { stockAnalysis: data }
}
