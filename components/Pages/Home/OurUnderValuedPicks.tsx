import React, { useState } from 'react'
import { StockAnalysisCard } from './StockAnalysisCard';

export function OurUndervaluedPicks() {
    return (
        <section className="bg-dashboardGray-100 px-32 py-16 flex flex-col justify-center items-center">
            <h3 className="heading3 text-white">Our Undervalued Picks</h3>
            {/* Card */}
            <div className="flex space-x-5 mt-8">
                <StockAnalysisCard />
                <StockAnalysisCard />
                <StockAnalysisCard />
                <StockAnalysisCard />
            </div>
        </section>
    );
}
