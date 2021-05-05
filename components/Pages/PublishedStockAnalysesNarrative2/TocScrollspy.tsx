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
        <nav className="hidden lg:block fixed top-16 w-64 -ml-64 py-4 text-blueGray-200 z-10 bg-blueGray-800 shadow-md rounded">
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
                    How Fair Value is Derived?
                </a>
            </Scrollspy>
            <div className="border-t border-blueGray-500 pt-4 mt-4">
                <Link href={`/control-panel/stock-analyses/${stockAnalysis['_id']}`}>
                    <a className="hover:bg-blue-500 transition ease-in px-4 py-1 rounded border mx-2 border-blueGray-600 block text-sm flex justify-center items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="#CBD5E1" />
                        </svg>
                        <span className="pl-2">
                            Try Different Assumptions
                        </span>
                    </a>
                </Link>
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