export interface ImovelInterface {
  id?: string | number;
  titulo: string;
  descricao?: string;
  endereco?: EnderecoInterface;
  tipoAnuncio: TipoAnuncioEnum;
  tipoImovel: TipoImovelEnum;
  valorAluguel?: number;
  valorCondominio?: number;
  valorIptu?: number;
  quantidadeQuartos?: number;
  quantidadeBanheiros?: number;
  metrosQuadrados?: number;
  imagem?: string;
  ativo: boolean;
}

export interface EnderecoInterface {
  cep?: string;
  rua?: string;
  bairro?: string;
  numero?: string;
  cidade?: string;
  estado?: string;
  logradouro?: string;
}

export interface ApartamentoInterface extends ImovelInterface {
  andar?: number;
  vagasGaragem?: number;
}

export interface CasaInterface extends ImovelInterface {
  possuiJardim?: boolean;
}

export interface SalaComercialInterface extends ImovelInterface {
  quantidadeSalas?: number;
  possuiEstacionamento?: boolean;
}

export enum TipoAnuncioEnum {
  VENDA = 'venda',
  ALUGUEL = 'aluguel',
}

export enum TipoImovelEnum {
  CASA = 'casa',
  APARTAMENTO = 'apartamento',
  SALA_COMERCIAL = 'sala_comercial',
  OUTRO = 'outro',
}