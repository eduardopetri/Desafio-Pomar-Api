import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Tree from '../models/Tree';
import Specie from '../models/Specie';

export default class TreesController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Tree>> {
    const { description, specie, age } = request.body;
    const treesRepository = getRepository(Tree);
    const speciesRepository = getRepository(Specie);

    const specieExists = await speciesRepository.findOne({
      description: specie,
    });
    let specie_id = 0;
    if (!specieExists) {
      const newSpecie = speciesRepository.create({ description: specie });
      await speciesRepository.save(newSpecie);
      specie_id = newSpecie.id;
    } else {
      specie_id = specieExists.id;
    }

    const tree = treesRepository.create({
      description,
      age,
      specie_id,
      user_id: Number(request.user.id),
    });

    await treesRepository.save(tree);

    return response.json({ ...tree, specie: { description: specie } });
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Tree>> {
    const treesRepository = getRepository(Tree);

    const trees = await treesRepository.find({
      where: {
        user_id: Number(request.user.id),
      },
    });

    return response.json(trees);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Tree>> {
    const { id } = request.params;
    const { description, specie, age } = request.body;
    const treesRepository = getRepository(Tree);
    const speciesRepository = getRepository(Specie);

    const tree = await treesRepository.findOne({ id: Number(id) });

    if (!tree) {
      return response.status(400).json({ error: 'Tree not found' });
    }

    const specieExists = await speciesRepository.findOne({
      description: specie,
    });
    let specie_id = 0;
    if (!specieExists) {
      const newSpecie = speciesRepository.create({ description: specie });
      await speciesRepository.save(newSpecie);
      specie_id = newSpecie.id;
    } else {
      specie_id = specieExists.id;
    }

    const newTree = Object.assign(tree, { description, age, specie_id });

    await treesRepository.save(newTree);

    return response.json({ ...tree, specie: { description: specie } });
  }
}
