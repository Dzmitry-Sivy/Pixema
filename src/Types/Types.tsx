type HomeProps = {
  apiKey: string;
};

type MainInputProps = {
  movies: IMovie[];
  setMovies: (movie: IMovie[]) => void;
  mainMovies: IMovie[];
};
type MainFilterProps = {
  movies: IMovie[];
  page: number;
  setMovies: (movie: IMovie[]) => void;
  updateSearchUrl: (url: string) => void;
};

type PaginationProps = {
  page: number;
  setPage: (pageNumber: number) => void;
};
type UserProfilesMobileProps = {
  userProfile: boolean;
  setUserProfile: (boolean: boolean) => void;
};
type UserProfilesProps = {
  userProfile: boolean;
};
type SeriesPaginationProps = {
  seriesPage: number;
  setSeriesPage: (pageNumber: number) => void;
};
type SettingsProps<T extends HTMLDivElement> = {
  setOpenSettings: (tr: boolean) => void;
  innerRef?: React.RefObject<T>;
};
type OpenFavoritesProps = {
  setOpenFavorites: (boolean: boolean) => void;
};

interface IMovie {
  id: string;
  name: string;
  year: string;
  poster: {
    url: string;
  };
}

interface ISeries {
  id: string;
  name: string;
  year: string;
  poster: {
    url: string;
  };
}
interface IUser {
  id: number;
  name: string;
  password: string;
  favorites: ICard[];
  changeTheme: string;
}
interface IUserLogin {
  id: number;
  name: string;
  password: string;
}
interface ICard {
  id: string;
  name: string;
  poster: {
    url: string;
  };
  year: number;
  countries: {
    0: {
      name: string;
    };
  };
  persons: {
    actors: [{ name: string }];
  };
  rating: {
    imdb: number;
  };

  movieLength: string;
  shortDescription: string;
  slogan: string;
  video: {
    trailers: {
      0: {
        url: string;
      };
    };
  };
}

export {
  HomeProps,
  IMovie,
  IUser,
  ICard,
  MainInputProps,
  PaginationProps,
  ISeries,
  SeriesPaginationProps,
  SettingsProps,
  IUserLogin,
  MainFilterProps,
  UserProfilesMobileProps,
  UserProfilesProps,
  OpenFavoritesProps,
};
