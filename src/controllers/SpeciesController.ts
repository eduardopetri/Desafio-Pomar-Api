import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Specie from '../models/Specie';

export default class SpeciesController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Specie>> {
    const { description } = request.body;
    const specieRepository = getRepository(Specie);

    const specie = specieRepository.create({
      description,
    });

    await specieRepository.save(specie);

    return response.json(specie);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Specie>> {
    const { id } = request.params;
    const { description } = request.body;
    const specieRepository = getRepository(Specie);

    const specie = await specieRepository.findOne(id);

    const newSpecie = { ...specie, description };
    await specieRepository.save(newSpecie);

    return response.json(specie);
  }

  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Specie>> {
    const speciesRepository = getRepository(Specie);

    const species = await speciesRepository.find();

    return response.json(species);
  }
}
