export type IPatient = {
    id?: string
    name: string
    birth_date: Date
    sex: string // add enum
    cpf?: string | null
    cnes?: string | null
    address?: string | null
    mother_name?: string | null
    father_name?: string | null
    material_status?: string | null // add enum
    occupation?: string | null

    created_at?: Date
    updated_at?: Date
    // queries: IQuery[]
    // health_agent?: String
    // chronic_disease?: String
}

