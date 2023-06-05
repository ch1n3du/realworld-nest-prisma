interface ProfileData {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ProfileRO {
  profile: ProfileData;
}

export function extractProfileData(rawProfileData: ProfileData): ProfileData {
  return {
    username: rawProfileData.username,
    bio: rawProfileData.bio,
    image: rawProfileData.image,
    following: rawProfileData.following,
  };
}
