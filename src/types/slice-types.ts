export type UserDto = {
  email: string;
  name: string;
};

export type UserRegisterDto = {
  password: string;
} & UserDto;

export type UserLoginDto = {
  email: string;
  password: string;
};

export type IngredientsDto = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  id: string;
  count: number;
};
