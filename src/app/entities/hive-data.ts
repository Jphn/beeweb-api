import { CustomError } from '../errors/custom-error';
import { Either, right } from '../errors/either';
import { Entity } from './entity';

export interface HiveDataProps {
  readonly uniqueKey: string;
  temp: number;
  humidity: number;
  weight: number;
  lux: number;
  noise: number;
}

export class HiveData extends Entity<HiveDataProps> {

  private constructor(props: HiveDataProps, _id?: string) {
    super(props, _id);

  }

  static create(
    { uniqueKey, temp, humidity, weight, lux, noise }: HiveDataProps,
    _id?: string
  ): Either<CustomError, HiveData> {
    return right(new HiveData({ uniqueKey, temp, humidity, weight, lux, noise }, _id));
  }
}
