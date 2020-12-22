import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface IResponse {
  user: User;
  token: string;
}

export default class SessionsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<IResponse | any> {
    const { email, password } = request.body;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ error: 'Incorrect email/password combination.' });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return response
        .status(401)
        .json({ error: 'Incorrect email/password combination.' });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const userWithoutPassword = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return response.json({ user: userWithoutPassword, token });
  }
}
