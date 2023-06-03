export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
}

export function extractUserData(rawData: UserData): UserData {
  const { username, email, token, bio, image } = rawData;
  return { username, email, token, bio, image };
}
