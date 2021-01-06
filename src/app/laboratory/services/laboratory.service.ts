import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private arc_rotate_camera: BABYLON.ArcRotateCamera;

    private hemispheric_light: BABYLON.Light;
    private directional_light: BABYLON.DirectionalLight;

    private pegasus;
    private pegasus_inside;
    private pegasus_laces;
    private pegasus_logo;
    private pegasus_sole_inside;
    private pegasus_sole_outside;
    private speakers;
    private loud_speakers;
    private chiva;
    private leather_armchair;
    private blanket;
    private ome_gonorreas;
    private lampshade_tissue;
    private lampshade;
    private lamp_base;
    private transfert_boxes;
    private transfert_boxes_rings;
    private rose_rouge;
    private rose_rouge_frame;
    private verbal_shoota;
    private verbal_shoota_frame;
    private lapin_blanc;
    private lapin_blanc_frame;
    private fourty_four;
    private fourty_four_marie_louise;
    private fourty_four_frame;
    private brique;
    private brique_marie_louise;
    private brique_frame;
    private tofu;
    private tofu_marie_louise;
    private tofu_frame;
    private checker;
    private checker_locks;
    private checker_bottom;
    private tarot_deck;
    private virgen_guadalupe;
    private candelstick;
    private wall_left_front;
    private wall_left_back;
    private mirror_frame;
    private daisy;
    private amor_amor;
    private amor_amor_frame;
    private trestle_left;
    private trestle_right;
    private desk;
    private via_air_mail;
    private rince_cochon;
    private thermos;
    private post_it;
    private notebook_bottom;
    private notebook_top;
    private threed_glasses_frame;
    private threed_glass_blue;
    private threed_glass_red;
    private mouse;
    private mac_mini;
    private support_laptop;
    private wood_box_center;
    private wood_box_right;
    private laptop;
    private laptop_keyboard;
    private laptop_screen;
    private screen_center;
    private screen_frame_center;
    private screen_right;
    private screen_frame_right;

    private pegasus_BAKING: BABYLON.Texture;
    private pegasus_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_laces_BAKING: BABYLON.Texture;
    private pegasus_laces_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_sole_inside_BAKING: BABYLON.Texture;
    private pegasus_sole_inside_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_sole_outside_BAKING: BABYLON.Texture;
    private pegasus_sole_outside_BAKING_HIGHLIGHT: BABYLON.Texture;
    private transfert_boxes_BAKING: BABYLON.Texture;
    private transfert_boxes_BAKING_HIGHLIGHT: BABYLON.Texture;
    private transfert_boxes_rings_BAKING: BABYLON.Texture;
    private transfert_boxes_rings_BAKING_HIGHLIGHT: BABYLON.Texture;
    private rose_rouge_BAKING: BABYLON.Texture;
    private rose_rouge_BAKING_HIGHLIGHT: BABYLON.Texture;
    private verbal_shoota_BAKING: BABYLON.Texture;
    private verbal_shoota_BAKING_HIGHLIGHT: BABYLON.Texture;
    private lapin_blanc_BAKING: BABYLON.Texture;
    private lapin_blanc_BAKING_HIGHLIGHT: BABYLON.Texture;
    private fourty_four_BAKING: BABYLON.Texture;
    private fourty_four_BAKING_HIGHLIGHT: BABYLON.Texture;
    private brique_BAKING: BABYLON.Texture;
    private brique_BAKING_HIGHLIGHT: BABYLON.Texture;
    private tofu_BAKING: BABYLON.Texture;
    private tofu_BAKING_HIGHLIGHT: BABYLON.Texture;
    private fourty_four_marie_louise_BAKING: BABYLON.Texture;
    private fourty_four_marie_louise_BAKING_HIGHLIGHT: BABYLON.Texture;
    private brique_marie_louise_BAKING: BABYLON.Texture;
    private brique_marie_louise_BAKING_HIGHLIGHT: BABYLON.Texture;
    private tofu_marie_louise_BAKING: BABYLON.Texture;
    private tofu_marie_louise_BAKING_HIGHLIGHT: BABYLON.Texture;
    private checker_BAKING: BABYLON.Texture;
    private checker_BAKING_HIGHLIGHT: BABYLON.Texture;
    private checker_locks_BAKING: BABYLON.Texture;
    private checker_locks_BAKING_HIGHLIGHT: BABYLON.Texture;
    private tarot_deck_BAKING: BABYLON.Texture;
    private tarot_deck_BAKING_HIGHLIGHT: BABYLON.Texture;
    private amor_amor_BAKING: BABYLON.Texture;
    private amor_amor_BAKING_HIGHLIGHT: BABYLON.Texture;
    private via_air_mail_BAKING: BABYLON.Texture;
    private via_air_mail_BAKING_HIGHLIGHT: BABYLON.Texture;
    private threed_glasses_frame_BAKING: BABYLON.Texture;
    private threed_glasses_frame_BAKING_HIGHLIGHT: BABYLON.Texture;
    private mac_mini_BAKING: BABYLON.Texture;
    private mac_mini_BAKING_HIGHLIGHT: BABYLON.Texture;
    private laptop_BAKING: BABYLON.Texture;
    private laptop_BAKING_HIGHLIGHT: BABYLON.Texture;
    private laptop_screen_BAKING: BABYLON.Texture;
    private laptop_screen_BAKING_HIGHLIGHT: BABYLON.Texture;
    private screen_center_BAKING: BABYLON.Texture;
    private screen_center_BAKING_HIGHLIGHT: BABYLON.Texture;
    private screen_right_BAKING: BABYLON.Texture;
    private screen_right_BAKING_HIGHLIGHT: BABYLON.Texture;

    private glass_MATERIAL: BABYLON.StandardMaterial;
    private glass_blue_MATERIAL: BABYLON.StandardMaterial;
    private glass_red_MATERIAL: BABYLON.StandardMaterial;

    public constructor(
        private ngZone: NgZone,
        private windowRef: WindowRefService
    ) {}

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

        this.canvas = canvas.nativeElement;
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });
        this.scene = new BABYLON.Scene(this.engine);

        // CANERAS

        this.arc_rotate_camera = new BABYLON.ArcRotateCamera("arc_rotate_camera", 2.25, 1.05, 50, new BABYLON.Vector3(-16.2, 5, -12), this.scene);
        this.arc_rotate_camera.lockedTarget = new BABYLON.Vector3(-16.2, 5, -12);
        this.arc_rotate_camera.lowerBetaLimit = 0.1;
        this.arc_rotate_camera.upperBetaLimit = 1.4;
        this.arc_rotate_camera.lowerRadiusLimit = 20;
        this.arc_rotate_camera.upperRadiusLimit = 65;
        this.arc_rotate_camera.attachControl(canvas, true);

        // LIGHTS

        this.hemispheric_light = new BABYLON.HemisphericLight('hemispheric_light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.hemispheric_light.intensity = 0.8;

        this.directional_light = new BABYLON.DirectionalLight("directional_light", new BABYLON.Vector3(1, -5, -2), this.scene);
        this.directional_light.intensity = 0.5;

        // PLANS

        BABYLON.SceneLoader.ImportMeshAsync("plan_inside", "../../assets/glb/laboratory/", "plan_inside.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("plan_outside", "../../assets/glb/laboratory/", "plan_outside.glb").then((result) => {
        });

        // FLOOR

        BABYLON.SceneLoader.ImportMeshAsync("parquet", "../../assets/glb/laboratory/", "parquet.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("persian_carpet", "../../assets/glb/laboratory/", "persian_carpet.glb").then((result) => {
        });

        // PEGASUS

        this.pegasus_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_BAKING.jpg", this.scene, false, false);
        this.pegasus_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.pegasus_laces_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_laces_BAKING.jpg", this.scene, false, false);
        this.pegasus_laces_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_laces_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.pegasus_sole_inside_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_sole_inside_BAKING.jpg", this.scene, false, false);
        this.pegasus_sole_inside_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_sole_inside_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.pegasus_sole_outside_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_sole_outside_BAKING.jpg", this.scene, false, false);
        this.pegasus_sole_outside_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/pegasus_sole_outside_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("pegasus", "../../assets/glb/laboratory/", "pegasus.glb", this.scene).then((result) => {
            this.pegasus = this.scene.getMeshByName("pegasus");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pegasus_inside", "../../assets/glb/laboratory/", "pegasus_inside.glb", this.scene).then((result) => {
            this.pegasus_inside = this.scene.getMeshByName("pegasus_inside");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pegasus_laces", "../../assets/glb/laboratory/", "pegasus_laces.glb", this.scene).then((result) => {
            this.pegasus_laces = this.scene.getMeshByName("pegasus_laces");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pegasus_logo", "../../assets/glb/laboratory/", "pegasus_logo.glb", this.scene).then((result) => {
            this.pegasus_logo = this.scene.getMeshByName("pegasus_logo");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pegasus_sole_inside", "../../assets/glb/laboratory/", "pegasus_sole_inside.glb", this.scene).then((result) => {
            this.pegasus_sole_inside = this.scene.getMeshByName("pegasus_sole_inside");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pegasus_sole_outside", "../../assets/glb/laboratory/", "pegasus_sole_outside.glb", this.scene).then((result) => {
            this.pegasus_sole_outside = this.scene.getMeshByName("pegasus_sole_outside");
        });

        // SPEAKERS

        BABYLON.SceneLoader.ImportMeshAsync("speakers", "../../assets/glb/laboratory/", "speakers.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("loud_speakers", "../../assets/glb/laboratory/", "loud_speakers.glb", this.scene).then((result) => {
        });

        // CHIVA

        BABYLON.SceneLoader.ImportMeshAsync("chiva", "../../assets/glb/laboratory/", "chiva.glb", this.scene).then((result) => {
        });

        // LEATHER ARMCHAIR

        BABYLON.SceneLoader.ImportMeshAsync("leather_armchair", "../../assets/glb/laboratory/", "leather_armchair.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("blanket", "../../assets/glb/laboratory/", "blanket.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("ome_gonorreas", "../../assets/glb/laboratory/", "ome_gonorreas.glb", this.scene).then((result) => {
        });

        // LAMP

        BABYLON.SceneLoader.ImportMeshAsync("lampshade_tissue", "../../assets/glb/laboratory/", "lampshade_tissue.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("lampshade", "../../assets/glb/laboratory/", "lampshade.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("lamp_base", "../../assets/glb/laboratory/", "lamp_base.glb", this.scene).then((result) => {
        });

        // TRANSFERT BOXES

        this.transfert_boxes_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/transfert_boxes_BAKING.jpg", this.scene, false, false);
        this.transfert_boxes_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/transfert_boxes_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.transfert_boxes_rings_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/transfert_boxes_rings_BAKING.jpg", this.scene, false, false);
        this.transfert_boxes_rings_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/transfert_boxes_rings_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("transfert_boxes", "../../assets/glb/laboratory/", "transfert_boxes.glb", this.scene).then((result) => {
            this.transfert_boxes = this.scene.getMeshByName("transfert_boxes");
        });

        BABYLON.SceneLoader.ImportMeshAsync("transfert_boxes_rings", "../../assets/glb/laboratory/", "transfert_boxes_rings.glb", this.scene).then((result) => {
            this.transfert_boxes_rings = this.scene.getMeshByName("transfert_boxes_rings");
        });

        // PHOTOGRAPHY

        this.rose_rouge_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/rose_rouge_BAKING.jpg", this.scene, false, false);
        this.rose_rouge_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/rose_rouge_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.verbal_shoota_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/verbal_shoota_BAKING.jpg", this.scene, false, false);
        this.verbal_shoota_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/verbal_shoota_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.lapin_blanc_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/lapin_blanc_BAKING.jpg", this.scene, false, false);
        this.lapin_blanc_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/lapin_blanc_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.fourty_four_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/fourty_four_BAKING.jpg", this.scene, false, false);
        this.fourty_four_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/fourty_four_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.brique_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/brique_BAKING.jpg", this.scene, false, false);
        this.brique_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/brique_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.tofu_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/tofu_BAKING.jpg", this.scene, false, false);
        this.tofu_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/tofu_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.fourty_four_marie_louise_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/fourty_four_marie_louise_BAKING.jpg", this.scene, false, false);
        this.fourty_four_marie_louise_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/fourty_four_marie_louise_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.brique_marie_louise_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/brique_marie_louise_BAKING.jpg", this.scene, false, false);
        this.brique_marie_louise_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/brique_marie_louise_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.tofu_marie_louise_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/tofu_marie_louise_BAKING.jpg", this.scene, false, false);
        this.tofu_marie_louise_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/tofu_marie_louise_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("rose_rouge", "../../assets/glb/laboratory/", "rose_rouge.glb", this.scene).then((result) => {
            this.rose_rouge = this.scene.getMeshByName("rose_rouge");
        });

        BABYLON.SceneLoader.ImportMeshAsync("rose_rouge_frame", "../../assets/glb/laboratory/", "rose_rouge_frame.glb", this.scene).then((result) => {
            this.rose_rouge_frame = this.scene.getMeshByName("rose_rouge_frame");
        });

        BABYLON.SceneLoader.ImportMeshAsync("verbal_shoota", "../../assets/glb/laboratory/", "verbal_shoota.glb", this.scene).then((result) => {
            this.verbal_shoota = this.scene.getMeshByName("verbal_shoota");
        });

        BABYLON.SceneLoader.ImportMeshAsync("verbal_shoota_frame", "../../assets/glb/laboratory/", "verbal_shoota_frame.glb", this.scene).then((result) => {
            this.verbal_shoota_frame = this.scene.getMeshByName("verbal_shoota_frame");
        });

        BABYLON.SceneLoader.ImportMeshAsync("lapin_blanc", "../../assets/glb/laboratory/", "lapin_blanc.glb", this.scene).then((result) => {
            this.lapin_blanc = this.scene.getMeshByName("lapin_blanc");
        });

        BABYLON.SceneLoader.ImportMeshAsync("lapin_blanc_frame", "../../assets/glb/laboratory/", "lapin_blanc_frame.glb", this.scene).then((result) => {
            this.lapin_blanc_frame = this.scene.getMeshByName("lapin_blanc_frame");
        });

        BABYLON.SceneLoader.ImportMeshAsync("fourty_four", "../../assets/glb/laboratory/", "fourty_four.glb", this.scene).then((result) => {
            this.fourty_four = this.scene.getMeshByName("fourty_four");
        });

        BABYLON.SceneLoader.ImportMeshAsync("fourty_four_marie_louise", "../../assets/glb/laboratory/", "fourty_four_marie_louise.glb", this.scene).then((result) => {
            this.fourty_four_marie_louise = this.scene.getMeshByName("fourty_four_marie_louise");
        });

        BABYLON.SceneLoader.ImportMeshAsync("fourty_four_frame", "../../assets/glb/laboratory/", "fourty_four_frame.glb", this.scene).then((result) => {
            this.fourty_four_frame = this.scene.getMeshByName("fourty_four_frame");
        });

        BABYLON.SceneLoader.ImportMeshAsync("brique", "../../assets/glb/laboratory/", "brique.glb", this.scene).then((result) => {
            this.brique = this.scene.getMeshByName("brique");
        });

        BABYLON.SceneLoader.ImportMeshAsync("brique_marie_louise", "../../assets/glb/laboratory/", "brique_marie_louise.glb", this.scene).then((result) => {
            this.brique_marie_louise = this.scene.getMeshByName("brique_marie_louise");
        });

        BABYLON.SceneLoader.ImportMeshAsync("brique_frame", "../../assets/glb/laboratory/", "brique_frame.glb", this.scene).then((result) => {
            this.brique_frame = this.scene.getMeshByName("brique_frame");
        });

        BABYLON.SceneLoader.ImportMeshAsync("tofu", "../../assets/glb/laboratory/", "tofu.glb", this.scene).then((result) => {
            this.tofu = this.scene.getMeshByName("tofu");
        });

        BABYLON.SceneLoader.ImportMeshAsync("tofu_marie_louise", "../../assets/glb/laboratory/", "tofu_marie_louise.glb", this.scene).then((result) => {
            this.tofu_marie_louise = this.scene.getMeshByName("tofu_marie_louise");
        });

        BABYLON.SceneLoader.ImportMeshAsync("tofu_frame", "../../assets/glb/laboratory/", "tofu_frame.glb", this.scene).then((result) => {
            this.tofu_frame = this.scene.getMeshByName("tofu_frame");
        });

        // CHIMNEY

        BABYLON.SceneLoader.ImportMeshAsync("chimney", "../../assets/glb/laboratory/", "chimney.glb", this.scene).then((result) => {
        });

        var chimney_back_MATERIAL = new BABYLON.StandardMaterial("myMaterial", this.scene);
        chimney_back_MATERIAL.diffuseColor = new BABYLON.Color3(0, 0, 0);
        chimney_back_MATERIAL.specularColor = new BABYLON.Color3(0, 0, 0);
        chimney_back_MATERIAL.emissiveColor = new BABYLON.Color3(0, 0, 0);
        chimney_back_MATERIAL.ambientColor = new BABYLON.Color3(0, 0, 0);

        BABYLON.SceneLoader.ImportMeshAsync("chimney_back", "../../assets/glb/laboratory/", "chimney_back.glb", this.scene).then((result) => {
            const chimney_back = this.scene.getMeshByName("chimney_back");
            chimney_back.material = chimney_back_MATERIAL;
        });

        // CHIMNEY

        this.checker_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/checker_BAKING.jpg", this.scene, false, false);
        this.checker_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/checker_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.checker_locks_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/checker_locks_BAKING.jpg", this.scene, false, false);
        this.checker_locks_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/checker_locks_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("checker", "../../assets/glb/laboratory/", "checker.glb", this.scene).then((result) => {
            this.checker = this.scene.getMeshByName("checker");
        });

        BABYLON.SceneLoader.ImportMeshAsync("checker_locks", "../../assets/glb/laboratory/", "checker_locks.glb", this.scene).then((result) => {
            this.checker_locks = this.scene.getMeshByName("checker_locks");
        });

        BABYLON.SceneLoader.ImportMeshAsync("checker_bottom", "../../assets/glb/laboratory/", "checker_bottom.glb", this.scene).then((result) => {
        });

        // TAROT DECK

        this.tarot_deck_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/tarot_deck_BAKING.jpg", this.scene, false, false);
        this.tarot_deck_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/tarot_deck_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("tarot_deck", "../../assets/glb/laboratory/", "tarot_deck.glb", this.scene).then((result) => {
            this.tarot_deck = this.scene.getMeshByName("tarot_deck");
        });

        // VIRGEN

        BABYLON.SceneLoader.ImportMeshAsync("virgen_guadalupe", "../../assets/glb/laboratory/", "virgen_guadalupe.glb", this.scene).then((result) => {
        });

        // CANDELSTICK

        BABYLON.SceneLoader.ImportMeshAsync("candelstick", "../../assets/glb/laboratory/", "candelstick.glb", this.scene).then((result) => {
        });

        // WALL LEFT

        BABYLON.SceneLoader.ImportMeshAsync("wall_left_front", "../../assets/glb/laboratory/", "wall_left_front.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wall_left_back", "../../assets/glb/laboratory/", "wall_left_back.glb", this.scene).then((result) => {
        });

        // MIRROR

        BABYLON.SceneLoader.ImportMeshAsync("mirror_frame", "../../assets/glb/laboratory/", "mirror_frame.glb", this.scene).then((result) => {
        });

        // DAISY

        BABYLON.SceneLoader.ImportMeshAsync("daisy", "../../assets/glb/laboratory/", "daisy.glb", this.scene).then((result) => {
        });

        // AMOR AMOR

        this.amor_amor_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/amor_amor_BAKING.jpg", this.scene, false, false);
        this.amor_amor_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/amor_amor_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("amor_amor", "../../assets/glb/laboratory/", "amor_amor.glb", this.scene).then((result) => {
            this.amor_amor = this.scene.getMeshByName("amor_amor");
        });

        BABYLON.SceneLoader.ImportMeshAsync("amor_amor_frame", "../../assets/glb/laboratory/", "amor_amor_frame.glb", this.scene).then((result) => {
            this.amor_amor_frame = this.scene.getMeshByName("amor_amor_frame");
        });

        // DESK

        BABYLON.SceneLoader.ImportMeshAsync("trestle_left", "../../assets/glb/laboratory/", "trestle_left.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("trestle_right", "../../assets/glb/laboratory/", "trestle_right.glb", this.scene).then((result) => {
        });

        this.glass_MATERIAL = new BABYLON.StandardMaterial("desk_MATERIAL", this.scene);
        this.glass_MATERIAL.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.glass_MATERIAL.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.glass_MATERIAL.alpha = 0.2;
        this.glass_MATERIAL.specularPower = 32;
        this.glass_MATERIAL.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_MATERIAL.reflectionFresnelParameters.bias = 0.1;
        this.glass_MATERIAL.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_MATERIAL.emissiveFresnelParameters.bias = 0.6;
        this.glass_MATERIAL.emissiveFresnelParameters.power = 4;
        this.glass_MATERIAL.emissiveFresnelParameters.leftColor = BABYLON.Color3.Gray();
        this.glass_MATERIAL.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();
        this.glass_MATERIAL.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_MATERIAL.opacityFresnelParameters.leftColor = BABYLON.Color3.Gray();
        this.glass_MATERIAL.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        BABYLON.SceneLoader.ImportMeshAsync("desk", "../../assets/glb/laboratory/", "desk.glb", this.scene).then((result) => {
            this.desk = this.scene.getMeshByName("desk");
            this.desk.material = this.glass_MATERIAL;
        });

        // VIA AIR MAIL

        this.via_air_mail_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/via_air_mail_BAKING.jpg", this.scene, false, false);
        this.via_air_mail_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/via_air_mail_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("via_air_mail", "../../assets/glb/laboratory/", "via_air_mail.glb", this.scene).then((result) => {
            this.via_air_mail = this.scene.getMeshByName("via_air_mail");
        });

        // RINCE COCHON

        BABYLON.SceneLoader.ImportMeshAsync("rince_cochon", "../../assets/glb/laboratory/", "rince_cochon.glb", this.scene).then((result) => {
        });

        // THERMOS

        BABYLON.SceneLoader.ImportMeshAsync("thermos", "../../assets/glb/laboratory/", "thermos.glb", this.scene).then((result) => {
        });

        // POST-IT

        BABYLON.SceneLoader.ImportMeshAsync("post_it", "../../assets/glb/laboratory/", "post_it.glb", this.scene).then((result) => {
        });

        // MOTEBOOKS

        BABYLON.SceneLoader.ImportMeshAsync("notebook_bottom", "../../assets/glb/laboratory/", "notebook_bottom.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("notebook_top", "../../assets/glb/laboratory/", "notebook_top.glb", this.scene).then((result) => {
        });

        // 3D GLASSES

        this.threed_glasses_frame_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/threed_glasses_frame_BAKING.jpg", this.scene, false, false);
        this.threed_glasses_frame_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/threed_glasses_frame_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("threed_glasses_frame", "../../assets/glb/laboratory/", "threed_glasses_frame.glb", this.scene).then((result) => {
            this.threed_glasses_frame = this.scene.getMeshByName("threed_glasses_frame");
        });

        this.glass_blue_MATERIAL = new BABYLON.StandardMaterial("glass", this.scene);
        this.glass_blue_MATERIAL.diffuseColor = new BABYLON.Color3(0, 0, 1);
        this.glass_blue_MATERIAL.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.glass_blue_MATERIAL.alpha = 0.2;
        this.glass_blue_MATERIAL.specularPower = 16;
        this.glass_blue_MATERIAL.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_blue_MATERIAL.reflectionFresnelParameters.bias = 0.1;
        this.glass_blue_MATERIAL.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_blue_MATERIAL.emissiveFresnelParameters.bias = 0.6;
        this.glass_blue_MATERIAL.emissiveFresnelParameters.power = 4;
        this.glass_blue_MATERIAL.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        this.glass_blue_MATERIAL.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();
        this.glass_blue_MATERIAL.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_blue_MATERIAL.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        this.glass_blue_MATERIAL.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        BABYLON.SceneLoader.ImportMeshAsync("threed_glass_blue", "../../assets/glb/laboratory/", "threed_glass_blue.glb", this.scene).then((result) => {
            this.threed_glass_blue = this.scene.getMeshByName("threed_glass_blue");
            this.threed_glass_blue.material = this.glass_blue_MATERIAL;
        });

        this.glass_red_MATERIAL = new BABYLON.StandardMaterial("glass", this.scene);
        this.glass_red_MATERIAL.diffuseColor = new BABYLON.Color3(1, 0, 0);
        this.glass_red_MATERIAL.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.glass_red_MATERIAL.alpha = 0.2;
        this.glass_red_MATERIAL.specularPower = 16;
        this.glass_red_MATERIAL.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_red_MATERIAL.reflectionFresnelParameters.bias = 0.1;
        this.glass_red_MATERIAL.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_red_MATERIAL.emissiveFresnelParameters.bias = 0.6;
        this.glass_red_MATERIAL.emissiveFresnelParameters.power = 4;
        this.glass_red_MATERIAL.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        this.glass_red_MATERIAL.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();
        this.glass_red_MATERIAL.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.glass_red_MATERIAL.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        this.glass_red_MATERIAL.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        BABYLON.SceneLoader.ImportMeshAsync("threed_glass_red", "../../assets/glb/laboratory/", "threed_glass_red.glb", this.scene).then((result) => {
            this.threed_glass_red = this.scene.getMeshByName("threed_glass_red");
            this.threed_glass_red.material = this.glass_red_MATERIAL;
        });

        // COMPUTERS

        BABYLON.SceneLoader.ImportMeshAsync("mouse", "../../assets/glb/laboratory/", "mouse.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("keyboard", "../../assets/glb/laboratory/", "keyboard.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("keyboard_keyboard", "../../assets/glb/laboratory/", "keyboard_keyboard.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("support_laptop", "../../assets/glb/laboratory/", "support_laptop.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wood_box_center", "../../assets/glb/laboratory/", "wood_box_center.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wood_box_right", "../../assets/glb/laboratory/", "wood_box_right.glb", this.scene).then((result) => {
        });

        this.mac_mini_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/mac_mini_BAKING.jpg", this.scene, false, false);
        this.mac_mini_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/mac_mini_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.laptop_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/laptop_BAKING.jpg", this.scene, false, false);
        this.laptop_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/laptop_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.laptop_screen_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/laptop_screen_BAKING.jpg", this.scene, false, false);
        this.laptop_screen_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/laptop_screen_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.screen_center_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/screen_center_BAKING.jpg", this.scene, false, false);
        this.screen_center_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/screen_center_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.screen_right_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/screen_right_BAKING.jpg", this.scene, false, false);
        this.screen_right_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/screen_right_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("mac_mini", "../../assets/glb/laboratory/", "mac_mini.glb", this.scene).then((result) => {
            this.mac_mini = this.scene.getMeshByName("mac_mini");
        });

        BABYLON.SceneLoader.ImportMeshAsync("laptop", "../../assets/glb/laboratory/", "laptop.glb", this.scene).then((result) => {
            this.laptop = this.scene.getMeshByName("laptop");
        });

        BABYLON.SceneLoader.ImportMeshAsync("laptop_keyboard", "../../assets/glb/laboratory/", "laptop_keyboard.glb", this.scene).then((result) => {
            this.laptop_keyboard = this.scene.getMeshByName("laptop_keyboard");
        });

        BABYLON.SceneLoader.ImportMeshAsync("laptop_screen", "../../assets/glb/laboratory/", "laptop_screen.glb", this.scene).then((result) => {
            this.laptop_screen = this.scene.getMeshByName("laptop_screen");
        });

        BABYLON.SceneLoader.ImportMeshAsync("screen_frame_center", "../../assets/glb/laboratory/", "screen_frame_center.glb", this.scene).then((result) => {
            this.screen_frame_center = this.scene.getMeshByName("screen_frame_center");
        });

        BABYLON.SceneLoader.ImportMeshAsync("screen_center", "../../assets/glb/laboratory/", "screen_center.glb", this.scene).then((result) => {
            this.screen_center = this.scene.getMeshByName("screen_center");
        });

        BABYLON.SceneLoader.ImportMeshAsync("screen_frame_right", "../../assets/glb/laboratory/", "screen_frame_right.glb", this.scene).then((result) => {
            this.screen_frame_right = this.scene.getMeshByName("screen_frame_right");
        });

        BABYLON.SceneLoader.ImportMeshAsync("screen_right", "../../assets/glb/laboratory/", "screen_right.glb", this.scene).then((result) => {
            this.screen_right = this.scene.getMeshByName("screen_right");
        });
    }

    public animate(): void {
        this.ngZone.runOutsideAngular(() => {
            const rendererLoopCallback = () => {
                this.scene.render();
            };

            if (this.windowRef.document.readyState !== 'loading') {
                this.engine.runRenderLoop(rendererLoopCallback);
            } else {
                this.windowRef.window.addEventListener('DOMContentLoaded', () => {
                    this.engine.runRenderLoop(rendererLoopCallback);
                });
            }

            this.windowRef.window.addEventListener('resize', () => {
                this.engine.resize();
            });
        });
    }
}
