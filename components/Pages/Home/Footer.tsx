import React from 'react';
import { Logo } from './Logo';

export function Footer() {
    return (
        <footer className="bg-chili-100 text-white">
            <div className="container flex flex-col lg:flex-row justify-center py-16">
                <Logo />
                <div className="mx-10 lg:mr-0 lg:ml-20 lg:w-1/2">
                    <h5 className="label-small">LEGAL DISCLAIMER</h5>
                    <p className="label-micro">
                        The information contained on this website and the resources available for download through this website is not intended as, and shall not be understood or construed as, financial advice. The information contained on this website is not a substitute for financial advice from a professional who is aware of the facts and circumstances of your individual situation We have done our best to ensure that the information provided on this website and the resources available for download are accurate and provide valuable information. We expressly recommend that you conduct your own due diligence and analysis or seek advice from a professional
                    </p>
                </div>
            </div>
        </footer>
    )
}
