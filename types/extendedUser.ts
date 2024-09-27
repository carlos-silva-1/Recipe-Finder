import { Model } from 'sequelize';

export default interface ExtendedUser extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  password: string | null;
  ingredients: string | null;
  name?: string | null;
  image?: string | null;
};
