export function finalCheck(toast: any, points: number) {
  if (points > 0) {
    return toast({
      title: 'Erreur',
      description: `Vous devez dépenser tous les points (${points}).`,
      status: 'error',
      isClosable: true,
      duration: 5000,
    });
  }
  if (points < 0) {
    return toast({
      title: 'Erreur',
      description: `Vous avez dépensé trop de points (${Math.abs(points)}).`,
      status: 'error',
      isClosable: true,
      duration: 5000,
    });
  }
  return true;
}
