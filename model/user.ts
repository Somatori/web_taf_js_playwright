export class User {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static standardUser(): User {
    const username = process.env.SAUCEDEMO_USER;
    const password = process.env.SAUCEDEMO_PASSWORD;
    if (!username || !password) throw new Error('Missing credentials');
    return new User(username, password);
  }
}
