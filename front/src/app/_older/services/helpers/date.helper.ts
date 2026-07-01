export const getFullDateFr = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getShortDateFr = (date: string): string => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  // mise en majuscule de la première lettre du mois
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export const getFormatedPeriode = (startPeriode: string, endPeriode: string): string => {
  const startFormated = getShortDateFr(startPeriode);
  const endFormated = getShortDateFr(endPeriode);

  return startFormated + ' - ' + endFormated;
};
