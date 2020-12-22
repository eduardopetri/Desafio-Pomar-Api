import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import TreesGroup from '../models/TreesGroup';

export default class TreesGroupsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<TreesGroup>> {
    const { name, description } = request.body;
    const treesGroupRepository = getRepository(TreesGroup);

    const treeGroup = treesGroupRepository.create({ name, description });

    await treesGroupRepository.save(treeGroup);

    return response.json(treeGroup);
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<TreesGroup>> {
    const treesGroupsRepository = getRepository(TreesGroup);

    const treesGroups = await treesGroupsRepository.find();

    return response.json(treesGroups);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<TreesGroup>> {
    const { id } = request.params;
    const { name, description } = request.body;
    const treesGroupRepository = getRepository(TreesGroup);

    const treeGroup = await treesGroupRepository.findOne(id);

    const newTreeGroup = {
      ...treeGroup,
      name,
      description,
    };

    await treesGroupRepository.save(newTreeGroup);

    return response.json(newTreeGroup);
  }
}
