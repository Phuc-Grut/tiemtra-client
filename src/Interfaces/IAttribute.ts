export interface IAttribute {
    attributeId: number
    name: string
    description: string
    creator?: ICreator
    createAt: Date | string
    updatedAt: string
}

export interface ICreator {
    fullName?: string
}