import { IHoliday } from '../model/IHoliday';

export async function getHolidays(
  year: number,
  countryCode: string,
): Promise<IHoliday[]> {
  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
  );
  return response.json();
}
