import { useRouter } from "next/router";
import { App } from "../../components/App";

export default function ModelBuilder() {
    const router = useRouter()
    const { _id } = router.query
    return (
        <App>
        </App>
    )
}