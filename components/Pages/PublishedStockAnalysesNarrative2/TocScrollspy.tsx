import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import Scrollspy from "react-scrollspy";
import {StockAnalysis2} from "../../../client";
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon, RedditShareButton, RedditIcon, WeiboIcon, WeiboShareButton, EmailIcon, EmailShareButton
} from 'react-share'
import {TryDifferentAssumptions} from "./TryDifferentAssumptions/TryDifferentAssumptions";

interface Props {
    stockAnalysis:StockAnalysis2
}

export function TocScrollspy({stockAnalysis}: Props) {

    const {ticker, model: {periods}} = stockAnalysis
    const [href, setHref] = useState<string>()
    useEffect(() => {
        setHref(window.location.href)
    }, [])
    return (
        <nav className="hidden lg:block fixed top-12 w-64 right-0 py-4 text-blueGray-200 bg-blueGray-800 shadow-md rounded text-sm">
            <Scrollspy
                items={['overview', 'summary', 'business-breakdown', 'future-earnings-per-share', 'terminal-value-calculation', 'fair-value-derivation']}
                currentClassName={'bg-blue-500 font-bold'}
            >
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#overview">
                    Overview
                </a>
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#summary">
                    Summary
                </a>
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#business-breakdown">
                    Business Breakdown
                </a>
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#future-earnings-per-share">
                    Future Earnings Per Share
                </a>
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#terminal-value-calculation">
                    {ticker}'s Price in {periods} Years
                </a>
                <a className="hover:bg-blue-500 transition ease-in px-4 py-1 block" href="#fair-value-derivation">
                    How to Derive Fair Value?
                </a>
            </Scrollspy>
            <div className="border-t border-blueGray-500 pt-4 mt-4">
                <TryDifferentAssumptions stockAnalysis={stockAnalysis}/>
                <div className="flex space-x-2 items-center justify-center mt-4 px-2">
                    <FacebookShareButton
                        className="focus:outline-none"
                        url={href}
                        quote={`Step-by-step stock valuation for ${ticker}`}
                        hashtag={ticker}
                    >
                        <FacebookIcon size={32} round/>
                    </FacebookShareButton>
                    <LinkedinShareButton
                        className="focus:outline-none"
                        title={`Step-by-step stock valuation for ${ticker}`}
                        url={href}
                    >
                        <LinkedinIcon size={32} round/>
                    </LinkedinShareButton>
                    <TwitterShareButton
                        className="focus:outline-none"
                        title={`Step-by-step stock valuation for ${ticker}`}
                        hashtags={[ticker]}
                        url={href}
                    >
                        <TwitterIcon size={32} round/>
                    </TwitterShareButton>
                    <RedditShareButton
                        className="focus:outline-none"
                        title={`Step-by-step stock valuation for ${ticker}`}
                        url={href}
                    >
                        <RedditIcon size={32} round/>
                    </RedditShareButton>
                    <WeiboShareButton
                        className="focus:outline-none"
                        url={href}
                    >
                        <WeiboIcon size={32} round/>
                    </WeiboShareButton>
                    <EmailShareButton
                        className="focus:outline-none"
                        url={href}
                    >
                        <EmailIcon size={32} round/>
                    </EmailShareButton>
                </div>
            </div>
        </nav>
    );
}