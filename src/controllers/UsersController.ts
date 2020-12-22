import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User);

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    const responseCreateUser = {
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(responseCreateUser);
  }
}
