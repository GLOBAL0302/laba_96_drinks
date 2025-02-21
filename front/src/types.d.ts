//Users
export interface IUser {
  id: string;
  email: string;
  password: string;
  token: string;
  displayName: string;
  avatar: string;
  role: string;
  googleId: string;
}

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface IRegisterMutation {
  email: string;
  password: string;
  avatar: string | null;
  displayName: string;
}

export interface ILoginMutation {
  email: string;
  password: string;
}

//Cocktails
export interface ICocktails {
  _id: string;
  user: string;
  title: string;
  ingredients: {
    _id: string;
    title: string;
    amount: string;
  }[];
  recipe: string;
  image: string | null;
  isPublished: boolean;
}

export interface ICocktailMutation {
  title: string;
  ingredients: {
    title: string;
    amount: string;
  }[];
  recipe: string;
  image: string | null;
}

export interface ITest {
  title: string;
  ingredients: string;
  recipe: string;
  image: string | null;
}

//Validation
export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
