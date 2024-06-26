// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
//https://opendata.trudvsem.ru/api/v1/vacancies/region/6100000000000?offset=1&limit=100&text=инженер
//'https://trudvsem.ru/iblocks/flat_filter_prr_search_cv/ref/regions'
//'https://trudvsem.ru/iblocks/flat_filter_prr_search_vacancies/ref/regions'

import { ResponseAdress, ResponseVacancies, ResponseVacancy } from "../../..";

//import axios from 'axios';

// "no-store" - SSR getServerSideProps рендер на сервере, Этот запрос должен повторяться при каждом запросе
// "no-cache" ведет себя так же, как no-store в Next.js.
// "force-cache" - SSG getStaticProps статическая генерация страниц,Этот запрос следует кэшировать до тех пор,
// пока он не станет недействительным вручную.
// next: { revalidate: 60 } - ISR getStaticProps and revalidate, Этот запрос должен быть кэширован со временем жизни 60 секунд.

interface QureyParams {
  jobCategory?: string;
  searchText?: string;
  offset?: string;
  regionCode?: string;
}

export async function getVacancies(params: QureyParams): Promise<ResponseVacancies> {
  const { jobCategory, offset, searchText, regionCode } = params;
  try {
    let url = `?offset=${offset || '0'}`;

    if (regionCode && regionCode !== 'all') {
      url = `/region/${regionCode}` + url;
    }
    if (jobCategory) {
      url = url + `&industry=${jobCategory}`;
    }
    if (searchText) {
      url = url + `&text=${searchText}`;
    }

    const res = await fetch(`http://opendata.trudvsem.ru/api/v1/vacancies` + url);

    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch Vacancies data.');
  }
}

export async function getVacancy(companyId: string, vacancyId: string): Promise<ResponseVacancy> {
  try {
    const url = `/vacancy/${companyId}/${vacancyId}`;
    const res = await fetch(process.env.API_BASE_URL + url, {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch Vacancy data.');
  }
}

export async function getAdress(latitude: string, longitude: string): Promise<ResponseAdress> {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${'aa335a498cd141c2b240085fa3c2b025'}`;
    const res = await fetch(url, {
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          return data;
        } else {
          console.error('Reverse geolocation request failed.');
          throw new Error('Reverse geolocation request failed');
        }
      });
    return res;
  } catch (error) {
    console.error('Reverse geolocation request failed.', error);
    throw new Error('Reverse geolocation request failed.');
  }
}
