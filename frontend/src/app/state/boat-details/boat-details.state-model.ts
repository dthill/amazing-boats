import { BoatDto } from 'src/app/services/api.service';

export interface BoatDetailsStateModel {
    boat: BoatDto | Record<string, never>;
    error: boolean;
    loading: boolean;
}
