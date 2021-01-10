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

    change_language_english = new Subject<boolean>();

    change_language_french = new Subject<boolean>();

    change_language_spanish = new Subject<boolean>();

    open_running = new Subject<boolean>();

    open_shareKnowledge = new Subject<boolean>();

    open_photography = new Subject<boolean>();

    open_games = new Subject<boolean>();

    open_stereoscopy = new Subject<boolean>();

    toogle_anaglyph_activated = new Subject<boolean>();

    open_art = new Subject<boolean>();

    open_contactMe = new Subject<boolean>();

    open_development = new Subject<boolean>();

    open_travel = new Subject<boolean>();
}
