export interface PackageType {
  id: string,
  name: string,
}

export interface Package {
  id: string,
  name: string,
  price: number,
  image: string,
  description: string,
  conditions?: string[],
  type: PackageType,
}