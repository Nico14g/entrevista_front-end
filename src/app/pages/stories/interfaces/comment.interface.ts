//interface de Comment, donde kids es opcional, ya que a veces no tiene este campo.
export interface Comment {
  by: string;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
