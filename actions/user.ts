// @/actions/user.ts (Server Action)
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * create a new user in the database.
 * @param data - An object containing the username of the user.
 * @returns The newly created user object.
 */
export async function createUser(data: { username: string }) {
  try {
    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
      },
    });

    return newUser;
  } catch (error) {
    console.error('Houston, we have a problem: ', error);
    throw new Error('Failed to create user.');
  }
}

/**
 * Retrieve all users from the database.
 * @returns A list of user objects.
 */
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Houston, we have a problem: ', error);
    throw new Error('Failed to retrieve users.');
  }
}
