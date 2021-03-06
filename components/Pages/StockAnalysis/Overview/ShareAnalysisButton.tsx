import {Button} from "../../../Common/Button";
import React, {useEffect, useRef, useState} from "react";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton,
    WeiboIcon,
    WeiboShareButton
} from "react-share";
import {StockAnalysis2} from "../../../../client";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function ShareAnalysisButton({stockAnalysis}: Props) {

    const {ticker} = stockAnalysis;
    const [href, setHref] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHref(window.location.href);
    }, []);

    // register a click outside handler
    useEffect(() => {
        const body = document.body;
        const clickOutsideHandler = ev => {
            if (!ref?.current.contains(ev.target) && open) {
                setOpen(false);
            }
        };
        body.addEventListener('click', clickOutsideHandler);
        return () => body.removeEventListener('click', clickOutsideHandler);
    }, [setOpen, ref, open]);

    // register the escape key to close the button
    useEffect(() => {
        const escapeKeyListener = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape' && open) {
                setOpen(false);
            }
        };
        document.addEventListener('keyup', escapeKeyListener);
        return () => document.removeEventListener('keyup', escapeKeyListener);
    }, [open, setOpen]);

    return (
        <Button
            className="w-8 flex justify-center items-center relative focus:outline-none"
            onClick={() => setOpen(!open)}
            ref={ref}
        >
            <ShareIcon/>
            <div
                className={`absolute top-9 bg-dashboardGray-25 p-2 shadow-lg rounded flex-col space-y-2 items-center justify-center ${open ? 'flex' : 'hidden'}`}
            >
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
        </Button>
    )
}

function ShareIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 10.7234C11.4933 10.7234 11.0367 10.92 10.69 11.2367L5.94 8.46668C5.97667 8.31668 6 8.16002 6 8.00002C6 7.84002 5.97667 7.68335 5.94 7.53335L10.64 4.79002C10.9967 5.12335 11.4733 5.33002 12 5.33002C13.1033 5.33002 14 4.43335 14 3.33002C14 2.22668 13.1033 1.33002 12 1.33002C10.8967 1.33002 10 2.22668 10 3.33002C10 3.49002 10.0233 3.64668 10.06 3.79668L5.36 6.54002C5.00333 6.20668 4.52667 6.00002 4 6.00002C2.89667 6.00002 2 6.89668 2 8.00002C2 9.10335 2.89667 10 4 10C4.52667 10 5.00333 9.79335 5.36 9.46002L10.11 12.23C10.0767 12.37 10.0567 12.5167 10.0567 12.6667C10.0567 13.74 10.9267 14.61 12 14.61C13.0733 14.61 13.9433 13.74 13.9433 12.6667C13.9433 11.5934 13.0733 10.7234 12 10.7234Z"
                fill="#0B1E33"
            />
        </svg>
    );
}