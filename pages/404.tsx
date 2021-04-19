import {useRouter} from "next/router";
import {UnsecuredApp} from "../components/App";

export default function NotFound() {
    const router = useRouter()

    function goBack() {
        router.back()
    }

    return (
        <UnsecuredApp>
            <main className="flex-grow flex flex-col space-y-8 justify-center min-h-screen items-center text-blueGray-400">
                <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M165.5 180V241C165.5 245.199 162.201 248.5 158 248.5H98C93.7988 248.5 90.5 245.199 90.5 241V180C90.5 175.799 93.7988 172.5 98 172.5H158C162.201 172.5 165.5 175.799 165.5 180Z" fill="#CBD5E1" />
                    <path d="M165.5 180V241C165.5 245.199 162.201 248.5 158 248.5H128V172.5H158C162.201 172.5 165.5 175.799 165.5 180Z" fill="#94A3B8" />
                    <path d="M195.5 248.5C195.5 252.699 192.201 256 188 256H68C63.7988 256 60.5 252.699 60.5 248.5C60.5 244.299 63.7988 241 68 241H188C192.201 241 195.5 244.299 195.5 248.5Z" fill="#F1F5F9" />
                    <path d="M195.5 248.5C195.5 252.699 192.201 256 188 256H128V241H188C192.201 241 195.5 244.299 195.5 248.5Z" fill="#CBD5E1" />
                    <path d="M256 127.5V187.5C256 191.699 252.701 195 248.5 195H7.5C3.29883 195 0 191.699 0 187.5V127.5C1.51758 127.416 136.502 119.98 128 120.449L256 127.5Z" fill="#F1F5F9" />
                    <path d="M256 127.5V187.5C256 191.699 252.701 195 248.5 195H128V120.449L256 127.5Z" fill="#CBD5E1" />
                    <path d="M248.5 0H7.5C3.29883 0 0 3.29883 0 7.5V127.5H256V7.5C256 3.29883 252.701 0 248.5 0Z" fill="#07485E" />
                    <path d="M248.5 0H128V127.5H256V7.5C256 3.29883 252.701 0 248.5 0Z" fill="#1E293B" />
                    <path d="M150.5 157.5C150.5 161.699 147.201 165 143 165H113C108.799 165 105.5 161.699 105.5 157.5C105.5 153.299 108.799 150 113 150H143C147.201 150 150.5 153.299 150.5 157.5Z" fill="#CBD5E1" />
                    <path d="M150.5 157.5C150.5 161.699 147.201 165 143 165H128V150H143C147.201 150 150.5 153.299 150.5 157.5Z" fill="#94A3B8" />
                    <path d="M83 45C78.8555 45 75.5 48.3555 75.5 52.5V60H60.5V37.5C60.5 33.3555 57.1445 30 53 30C48.8555 30 45.5 33.3555 45.5 37.5V67.5C45.5 71.6445 48.8555 75 53 75H75.5V97.5C75.5 101.645 78.8555 105 83 105C87.1445 105 90.5 101.645 90.5 97.5V52.5C90.5 48.3555 87.1445 45 83 45Z" fill="#F1F5F9" />
                    <path d="M210.5 52.5V97.5C210.5 101.699 207.201 105 203 105C198.799 105 195.5 101.699 195.5 97.5V75H173C168.799 75 165.5 71.6992 165.5 67.5V37.5C165.5 33.2988 168.799 30 173 30C177.201 30 180.5 33.2988 180.5 37.5V60H195.5V52.5C195.5 48.2988 198.799 45 203 45C207.201 45 210.5 48.2988 210.5 52.5Z" fill="#CBD5E1" />
                    <path d="M143 30H113C108.799 30 105.5 33.2988 105.5 37.5V97.5C105.5 101.699 108.799 105 113 105H143C147.201 105 150.5 101.699 150.5 97.5V37.5C150.5 33.2988 147.201 30 143 30ZM135.5 90H120.5V45H135.5V90Z" fill="#F1F5F9" />
                    <path d="M150.5 37.5V97.5C150.5 101.699 147.201 105 143 105H128V90H135.5V45H128V30H143C147.201 30 150.5 33.2988 150.5 37.5Z" fill="#CBD5E1" />
                </svg>
                <h1 className="text-6xl font-bold text-blueGray-400">Page Not Found</h1>
                <a onClick={goBack} className="cursor-pointer border-b pb-0.5 border-blueGray-600">Go Back</a>
            </main>
        </UnsecuredApp>
    )
}