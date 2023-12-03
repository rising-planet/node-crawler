import { ProductEntity } from "../entity/gs/product";
import { AppDataSource } from "../data-source";

const repo = AppDataSource.getRepository(ProductEntity);

export const createRemoteCategoryInstance = (params) => {
  return repo.create(params);
};

export const saveRemoteCategory = async (instances) => {
  return repo.save(instances);
};
