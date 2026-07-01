export function handleError(err: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '';

  if (err instanceof Error) {
    //  real error
    console.error(`${prefix} ${err.message}`);
  } else if (typeof err === 'string') {
    // C'est une string
    console.error(`${prefix} ${err}`);
  } else if (typeof err === 'object' && err !== null) {
    // C'est un objet
    console.error(`${prefix} ${JSON.stringify(err)}`);
  } else {
    // C'est un truc random
    console.error(`${prefix} Unknown error:`, err);
  }
}
