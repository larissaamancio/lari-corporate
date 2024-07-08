export interface Filial {
  id: number;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  responsible: string;
}

export interface Responsible {
  id: string;
  name: string;
}

export interface Process {
  id: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  number: string;
  destiny: string;
  deadline: string;
  description: string;
  accept: boolean;
  acceptAt: Date;
}