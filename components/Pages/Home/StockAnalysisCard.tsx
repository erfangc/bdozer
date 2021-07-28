import React from 'react'

export function StockAnalysisCard() {
    return (
        <div className="bg-navy-100 rounded-lg px-5 py-4 space-y-2 w-72">
            <div className="flex items-center space-x-2">
                <span className="text-lime-100 heading5">TGT</span>
                <span className="label-small text-lightGreen-25">Target Corp</span>
            </div>
            <div>
                <div className="flex space-x-8">
                    <div>
                        <label className="label-micro text-lightGreen-25">Fair Value</label>
                        <p className="numbers-bold text-lightGreen-25">$162.20</p>
                    </div>
                    <div>
                        <label className="label-micro text-lightGreen-25">Current Price</label>
                        <p className="numbers-bold text-lightGreen-25">$100.20</p>
                    </div>
                </div>
                <hr className="border-navy-75" />
            </div>
            <p className="text-lime-100">
                +95.8% Upside
            </p>
        </div>
    );
}