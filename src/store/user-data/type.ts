import { UserType } from '../login/type';

export type UserStateProps = {
  isErrorUserResponse: boolean;
  isLoadingUser: boolean;
  user: UserType | null;
};
