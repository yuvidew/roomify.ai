import { client } from "@/lib/rpc"
import { ExtractRoom } from "@/types/type"

type HomeDetailsListResponse = {
    total: number
    documents: unknown[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null

const isErrorResponse = (value: unknown): value is { message: string } =>
    isRecord(value) && typeof value.message === "string"

const isListResponse = (value: unknown): value is HomeDetailsListResponse =>
    isRecord(value) && typeof value.total === "number" && Array.isArray(value.documents)

const isExtractRoom = (value: unknown): value is ExtractRoom => {
    if (!isRecord(value)) {
        return false
    }

    return (
        typeof value["$id"] === "string" &&
        typeof value["home_title"] === "string" &&
        typeof value["img_url"] === "string" &&
        typeof value["user_id"] === "string"
    )
}

export const onGetHomeDetails = async (id: string): Promise<ExtractRoom | null> => {
    const response = await client.api.documents["home-details"][":id"].$get({
        param: { id },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch rooms.")
    }

    const json: unknown = await response.json()

    if (isErrorResponse(json)) {
        throw new Error(json.message)
    }

    if (isListResponse(json)) {
        const [first] = json.documents
        return isExtractRoom(first) ? first : null
    }

    return isExtractRoom(json) ? json : null
}
