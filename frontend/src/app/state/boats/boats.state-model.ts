import { BoatDto } from 'src/app/services/api.service';

export interface BoatsStateModel {
  loading: boolean;
  error: boolean;
  boats: BoatDto[];
}
