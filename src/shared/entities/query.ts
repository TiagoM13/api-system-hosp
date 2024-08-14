export enum QueryType {
    QUERY = "query",
    OTHER = "other",
    ACCIDENT = "accident",
    FIREARM_INJURY = "firearm injury",
    WHITE_WEAPON_INJURY = "white weapon injury"
}

export type IQuery = {
    id?: number
    public_id?: string
    type_query: string
    exam?: string | null
    diagnosis?: string | null
    created_at?: Date
    updated_at?: Date
    patient_id: string
}