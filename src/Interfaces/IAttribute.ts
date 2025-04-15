export interface IAttribute {
  attributeId: number;
  name: string;
  description: string;
  createAt: string;
  updatedAt: string;
  creatorName?: string;
  updaterName?: string;
}

export interface ICreator {
  fullName?: string;
}

export interface IAddAttributeRequest {
  attributeName: string;
  attributeDescription?: string;
}
