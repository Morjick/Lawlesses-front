export const useLocaleDate = (date: string): string => {
  return date.split(', ')[1] || date
}
