interface CategoryVacancy {
  name: string;
  jobCategory: string;
  icon: JSX.Element;
  title: string;
}

interface Meta {
  total: number;
  limit: number;
  error?: string;
}

interface Category {
  specialisation: string;
}

interface Requirement {
  education: string;
  experience: number;
  qualification?: string;
}

interface Addresses {
  address: Address[];
}

interface Address {
  location: string;
  lng: string;
  lat: string;
}

interface ContactList {
  contact_type: string;
  contact_value: string;
}

interface Results {
  vacancies: Vacancy[];
}

interface Vacancy {
  vacancy: {
    id: string;
    source: string;
    region: IRegionName;
    company: Company;
    'creation-date': string;
    salary: string;
    salary_min: number;
    salary_max: number;
    'job-name': string;
    vac_url: string;
    employment: string;
    schedule: string;
    duty: string;
    category: Category;
    requirement: Requirement;
    addresses: Addresses;
    social_protected: string;
    work_places: number;
    currency: string;
    term?: {
      text: string;
    };
  };
}
interface VacancyTransform {
  vacancy_id: string;
  user_id?: string;
  id: string;
  source: string;
  region: IRegionName;
  company: Company;
  'creation-date': string;
  salary: string;
  salary_min: number;
  salary_max: number;
  'job-name': string;
  vac_url: string;
  employment: string;
  schedule: string;
  duty: string;
  category: Category;
  requirement: Requirement;
  addresses: Addresses;
  social_protected: string;
  contact_list: Array;
  contact_person: string;
  work_places: number;
  currency: string;
  term?: {
    text: string;
  };
  nodeRef?: RefObject<unknown>;
  date: {
    day: number;
    hours: number;
    minutes: number;
    month: number;
    year: number;
  } | null;
}

interface ResultsTransform {
  vacancies?: VacancyTransform[];
}

interface ResponseTransform {
  status: string;
  meta: Meta;
  results: ResultsTransform;
}
interface ResponseVacancies {
  status: string;
  meta: Meta;
  results: Results;
}
interface IRegionName {
  region_code: string;
  name: string;
}

interface Company {
  companycode?: string;
  'hr-agency': boolean;
  inn: string;
  kpp: string;
  name: string;
  ogrn: string;
  site: string;
  url: string;
}

interface StatusAdressResonse {
  code: number;
  message: string;
}

interface Adress {
  continent?: string;
  country: string;
  country_code: string;
  county: string;
  house_number: string;
  postcode: string;
  region: string;
  road: string;
  state: string;
  town?: string;
  city?: string;
  village?: string;
  city_district?: string;
}

interface ResultAdress {
  components: Adress;
  formatted: string;
}

interface ResponseAdress {
  status: string;
  results: ResultAdress[];
}

interface ResponseVacancy {
  status: string;
  meta: Meta;
  results: Results;
}

interface Components {
  city: string;
  city_district: string;
  continent: string;
  country: string;
  country_code: string;
  house_number: string;
  postcode: string;
  region: string;
  road: string;
  state: string;
  suburb: string;
}

interface StatusResponseGeolocation {
  code: number;
  message: string;
}

interface Data {
  results: Components[];
  status: StatusResponseGeolocation;
}

interface ResponseGeolocation {
  data: Data;
}

type Mods = Record<string, boolean | string | undefined>;

interface IRegion {
  code: string;
  name: string;
  shortName: string;
  text: string;
  key: string;
}
interface ResponseRegions {
  data: IRegion[];
}

export interface FormValues {
  email: string;
  name: string | null;
  password: string;
}

export interface LoginByEmailProps {
  email: string;
  password: string;
}

export interface ResponseError {
  message: string;
  additionalMessage: string;
  code: string;
}

export interface Params {
  searchParams?: { text?: string; offset: string; regionCode?: string };
  params: {
    jobCategory?: string;
  };
}
