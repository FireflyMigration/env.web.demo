export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeTitle(name: string) {
  // insert a space before all caps
  return (
    name
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Uppercase the first character
      .replace(/^./, (str) => str.toUpperCase())
      .replace('Email', 'eMail')
  );
}
