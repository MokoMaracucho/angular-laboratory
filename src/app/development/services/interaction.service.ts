import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CameraDatas } from '../../shared/models/camera-datas';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

    getCameraDatas_init = new Subject<CameraDatas>();

    getCameraDatas_loop = new Subject<CameraDatas>();

    isLoaded = new Subject<boolean>();
}