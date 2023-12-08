import { type Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create: ({ name, description }: ICreateSpecificationDTO) => void;
  findByName: (name: string) => Specification | undefined;
}

export type { ISpecificationsRepository, ICreateSpecificationDTO };
