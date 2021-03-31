import React from "react";
import { basePath } from "../../api-hooks";
import { StockAnalysis, StockAnalyzerFactoryControllerApi } from "../../client";
import { UnsecuredApp } from "../../components/App";
import { Narrative2 } from "../../components/Pages/Narrative2/Narrative2";

interface Props {
    stockAnalysis: StockAnalysis
}

function NarativePage(props: Props) {
    return (
        <UnsecuredApp>
            <Narrative2 result={props.stockAnalysis} />
        </UnsecuredApp>
    )
}

NarativePage.getInitialProps = async (ctx) => {
    const stockAnalyzer = new StockAnalyzerFactoryControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getAnalysis(ctx.query.cik)
    return { stockAnalysis: data }
}

export default NarativePage