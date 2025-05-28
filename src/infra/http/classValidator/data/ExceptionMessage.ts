export const ExceptionMessage = {
  IsNotEmpty: (property: string) => `O campo ${property} é obrigatório`,

  IsString: (property: string) => `O campo ${property} deve ser um texto`,

  IsLowercase: (property: string) =>
    `O campo ${property} deve conter apenas letras minúsculas`,

  IsCleanString: (property: string) =>
    `O campo ${property} não deve conter espaços, números ou acentos`,

  IsValidCharacters: (property: string) =>
    `O campo ${property} não deve conter caracteres especiais (apenas _ ou .)`,

  Length: (property: string, min: number, max: number) =>
    min === max
      ? `O campo ${property} deve ter exatamente ${min} caracteres`
      : `O campo ${property} deve ter no mínimo ${min} e no máximo ${max} caracteres`,

  IsPhone: (property: string) =>
    `O campo ${property} deve ser um número de telefone válido`,
};
