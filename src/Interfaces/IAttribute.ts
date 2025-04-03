export interface IAttribute {
    attributeId: number
    name: string
    description: string
    createAt: Date | string
    updatedAt: string
    creatorName?: string
    updaterName?: string
}

export interface ICreator {
    fullName?: string
}