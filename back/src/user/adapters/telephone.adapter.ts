export class TelephoneAdapter {
  static adapt(telephones: { number: string }[]): { number: string }[] {
    // Adapta a estrutura dos telefones, ex: normaliza os números
    return telephones.map((tel) => ({
      number: tel.number.replace(/[^0-9]/g, ''), // Remove caracteres não numéricos
    }));
  }
}
