import princesa from "@/assets/dress-princesa.jpg";
import sereia from "@/assets/dress-sereia.jpg";
import evase from "@/assets/dress-evase.jpg";
import reto from "@/assets/dress-reto.jpg";
import midi from "@/assets/dress-midi.jpg";

export type Estilo = "Princesa" | "Sereia" | "Evasê" | "Reto" | "Midi";
export type Marca = "Berta Bridal" | "Milla Nova" | "Importados" | "Multimarcas";
export type Unidade = "São Paulo" | "Brasília" | "Patos de Minas";
export type Status = "Disponível para prova" | "Em prova" | "Reservado";

export interface Dress {
  id: string;
  nome: string;
  marca: Marca;
  estilo: Estilo;
  unidade: Unidade;
  status: Status;
  imagem: string;
  galeria: string[];
  descricao: string;
  favoritos: number;
}

export const ESTILOS: Estilo[] = ["Princesa", "Sereia", "Evasê", "Reto", "Midi"];
export const MARCAS: Marca[] = ["Berta Bridal", "Milla Nova", "Importados", "Multimarcas"];
export const UNIDADES: Unidade[] = ["São Paulo", "Brasília", "Patos de Minas"];

export const dresses: Dress[] = [
  {
    id: "celeste",
    nome: "Celeste",
    marca: "Berta Bridal",
    estilo: "Princesa",
    unidade: "São Paulo",
    status: "Disponível para prova",
    imagem: princesa,
    galeria: [princesa, evase, sereia],
    descricao:
      "Saia ampla em camadas de tule francês, corpete bordado à mão com pérolas e cristais. Um vestido para entradas inesquecíveis.",
    favoritos: 184,
  },
  {
    id: "marina",
    nome: "Marina",
    marca: "Milla Nova",
    estilo: "Sereia",
    unidade: "Brasília",
    status: "Disponível para prova",
    imagem: sereia,
    galeria: [sereia, reto, evase],
    descricao:
      "Modelagem sereia em cetim mikado com decote V e detalhes em renda chantilly. Acompanha cinto de pérolas removível.",
    favoritos: 142,
  },
  {
    id: "olivia",
    nome: "Olívia",
    marca: "Importados",
    estilo: "Evasê",
    unidade: "Patos de Minas",
    status: "Em prova",
    imagem: evase,
    galeria: [evase, midi, princesa],
    descricao:
      "Silhueta evasê em crepe italiano. Costas em V profundo e cauda elegante. Perfeito para cerimônias ao ar livre.",
    favoritos: 98,
  },
  {
    id: "alma",
    nome: "Alma",
    marca: "Multimarcas",
    estilo: "Reto",
    unidade: "São Paulo",
    status: "Disponível para prova",
    imagem: reto,
    galeria: [reto, evase, sereia],
    descricao:
      "Coluna minimalista em crepe pesado, decote canoa e costas trabalhadas. Para a noiva moderna e atemporal.",
    favoritos: 76,
  },
  {
    id: "ines",
    nome: "Inês",
    marca: "Multimarcas",
    estilo: "Midi",
    unidade: "Brasília",
    status: "Disponível para prova",
    imagem: midi,
    galeria: [midi, evase, reto],
    descricao:
      "Vestido midi em renda francesa, ideal para casamentos civis e cerimônias intimistas. Manga curta delicada.",
    favoritos: 61,
  },
  {
    id: "serena",
    nome: "Serena",
    marca: "Berta Bridal",
    estilo: "Sereia",
    unidade: "São Paulo",
    status: "Reservado",
    imagem: sereia,
    galeria: [sereia, princesa, midi],
    descricao:
      "Sereia em tule bordado com aplicações 3D. Costas transparentes com botões de pérola. Edição limitada.",
    favoritos: 211,
  },
  {
    id: "luna",
    nome: "Luna",
    marca: "Milla Nova",
    estilo: "Princesa",
    unidade: "Patos de Minas",
    status: "Disponível para prova",
    imagem: princesa,
    galeria: [princesa, evase, midi],
    descricao:
      "Princesa contemporânea com tule iluminado e bordado floral discreto. Cauda média catedral.",
    favoritos: 134,
  },
  {
    id: "vera",
    nome: "Vera",
    marca: "Importados",
    estilo: "Reto",
    unidade: "Brasília",
    status: "Disponível para prova",
    imagem: reto,
    galeria: [reto, midi, sereia],
    descricao:
      "Reto fluido em seda pura, decote halter e costas livres. Para noivas que preferem o essencial bem feito.",
    favoritos: 52,
  },
];

export const getDress = (id: string) => dresses.find((d) => d.id === id);
