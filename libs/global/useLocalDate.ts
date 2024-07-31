export interface LocalDateResponseInterface {
  date: string
  timestemp: string
}

export const useLocalDate = (date: string): LocalDateResponseInterface => {
  // 2024-06-01T00:01:43.396Z
  const response: LocalDateResponseInterface = {
    timestemp: '',
    date: '',
  }
  const candidates: string[] = date.split('T')

  if (Array.isArray(candidates) && candidates[1]) {
    response.timestemp = candidates[1]
    const candidateTime = candidates[1].split(':')

    if (candidateTime.length) {
      response.timestemp = `${candidateTime[0]}:${candidateTime[1]}`
    }
  }

  response.date = candidates[0].split('-').reverse().join('.')

  return response
}
