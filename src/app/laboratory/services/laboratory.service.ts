import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as MeshWriter from "meshwriter";

import { InteractionService } from './interaction.service';

import { CameraDatas } from '../../shared/models/camera-datas';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

    private innerWidth: any;
    private innerHeight: any;

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private arc_rotate_camera: BABYLON.ArcRotateCamera;
    private anaglyph_arc_rotate_camera: BABYLON.AnaglyphArcRotateCamera;

    private hemispheric_light: BABYLON.Light;
    private directional_light: BABYLON.DirectionalLight;

    private pegasus;
    private pegasus_inside;
    private pegasus_laces;
    private pegasus_logo;
    private pegasus_sole_inside;
    private pegasus_sole_outside;
    private WriterMesh;
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
    private chimney;
    private chimney_back;
    private logs;
    private checker;
    private checker_locks;
    private checker_bottom;
    private tarot_deck;
    private virgen_guadalupe;
    private candelstick;
    private wall_left_front;
    private wall_left_back;
    private mirror_frame;
    private mirror;
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
    private support_laptop;
    private wood_box_center;
    private wood_box_right;
    private mouse;
    private keyboard;
    private keyboard_keyboard;
    private mac_mini;
    private laptop;
    private laptop_keyboard;
    private laptop_screen;
    private screen_center;
    private screen_frame_center;
    private screen_right;
    private screen_frame_right;
    private wall_right_front;
    private wall_right_back;
    private baseboard_right;
    private window_left;
    private glass_left_top;
    private glass_left_bottom;
    private window_right;
    private glass_right_top;
    private glass_right_bottom;
    private nhs_rainbow;
    private solar_system;
    private pablo;
    private united_kingdom_black;
    private united_kingdom_blue;
    private united_kingdom_white;
    private united_kingdom_red;
    private france_black;
    private france_blue;
    private france_white;
    private spain_black;
    private spain_red;
    private spain_yellow;
    private france_red;
    private shelf;
    private book_strategie_choc;
    private book_no_logo;
    private book_serpent_cosmique;
    private book_meilleur_mondes;
    private book_dictionnaire_symboles;
    private book_prince;
    private book_ca_I;
    private book_ca_II;
    private book_ca_III;
    private book_sagrada_biblia;
    private book_nuit_enfants_rois;
    private world_map;
    private world_map_bar;
    private world_map_basement_metal;
    private world_map_basement_marble;
    private twitter;
    private instagram;
    private instagram_lens;
    private youtube;
    private youtube_play;
    private spotify_green;
    private spotify_black;
    private projector;

    private pop_up_running;
    private pop_up_share_knowledge
    private pop_up_photography_left;
    private pop_up_photography_right;
    private pop_up_games;
    private pop_up_contact_me;
    private pop_up_stereoscopy;
    private pop_up_development;
    private pop_up_social_networks;
    private pop_up_languages;
    private pop_up_art;
    private pop_up_travel;

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
    private keyboard_BAKING: BABYLON.Texture;
    private keyboard_BAKING_HIGHLIGHT: BABYLON.Texture;
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
    private world_map_BAKING: BABYLON.Texture;
    private world_map_BAKING_HIGHLIGHT: BABYLON.Texture;
    private united_kingdom_red_BAKING: BABYLON.Texture;
    private united_kingdom_red_BAKING_HIGHLIGHT: BABYLON.Texture;
    private united_kingdom_white_BAKING: BABYLON.Texture;
    private united_kingdom_white_BAKING_HIGHLIGHT: BABYLON.Texture;
    private united_kingdom_blue_BAKING: BABYLON.Texture;
    private united_kingdom_blue_BAKING_HIGHLIGHT: BABYLON.Texture;
    private france_blue_BAKING: BABYLON.Texture;
    private france_blue_BAKING_HIGHLIGHT: BABYLON.Texture;
    private france_white_BAKING: BABYLON.Texture;
    private france_white_BAKING_HIGHLIGHT: BABYLON.Texture;
    private france_red_BAKING: BABYLON.Texture;
    private france_red_BAKING_HIGHLIGHT: BABYLON.Texture;
    private spain_red_BAKING: BABYLON.Texture;
    private spain_red_BAKING_HIGHLIGHT: BABYLON.Texture;
    private spain_yellow_BAKING: BABYLON.Texture;
    private spain_yellow_BAKING_HIGHLIGHT: BABYLON.Texture;
    private twitter_BAKING: BABYLON.Texture;
    private twitter_BAKING_HIGHLIGHT: BABYLON.Texture;
    private instagram_BAKING: BABYLON.Texture;
    private instagram_BAKING_HIGHLIGHT: BABYLON.Texture;
    private instagram_lens_BAKING: BABYLON.Texture;
    private instagram_lens_BAKING_HIGHLIGHT: BABYLON.Texture;
    private youtube_BAKING: BABYLON.Texture;
    private youtube_BAKING_HIGHLIGHT: BABYLON.Texture;
    private youtube_play_BAKING: BABYLON.Texture;
    private youtube_play_BAKING_HIGHLIGHT: BABYLON.Texture;

    private mirror_MATERIAL: BABYLON.StandardMaterial;
    private glass_MATERIAL: BABYLON.StandardMaterial;
    private glass_blue_MATERIAL: BABYLON.StandardMaterial;
    private glass_red_MATERIAL: BABYLON.StandardMaterial;
    private projector_MATERIAL: BABYLON.StandardMaterial;

    private scene_loaded = false;
    private introduction_closed = false;

    private arc_rotate_camera_clone;
    private anaglyph_arc_rotate_camera_clone;

    private anaglyph_activated = false;

    private dashBoardCameraDatas: CameraDatas;

    public constructor(
        private ngZone: NgZone,
        private windowRef: WindowRefService,
        protected readonly interaction: InteractionService
    ) {}

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

        this.canvas = canvas.nativeElement;
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });
        this.scene = new BABYLON.Scene(this.engine);

        // CANERAS

        this.arc_rotate_camera = new BABYLON.ArcRotateCamera("arc_rotate_camera", 2.25, 1.05, 50, new BABYLON.Vector3(-16.2, 5, -12), this.scene);
        this.arc_rotate_camera.position = this.set_position_arcRotateCamera();
        this.arc_rotate_camera.lockedTarget = new BABYLON.Vector3(-16.2, 5, -12);
        this.arc_rotate_camera.lowerBetaLimit = -0.5;
        this.arc_rotate_camera.upperBetaLimit = 1.65;
        this.arc_rotate_camera.lowerRadiusLimit = 20;
        this.arc_rotate_camera.upperRadiusLimit = 65;
        this.arc_rotate_camera.attachControl(canvas, true);
        this.set_screenOffset_arcRotateCamera();

        this.anaglyph_arc_rotate_camera = new BABYLON.AnaglyphArcRotateCamera("anaglyph_arc_rotate_camera", 2.25, 1.05, 50, new BABYLON.Vector3(-16.2, 5, -12), 0.1, this.scene);
        this.anaglyph_arc_rotate_camera.lockedTarget =  new BABYLON.Vector3(-16.2, 5, -12);
        this.anaglyph_arc_rotate_camera.lowerBetaLimit = -0.5;
        this.anaglyph_arc_rotate_camera.upperBetaLimit = 1.65;
        this.anaglyph_arc_rotate_camera.lowerRadiusLimit = 20;
        this.anaglyph_arc_rotate_camera.upperRadiusLimit = 65;
        this.anaglyph_arc_rotate_camera.attachControl(canvas, true);
        this.set_screenOffset_anaglyphArcRotateCamera();

        var pipeline = new BABYLON.DefaultRenderingPipeline(
            "pipeline", // The name of the pipeline
            true, // Do you want the pipeline to use HDR texture?
            this.scene, // The scene instance
            [this.arc_rotate_camera] // The list of cameras to be attached to
        );

        pipeline.samples = 4;
        pipeline.fxaaEnabled = true;
        pipeline.bloomEnabled = true;
        pipeline.bloomKernel = 640;
        pipeline.bloomWeight = 1;
        pipeline.bloomThreshold = 0.3;
        pipeline.bloomScale = 0.5;

        pipeline.chromaticAberrationEnabled = true;
        pipeline.chromaticAberration.aberrationAmount = 30;
        pipeline.chromaticAberration.radialIntensity = 1;
        var rotation = 1;
        pipeline.chromaticAberration.direction.x = Math.sin(rotation);
        pipeline.chromaticAberration.direction.y = Math.cos(rotation);

        pipeline.grainEnabled = true;
        pipeline.grain.intensity = 7;

        // LIGHTS

        this.hemispheric_light = new BABYLON.HemisphericLight('hemispheric_light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.hemispheric_light.intensity = 0.6;

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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_running", "../../assets/glb/laboratory/", "pop_up_running.glb", this.scene).then((result) => {
            this.pop_up_running = this.scene.getMeshByName("pop_up_running");
            this.pop_up_running.isVisible = false;
        });

        let Writer = MeshWriter(this.scene, {scale: 1});
        let running  = new Writer(
                        "Running",
                        {
                            "anchor": "left",
                            "letter-height": 0.7,
                            "letter-thickness": 0.2,
                            "color": "#000000",
                            colors:{
                              diffuse  :"#000000",
                              specular :"#000000",
                              ambient  :"#000000",
                              emissive :"#000000"
                            },
                            "position": {
                              x: -12.3,
                              y: 2.1,
                              z: -1.9
                            }
                        }
                    );
        this.WriterMesh = running.getMesh();
        this.WriterMesh.rotation.x = -Math.PI/2;
        this.WriterMesh.rotation.z = Math.PI;
        this.WriterMesh.isVisible = false;

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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_share_knowledge", "../../assets/glb/laboratory/", "pop_up_share_knowledge.glb", this.scene).then((result) => {
            this.pop_up_share_knowledge = this.scene.getMeshByName("pop_up_share_knowledge");
            this.pop_up_share_knowledge.isVisible = false;
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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_photography_left", "../../assets/glb/laboratory/", "pop_up_photography_left.glb", this.scene).then((result) => {
            this.pop_up_photography_left = this.scene.getMeshByName("pop_up_photography_left");
            this.pop_up_photography_left.isVisible = false;
        });

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_photography_right", "../../assets/glb/laboratory/", "pop_up_photography_right.glb", this.scene).then((result) => {
            this.pop_up_photography_right = this.scene.getMeshByName("pop_up_photography_right");
            this.pop_up_photography_right.isVisible = false;
        });

        // CHIMNEY

        BABYLON.SceneLoader.ImportMeshAsync("chimney", "../../assets/glb/laboratory/", "chimney.glb", this.scene).then((result) => {
          this.chimney = this.scene.getMeshByName("chimney");
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

        // LOGS

        BABYLON.SceneLoader.ImportMeshAsync("logs", "../../assets/glb/laboratory/", "logs.glb", this.scene).then((result) => {
        });

        // FIRE SOURCE

        var fire_source = BABYLON.Mesh.CreateBox("foutain", 0.1, this.scene);
        fire_source.position = new BABYLON.Vector3(-0.2, 0, -9.4);

        // SMOKE

        var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, this.scene);
        smokeSystem.particleTexture = new BABYLON.Texture("../../assets/glb/laboratory/particles/smoke.png", this.scene);
        smokeSystem.emitter = fire_source;
        smokeSystem.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
        smokeSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

        smokeSystem.color1 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
        smokeSystem.color2 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
        smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        smokeSystem.minSize = 0.5;
        smokeSystem.maxSize = 1.5;

        smokeSystem.minLifeTime = 0.3;
        smokeSystem.maxLifeTime = 1.2;

        smokeSystem.emitRate = 150;
        smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

        smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
        smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

        smokeSystem.minAngularSpeed = 0;
        smokeSystem.maxAngularSpeed = Math.PI;

        smokeSystem.minEmitPower = 0.5;
        smokeSystem.maxEmitPower = 1.5;
        smokeSystem.updateSpeed = 0.005;

        smokeSystem.start();

        // FIRE

        var fireSystem = new BABYLON.ParticleSystem("particles", 1500, this.scene);
        fireSystem.particleTexture = new BABYLON.Texture("../../assets/glb/laboratory/particles/smoke.png", this.scene);
        fireSystem.emitter = fire_source;
        fireSystem.minEmitBox = new BABYLON.Vector3(-0.6, 1, -0.6);
        fireSystem.maxEmitBox = new BABYLON.Vector3(0.6, 1, 0.6);

        fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        fireSystem.minSize = 0.3;
        fireSystem.maxSize = 1;

        fireSystem.minLifeTime = 0.2;
        fireSystem.maxLifeTime = 0.4;

        fireSystem.emitRate = 300;

        fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

        fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
        fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

        fireSystem.minAngularSpeed = 0;
        fireSystem.maxAngularSpeed = Math.PI;

        fireSystem.minEmitPower = 1;
        fireSystem.maxEmitPower = 3;
        fireSystem.updateSpeed = 0.005;

        fireSystem.start();

        // CHECKER

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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_games", "../../assets/glb/laboratory/", "pop_up_games.glb", this.scene).then((result) => {
            this.pop_up_games = this.scene.getMeshByName("pop_up_games");
            this.pop_up_games.isVisible = false;
        });

        // VIRGEN

        BABYLON.SceneLoader.ImportMeshAsync("virgen_guadalupe", "../../assets/glb/laboratory/", "virgen_guadalupe.glb", this.scene).then((result) => {
        });

        // VIRGEN

        BABYLON.SceneLoader.ImportMeshAsync("book_programmer_java", "../../assets/glb/laboratory/", "book_programmer_java.glb", this.scene).then((result) => {
        });

        // CANDELSTICK

        BABYLON.SceneLoader.ImportMeshAsync("candelstick", "../../assets/glb/laboratory/", "candelstick.glb", this.scene).then((result) => {
          this.candelstick = this.scene.getMeshByName("candelstick");
        });

        // WALL LEFT

        BABYLON.SceneLoader.ImportMeshAsync("wall_left_front", "../../assets/glb/laboratory/", "wall_left_front.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wall_left_back", "../../assets/glb/laboratory/", "wall_left_back.glb", this.scene).then((result) => {
        });

        // MIRROR

        BABYLON.SceneLoader.ImportMeshAsync("mirror_frame", "../../assets/glb/laboratory/", "mirror_frame.glb", this.scene).then((result) => {
        });

        this.mirror = BABYLON.MeshBuilder.CreatePlane("mirror", {width: 5.8, height: 9.2}, this.scene);
        this.mirror.position = new BABYLON.Vector3(-0.01, 11.8, -9.3);
        this.mirror.rotation = new BABYLON.Vector3(0, 1.57, 0);

        this.mirror.computeWorldMatrix(true);
        var glass_worldMatrix = this.mirror.getWorldMatrix();

        var glass_vertexData = this.mirror.getVerticesData("normal");
        var glassNormal = new BABYLON.Vector3(glass_vertexData[0], glass_vertexData[1], glass_vertexData[2]);
        glassNormal = BABYLON.Vector3.TransformNormal(glassNormal, glass_worldMatrix);

        var reflector = BABYLON.Plane.FromPositionAndNormal(this.mirror.position, glassNormal.scale(-1));


        this.mirror_MATERIAL = new BABYLON.StandardMaterial("mirror_MATERIAL", this.scene);
        this.mirror_MATERIAL.diffuseColor = new BABYLON.Color3(0.13, 0.13, 0.17);

        this.mirror.material = this.mirror_MATERIAL;

        var mirrorTexture = new BABYLON.MirrorTexture("mirrorTexture", 1024, this.scene);
        mirrorTexture.level = 1;
        mirrorTexture.mirrorPlane = reflector;

        // Apply mirror texture
        this.mirror.material.reflectionTexture = mirrorTexture;

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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_art", "../../assets/glb/laboratory/", "pop_up_art.glb", this.scene).then((result) => {
            this.pop_up_art = this.scene.getMeshByName("pop_up_art");
            this.pop_up_art.isVisible = false;
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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_contact_me", "../../assets/glb/laboratory/", "pop_up_contact_me.glb", this.scene).then((result) => {
            this.pop_up_contact_me = this.scene.getMeshByName("pop_up_contact_me");
            this.pop_up_contact_me.isVisible = false;
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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_stereoscopy", "../../assets/glb/laboratory/", "pop_up_stereoscopy.glb", this.scene).then((result) => {
            this.pop_up_stereoscopy = this.scene.getMeshByName("pop_up_stereoscopy");
            this.pop_up_stereoscopy.isVisible = false;
        });

        // COMPUTERS

        BABYLON.SceneLoader.ImportMeshAsync("support_laptop", "../../assets/glb/laboratory/", "support_laptop.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wood_box_center", "../../assets/glb/laboratory/", "wood_box_center.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wood_box_right", "../../assets/glb/laboratory/", "wood_box_right.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("mouse", "../../assets/glb/laboratory/", "mouse.glb", this.scene).then((result) => {
        });

        this.keyboard_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/keyboard_BAKING.jpg", this.scene, false, false);
        this.keyboard_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/keyboard_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

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

        BABYLON.SceneLoader.ImportMeshAsync("keyboard", "../../assets/glb/laboratory/", "keyboard.glb", this.scene).then((result) => {
            this.keyboard = this.scene.getMeshByName("keyboard");
        });

        BABYLON.SceneLoader.ImportMeshAsync("keyboard_keyboard", "../../assets/glb/laboratory/", "keyboard_keyboard.glb", this.scene).then((result) => {
            this.keyboard_keyboard = this.scene.getMeshByName("keyboard_keyboard");
        });

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

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_development", "../../assets/glb/laboratory/", "pop_up_development.glb", this.scene).then((result) => {
            this.pop_up_development = this.scene.getMeshByName("pop_up_development");
            this.pop_up_development.isVisible = false;
        });

        // WALL RIGHT

        BABYLON.SceneLoader.ImportMeshAsync("wall_right_front", "../../assets/glb/laboratory/", "wall_right_front.glb", this.scene).then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("wall_right_back", "../../assets/glb/laboratory/", "wall_right_back.glb", this.scene).then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("baseboard_right", "../../assets/glb/laboratory/", "baseboard_right.glb", this.scene).then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("window_left", "../../assets/glb/laboratory/", "window_left.glb", this.scene).then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("glass_left_top", "../../assets/glb/laboratory/", "glass_left_top.glb", this.scene).then((result) => {
            this.glass_left_top = this.scene.getMeshByName("glass_left_top");
            this.glass_left_top.material = this.glass_MATERIAL;
        });

        BABYLON.SceneLoader.ImportMeshAsync("glass_left_bottom", "../../assets/glb/laboratory/", "glass_left_bottom.glb", this.scene).then((result) => {
            this.glass_left_bottom = this.scene.getMeshByName("glass_left_bottom");
            this.glass_left_bottom.material = this.glass_MATERIAL;
        });

        BABYLON.SceneLoader.ImportMeshAsync("window_right", "../../assets/glb/laboratory/", "window_right.glb", this.scene).then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("glass_right_top", "../../assets/glb/laboratory/", "glass_right_top.glb", this.scene).then((result) => {
            this.glass_right_top = this.scene.getMeshByName("glass_right_top");
            this.glass_right_top.material = this.glass_MATERIAL;
        });

        BABYLON.SceneLoader.ImportMeshAsync("glass_right_bottom", "../../assets/glb/laboratory/", "glass_right_bottom.glb", this.scene).then((result) => {
            this.glass_right_bottom = this.scene.getMeshByName("glass_right_bottom");
            this.glass_right_bottom.material = this.glass_MATERIAL;
        });

        // NHS RAINBOW

        BABYLON.SceneLoader.ImportMeshAsync("nhs_rainbow", "../../assets/glb/laboratory/", "nhs_rainbow.glb", this.scene).then((result) => {
        });

        // SOLAR SYSTEM

        BABYLON.SceneLoader.ImportMeshAsync("solar_system", "../../assets/glb/laboratory/", "solar_system.glb", this.scene).then((result) => {
        });

        // PABLO

        BABYLON.SceneLoader.ImportMeshAsync("pablo", "../../assets/glb/laboratory/", "pablo.glb", this.scene).then((result) => {
        });

        // LANGUAGES

        this.united_kingdom_red_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_red_BAKING.jpg", this.scene, false, false);
        this.united_kingdom_red_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_red_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.united_kingdom_white_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_white_BAKING.jpg", this.scene, false, false);
        this.united_kingdom_white_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_white_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.united_kingdom_blue_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_blue_BAKING.jpg", this.scene, false, false);
        this.united_kingdom_blue_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_blue_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("united_kingdom_black", "../../assets/glb/laboratory/", "united_kingdom_black.glb").then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("united_kingdom_blue", "../../assets/glb/laboratory/", "united_kingdom_blue.glb").then((result) => {
            this.united_kingdom_blue = this.scene.getMeshByName("united_kingdom_blue");
        });

        BABYLON.SceneLoader.ImportMeshAsync("united_kingdom_white", "../../assets/glb/laboratory/", "united_kingdom_white.glb").then((result) => {
            this.united_kingdom_white = this.scene.getMeshByName("united_kingdom_white");
        });

        BABYLON.SceneLoader.ImportMeshAsync("united_kingdom_red", "../../assets/glb/laboratory/", "united_kingdom_red.glb").then((result) => {
            this.united_kingdom_red = this.scene.getMeshByName("united_kingdom_red");
        });

        this.france_blue_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/france_blue_BAKING.jpg", this.scene, false, false);
        this.france_blue_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/united_kingdom_blue_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.france_white_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/france_white_BAKING.jpg", this.scene, false, false);
        this.france_white_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/france_white_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.france_red_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/france_red_BAKING.jpg", this.scene, false, false);
        this.france_red_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/france_red_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("france_black", "../../assets/glb/laboratory/", "france_black.glb").then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("france_blue", "../../assets/glb/laboratory/", "france_blue.glb").then((result) => {
            this.france_blue = this.scene.getMeshByName("france_blue");
        });

        BABYLON.SceneLoader.ImportMeshAsync("france_white", "../../assets/glb/laboratory/", "france_white.glb").then((result) => {
            this.france_white = this.scene.getMeshByName("france_white");
        });

        BABYLON.SceneLoader.ImportMeshAsync("france_red", "../../assets/glb/laboratory/", "france_red.glb").then((result) => {
            this.france_red = this.scene.getMeshByName("france_red");
        });

        this.spain_red_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/spain_red_BAKING.jpg", this.scene, false, false);
        this.spain_red_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/spain_red_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.spain_yellow_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/spain_yellow_BAKING.jpg", this.scene, false, false);
        this.spain_yellow_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/spain_yellow_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("spain_black", "../../assets/glb/laboratory/", "spain_black.glb").then((result) => {
        });

        BABYLON.SceneLoader.ImportMeshAsync("spain_red", "../../assets/glb/laboratory/", "spain_red.glb").then((result) => {
            this.spain_red = this.scene.getMeshByName("spain_red");
        });

        BABYLON.SceneLoader.ImportMeshAsync("spain_yellow", "../../assets/glb/laboratory/", "spain_yellow.glb").then((result) => {
            this.spain_yellow = this.scene.getMeshByName("spain_yellow");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_languages", "../../assets/glb/laboratory/", "pop_up_languages.glb", this.scene).then((result) => {
            this.pop_up_languages = this.scene.getMeshByName("pop_up_languages");
            this.pop_up_languages.isVisible = false;
        });

        // OWL

        BABYLON.SceneLoader.ImportMeshAsync("owl", "../../assets/glb/laboratory/", "owl.glb").then((result) => {
        });

        // SHELF

        BABYLON.SceneLoader.ImportMeshAsync("shelf", "../../assets/glb/laboratory/", "shelf.glb", this.scene).then((result) => {
        });

        // BOOKS

        BABYLON.SceneLoader.ImportMeshAsync("book_strategie_choc", "../../assets/glb/laboratory/", "book_strategie_choc.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_no_logo", "../../assets/glb/laboratory/", "book_no_logo.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_serpent_cosmique", "../../assets/glb/laboratory/", "book_serpent_cosmique.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_meilleur_mondes", "../../assets/glb/laboratory/", "book_meilleur_mondes.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_dictionnaire_symboles", "../../assets/glb/laboratory/", "book_dictionnaire_symboles.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_prince", "../../assets/glb/laboratory/", "book_prince.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_ca_I", "../../assets/glb/laboratory/", "book_ca_I.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_ca_II", "../../assets/glb/laboratory/", "book_ca_II.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_ca_III", "../../assets/glb/laboratory/", "book_ca_III.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_sagrada_biblia", "../../assets/glb/laboratory/", "book_sagrada_biblia.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("book_nuit_enfants_rois", "../../assets/glb/laboratory/", "book_nuit_enfants_rois.glb", this.scene).then((result) => {
        });

        // WORLD MAP

        this.world_map_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/world_map_BAKING.jpg", this.scene, false, false);
        this.world_map_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/world_map_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("world_map", "../../assets/glb/laboratory/", "world_map.glb", this.scene).then((result) => {
            this.world_map = this.scene.getMeshByName("world_map");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_travel", "../../assets/glb/laboratory/", "pop_up_travel.glb", this.scene).then((result) => {
            this.pop_up_travel = this.scene.getMeshByName("pop_up_travel");
            this.pop_up_travel.isVisible = false;
        });

        BABYLON.SceneLoader.ImportMeshAsync("world_map_bar", "../../assets/glb/laboratory/", "world_map_bar.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("world_map_basement_metal", "../../assets/glb/laboratory/", "world_map_basement_metal.glb", this.scene).then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("world_map_basement_marble", "../../assets/glb/laboratory/", "world_map_basement_marble.glb", this.scene).then((result) => {
        });

        // SOCIAL NETWORKS

        this.twitter_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/twitter_BAKING.jpg", this.scene, false, false);
        this.twitter_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/twitter_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("twitter", "../../assets/glb/laboratory/", "twitter.glb").then((result) => {
            this.twitter = this.scene.getMeshByName("twitter");
        });

        this.instagram_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/instagram_BAKING.jpg", this.scene, false, false);
        this.instagram_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/instagram_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("instagram", "../../assets/glb/laboratory/", "instagram.glb").then((result) => {
            this.instagram = this.scene.getMeshByName("instagram");
        });

        BABYLON.SceneLoader.ImportMeshAsync("instagram_lens", "../../assets/glb/laboratory/", "instagram_lens.glb").then((result) => {
            this.instagram_lens = this.scene.getMeshByName("instagram_lens");
        });

        this.youtube_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/youtube_BAKING.jpg", this.scene, false, false);
        this.youtube_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/youtube_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.youtube_play_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/youtube_play_BAKING.jpg", this.scene, false, false);
        this.youtube_play_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/youtube_play_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("youtube", "../../assets/glb/laboratory/", "youtube.glb").then((result) => {
            this.youtube = this.scene.getMeshByName("youtube");
        });

        BABYLON.SceneLoader.ImportMeshAsync("youtube_play", "../../assets/glb/laboratory/", "youtube_play.glb").then((result) => {
            this.youtube_play = this.scene.getMeshByName("youtube_play");
        });

        BABYLON.SceneLoader.ImportMeshAsync("pop_up_social_networks", "../../assets/glb/laboratory/", "pop_up_social_networks.glb", this.scene).then((result) => {
            this.pop_up_social_networks = this.scene.getMeshByName("pop_up_social_networks");
            this.pop_up_social_networks.isVisible = false;
        });

        BABYLON.SceneLoader.ImportMeshAsync("spotify_green", "../../assets/glb/laboratory/", "spotify_green.glb").then((result) => {
            this.spotify_green = this.scene.getMeshByName("spotify_green");
        });

        BABYLON.SceneLoader.ImportMeshAsync("spotify_black", "../../assets/glb/laboratory/", "spotify_black.glb").then((result) => {
            this.spotify_black = this.scene.getMeshByName("spotify_black");
        });

        // PROJECTOR

        this.projector = BABYLON.MeshBuilder.CreatePlane("projector", {width: 12, height: 6.75}, this.scene);
        this.projector = this.scene.getMeshByName("projector");
        this.projector.position = new BABYLON.Vector3(-32.4 , 13.5, -7);
        this.projector.rotation = new BABYLON.Vector3(0, -1.57, 0);

        this.projector_MATERIAL = new BABYLON.StandardMaterial("projectorMaterial", this.scene);
        var videoTexture = new BABYLON.VideoTexture("videoTexture","../../assets/videos/pi.mp4", this.scene);
        this.projector_MATERIAL.roughness = 1;
        this.projector_MATERIAL.emissiveColor = BABYLON.Color3.White();
        this.projector_MATERIAL.diffuseTexture = videoTexture;
        this.projector_MATERIAL.alpha = 0.3;

        this.projector.material = this.projector_MATERIAL;

        videoTexture.onUserActionRequestedObservable.add(() => {
            this.scene.onPointerDown = function () {
              videoTexture.video.play();
            }
        });
    }

    // WINDOW DIMENSIONS

    public set_windowDimensions(width, height) {
        this.innerWidth = width;
        this.innerHeight = height;
    }

    private set_position_arcRotateCamera(): BABYLON.Vector3 {
        if(this.innerWidth <= 576) {
            return  new BABYLON.Vector3(-59.04388072040179, 41.984937572060815, 19.96116827662512);
        } else if(this.innerWidth <= 768) {
            return  new BABYLON.Vector3(-59.04388072040179, 41.984937572060815, 19.96116827662512);
        } else if(this.innerWidth <= 960) {
            return  new BABYLON.Vector3(-61.23476386994071, 43.72690671763587, 14.402589631742835);
        } else if(this.innerWidth <= 1140) {
            return new BABYLON.Vector3(-46.508958490944536, 28.192754202903267, -0.020789454918398675);
        } else {
            return new BABYLON.Vector3(-43.44461950276187, 29.878552394586347, 21.74593810963846);
        }
    }

    private get_screenOffset_arcRotateCamera(): BABYLON.Vector2 {
      if(this.innerWidth <= 576) {
          return new BABYLON.Vector2(0, 0.5);
      } else if(this.innerWidth <= 768) {
          return  new BABYLON.Vector2(0, 0.5);
      } else if(this.innerWidth <= 960) {
          return  new BABYLON.Vector2(10, 0.5);
      } else if(this.innerWidth <= 1140) {
          return new BABYLON.Vector2(5, 0.5);
      } else {
          return  new BABYLON.Vector2(10, 0.5);
      }
    }

    private set_screenOffset_arcRotateCamera() {
        if(this.innerWidth <= 576) {
            this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(0, 0.5);
        } else if(this.innerWidth <= 768) {
            this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(0, 0.5);
        } else if(this.innerWidth <= 960) {
            this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(10, 0.5);
        } else if(this.innerWidth <= 1140) {
            this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(7, 0.5);
        } else {
            this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(10, 0.5);
        }
    }

    private set_screenOffset_anaglyphArcRotateCamera() {
        if(this.innerWidth <= 576) {
            this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(0, 7);
        } else if(this.innerWidth <= 768) {
            this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(0, 5);
        } else if(this.innerWidth <= 960) {
            this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(10, 3);
        } else if(this.innerWidth <= 1140) {
          this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(5, 0.5);
        } else {
            this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(10, 0.5);
        }
    }

    // IS LOADED

    private sceneIsLoaded() {
        if(!this.scene_loaded) {
            this.scene_loaded = true;
            this.interaction.isLoaded.next();
            this.addActions_buttons();
        }
    }

    // ADD ACTIONS

    public addActions_buttons() {
        this.addActions_Pegasus();
        this.addActions_PegasusInside();
        this.addActions_PegasusLaces();
        this.addActions_PegasusLogo();
        this.addActions_PegasusSoleOutside();
        this.addActions_PegasusSoleInside();
        this.addActions_TransfertBoxes();
        this.addActions_TransfertBoxesRings();
        this.addActions_RoseRouge();
        this.addActions_RoseRougeFrame();
        this.addActions_VerbalShoota();
        this.addActions_VerbalShootaFrame();
        this.addActions_LapinBlanc();
        this.addActions_LapinBlancFrame();
        this.addActions_FourtyFour();
        this.addActions_FourtyFourMarieLouise();
        this.addActions_FourtyFourFrame();
        this.addActions_Brique();
        this.addActions_BriqueMarieLouise();
        this.addActions_BriqueFrame();
        this.addActions_Tofu();
        this.addActions_TofuMarieLouise();
        this.addActions_TofuFrame();
        this.addActions_Checker();
        this.addActions_CheckerLocks();
        this.addActions_TarotDeck();
        this.addActions_ThreedGlassesFrame();
        this.addActions_ThreedGlassBlue();
        this.addActions_ThreedGlassRed();
        this.addActions_AmorAmor();
        this.addActions_AmorAmorFrame();
        this.addActions_ViaAirMail();
        this.addActions_Keyboard();
        this.addActions_KeyboardKeyboard();
        this.addActions_MacMini();
        this.addActions_Laptop();
        this.addActions_LaptopKeyboard();
        this.addActions_LaptopScreen();
        this.addActions_ScreenCenter();
        this.addActions_ScreenFrameCenter();
        this.addActions_ScreenRight();
        this.addActions_ScreenFrameRight();
        this.addActions_WorldMap();
        this.addActions_Twitter();
        this.addActions_Instagram();
        this.addActions_InstagramLens();
        this.addActions_Youtube();
        this.addActions_YoutubePlay();
        this.addActions_UnitedKingdomRed();
        this.addActions_UnitedKingdomWhite();
        this.addActions_UnitedKingdomBlue();
        this.addActions_FranceBlue();
        this.addActions_FranceWhite();
        this.addActions_FranceRed();
        this.addActions_SpainRed();
        this.addActions_SpainYellow();
    }

    private activation_buttons() {
        this.pegasus.isPickable = true;
        this.pegasus_inside.isPickable = true;
        this.pegasus_laces.isPickable = true;
        this.pegasus_logo.isPickable = true;
        this.pegasus_sole_outside.isPickable = true;
        this.pegasus_sole_inside.isPickable = true;
        this.transfert_boxes.isPickable = true;
        this.transfert_boxes_rings.isPickable = true;
        this.rose_rouge.isPickable = true;
        this.rose_rouge_frame.isPickable = true;
        this.verbal_shoota.isPickable = true;
        this.verbal_shoota_frame.isPickable = true;
        this.lapin_blanc.isPickable = true;
        this.lapin_blanc_frame.isPickable = true;
        this.fourty_four.isPickable = true;
        this.fourty_four_marie_louise.isPickable = true;
        this.fourty_four_frame.isPickable = true;
        this.brique.isPickable = true;
        this.brique_marie_louise.isPickable = true;
        this.brique_frame.isPickable = true;
        this.tofu.isPickable = true;
        this.tofu_marie_louise.isPickable = true;
        this.tofu_frame.isPickable = true;
        this.checker.isPickable = true;
        this.checker_locks.isPickable = true;
        this.tarot_deck.isPickable = true;
        this.threed_glasses_frame.isPickable = true;
        this.threed_glass_blue.isPickable = true;
        this.threed_glass_red.isPickable = true;
        this.amor_amor.isPickable = true;
        this.amor_amor_frame.isPickable = true;
        this.via_air_mail.isPickable = true;
        this.mac_mini.isPickable = true;
        this.laptop.isPickable = true;
        this.laptop_keyboard.isPickable = true;
        this.laptop_screen.isPickable = true;
        this.screen_center.isPickable = true;
        this.screen_frame_center.isPickable = true;
        this.screen_right.isPickable = true;
        this.screen_frame_right.isPickable = true;
        this.world_map.isPickable = true;
        this.twitter.isPickable = true;
        this.instagram.isPickable = true;
        this.instagram_lens.isPickable = true;
        this.youtube.isPickable = true;
        this.youtube_play.isPickable = true;
        this.pop_up_running.isPickable = true;
    }

    private desactivation_buttons() {
        this.pegasus.isPickable = false;
        this.pegasus_inside.isPickable = false;
        this.pegasus_laces.isPickable = false;
        this.pegasus_logo.isPickable = false;
        this.pegasus_sole_outside.isPickable = false;
        this.pegasus_sole_inside.isPickable = false;
        this.transfert_boxes.isPickable = false;
        this.transfert_boxes_rings.isPickable = false;
        this.rose_rouge.isPickable = false;
        this.rose_rouge_frame.isPickable = false;
        this.verbal_shoota.isPickable = false;
        this.verbal_shoota_frame.isPickable = false;
        this.lapin_blanc.isPickable = false;
        this.lapin_blanc_frame.isPickable = false;
        this.fourty_four.isPickable = false;
        this.fourty_four_marie_louise.isPickable = false;
        this.fourty_four_frame.isPickable = false;
        this.brique.isPickable = false;
        this.brique_marie_louise.isPickable = false;
        this.brique_frame.isPickable = false;
        this.tofu.isPickable = false;
        this.tofu_marie_louise.isPickable = false;
        this.tofu_frame.isPickable = false;
        this.checker.isPickable = false;
        this.checker_locks.isPickable = false;
        this.tarot_deck.isPickable = false;
        this.threed_glasses_frame.isPickable = false;
        this.threed_glass_blue.isPickable = false;
        this.threed_glass_red.isPickable = false;
        this.amor_amor.isPickable = false;
        this.amor_amor_frame.isPickable = false;
        this.via_air_mail.isPickable = false;
        this.mac_mini.isPickable = false;
        this.laptop.isPickable = false;
        this.laptop_keyboard.isPickable = false;
        this.laptop_screen.isPickable = false;
        this.screen_center.isPickable = false;
        this.screen_frame_center.isPickable = false;
        this.screen_right.isPickable = false;
        this.screen_frame_right.isPickable = false;
        this.world_map.isPickable = false;
        this.twitter.isPickable = false;
        this.instagram.isPickable = false;
        this.instagram_lens.isPickable = false;
        this.youtube.isPickable = false;
        this.youtube_play.isPickable = false;
        this.pop_up_running.isPickable = false;
    }

    private addActions_Pegasus() {
        this.pegasus.isPickable = true;
        this.pegasus.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_PegasusInside() {
        this.pegasus_inside.isPickable = true;
        this.pegasus_inside.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus_inside.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus_inside},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_PegasusLaces() {
        this.pegasus_laces.isPickable = true;
        this.pegasus_laces.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus_laces.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus_laces.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus_laces},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus_laces.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_PegasusLogo() {
        this.pegasus_logo.isPickable = true;
        this.pegasus_logo.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus_logo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus_logo.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus_logo},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus_logo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_PegasusSoleOutside() {
        this.pegasus_sole_outside.isPickable = true;
        this.pegasus_sole_outside.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus_sole_outside},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus_sole_outside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_PegasusSoleInside() {
        this.pegasus_sole_inside.isPickable = true;
        this.pegasus_sole_inside.actionManager = new BABYLON.ActionManager(this.scene);

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING_HIGHLIGHT));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus.material, "albedoTexture", this.pegasus_BAKING));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING_HIGHLIGHT));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_laces.material, "albedoTexture", this.pegasus_laces_BAKING));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING_HIGHLIGHT));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_inside.material, "albedoTexture", this.pegasus_sole_inside_BAKING));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING_HIGHLIGHT));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.pegasus_sole_outside.material, "albedoTexture", this.pegasus_sole_outside_BAKING));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_running.isVisible = true));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_running.isVisible = false));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.WriterMesh.isVisible = true));
        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.WriterMesh.isVisible = false));

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.pegasus_sole_inside},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => console.log("Pegasus"))
                ]
            )
        );

        this.pegasus_sole_inside.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_running.next()));
    }

    private addActions_TransfertBoxes() {
        this.transfert_boxes.isPickable = true;
        this.transfert_boxes.actionManager = new BABYLON.ActionManager(this.scene);

        this.transfert_boxes.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.transfert_boxes.material, "albedoTexture", this.transfert_boxes_BAKING_HIGHLIGHT));
        this.transfert_boxes.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.transfert_boxes.material, "albedoTexture", this.transfert_boxes_BAKING));

        this.transfert_boxes.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.transfert_boxes_rings.material, "albedoTexture", this.transfert_boxes_rings_BAKING_HIGHLIGHT));
        this.transfert_boxes.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.transfert_boxes_rings.material, "albedoTexture", this.transfert_boxes_rings_BAKING));

        this.transfert_boxes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_share_knowledge.isVisible = true));
        this.transfert_boxes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_share_knowledge.isVisible = false));

        this.transfert_boxes.actionManager.registerAction(
            new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.transfert_boxes},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
              )
        );

        this.transfert_boxes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_shareKnowledge.next()));
    }

    private addActions_TransfertBoxesRings() {
        this.transfert_boxes_rings.isPickable = true;
        this.transfert_boxes_rings.actionManager = new BABYLON.ActionManager(this.scene);

        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.transfert_boxes.material, "albedoTexture", this.transfert_boxes_BAKING_HIGHLIGHT));
        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.transfert_boxes.material, "albedoTexture", this.transfert_boxes_BAKING));

        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.transfert_boxes_rings.material, "albedoTexture", this.transfert_boxes_rings_BAKING_HIGHLIGHT));
        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.transfert_boxes_rings.material, "albedoTexture", this.transfert_boxes_rings_BAKING));

        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_share_knowledge.isVisible = true));
        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_share_knowledge.isVisible = false));

        this.transfert_boxes_rings.actionManager.registerAction(
            new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.transfert_boxes_rings},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
              )
        );

        this.transfert_boxes_rings.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_shareKnowledge.next()));
    }

    private addActions_RoseRouge() {
        this.rose_rouge.isPickable = true;
        this.rose_rouge.actionManager = new BABYLON.ActionManager(this.scene);

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.rose_rouge.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.rose_rouge.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.rose_rouge.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.rose_rouge},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.rose_rouge.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_RoseRougeFrame() {
        this.rose_rouge_frame.isPickable = true;
        this.rose_rouge_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.rose_rouge_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.rose_rouge_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_VerbalShoota() {
        this.verbal_shoota.isPickable = true;
        this.verbal_shoota.actionManager = new BABYLON.ActionManager(this.scene);

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_right.isVisible = true));
        this.verbal_shoota.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_right.isVisible = false));

        this.verbal_shoota.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.verbal_shoota},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.verbal_shoota.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_VerbalShootaFrame() {
        this.verbal_shoota_frame.isPickable = true;
        this.verbal_shoota_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_right.isVisible = true));
        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_right.isVisible = false));

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.verbal_shoota_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.verbal_shoota_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_LapinBlanc() {
        this.lapin_blanc.isPickable = true;
        this.lapin_blanc.actionManager = new BABYLON.ActionManager(this.scene);

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_right.isVisible = true));
        this.lapin_blanc.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_right.isVisible = false));

        this.lapin_blanc.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.lapin_blanc},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.lapin_blanc.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_LapinBlancFrame() {
        this.lapin_blanc_frame.isPickable = true;
        this.lapin_blanc_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_right.isVisible = true));
        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_right.isVisible = false));

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.lapin_blanc},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.lapin_blanc_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_FourtyFour() {
        this.fourty_four.isPickable = true;
        this.fourty_four.actionManager = new BABYLON.ActionManager(this.scene);

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.fourty_four.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.fourty_four.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.fourty_four.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.fourty_four},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.fourty_four.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_FourtyFourMarieLouise() {
        this.fourty_four_marie_louise.isPickable = true;
        this.fourty_four_marie_louise.actionManager = new BABYLON.ActionManager(this.scene);

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.fourty_four_marie_louise},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.fourty_four_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_FourtyFourFrame() {
        this.fourty_four_frame.isPickable = true;
        this.fourty_four_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.fourty_four_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.fourty_four_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.fourty_four_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_Brique() {
        this.brique.isPickable = true;
        this.brique.actionManager = new BABYLON.ActionManager(this.scene);

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.brique.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.brique.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.brique.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.brique.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.brique},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.brique.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_BriqueMarieLouise() {
        this.brique_marie_louise.isPickable = true;
        this.brique_marie_louise.actionManager = new BABYLON.ActionManager(this.scene);

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.brique_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.brique_marie_louise},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.brique_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_BriqueFrame() {
        this.brique_frame.isPickable = true;
        this.brique_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.brique_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.brique_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.brique_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.brique_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.brique_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.brique_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_Tofu() {
        this.tofu.isPickable = true;
        this.tofu.actionManager = new BABYLON.ActionManager(this.scene);

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.tofu.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.tofu.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.tofu.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.tofu.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.tofu},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.tofu.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }


    private addActions_TofuMarieLouise() {
        this.tofu_marie_louise.isPickable = true;
        this.tofu_marie_louise.actionManager = new BABYLON.ActionManager(this.scene);

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.tofu_marie_louise},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.tofu_marie_louise.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_TofuFrame() {
        this.tofu_frame.isPickable = true;
        this.tofu_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.rose_rouge.material, "albedoTexture", this.rose_rouge_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.verbal_shoota.material, "albedoTexture", this.verbal_shoota_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.lapin_blanc.material, "albedoTexture", this.lapin_blanc_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four.material, "albedoTexture", this.fourty_four_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique.material, "albedoTexture", this.brique_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique.material, "albedoTexture", this.brique_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu.material, "albedoTexture", this.tofu_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.fourty_four_marie_louise.material, "albedoTexture", this.fourty_four_marie_louise_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.brique_marie_louise.material, "albedoTexture", this.brique_marie_louise_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING_HIGHLIGHT));
        this.tofu_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tofu_marie_louise.material, "albedoTexture", this.tofu_marie_louise_BAKING));

        this.tofu_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_photography_left.isVisible = true));
        this.tofu_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_photography_left.isVisible = false));

        this.tofu_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.tofu_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.tofu_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photography.next()));
    }

    private addActions_Checker() {
        this.checker.isPickable = true;
        this.checker.actionManager = new BABYLON.ActionManager(this.scene);

        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker.material, "albedoTexture", this.checker_BAKING_HIGHLIGHT));
        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker.material, "albedoTexture", this.checker_BAKING));

        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING_HIGHLIGHT));
        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING));

        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING_HIGHLIGHT));
        this.checker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING));

        this.checker.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_games.isVisible = true));
        this.checker.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_games.isVisible = false));

        this.checker.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.checker},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.checker.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_games.next()));
    }

    private addActions_CheckerLocks(){
        this.checker_locks.isPickable = true;
        this.checker_locks.actionManager = new BABYLON.ActionManager(this.scene);

        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker.material, "albedoTexture", this.checker_BAKING_HIGHLIGHT));
        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker.material, "albedoTexture", this.checker_BAKING));

        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING_HIGHLIGHT));
        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING));

        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING_HIGHLIGHT));
        this.checker_locks.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING));

        this.checker_locks.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_games.isVisible = true));
        this.checker_locks.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_games.isVisible = false));

        this.checker_locks.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.checker_locks},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.checker_locks.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_games.next()));
    }

    private addActions_TarotDeck() {
        this.tarot_deck.isPickable = true;
        this.tarot_deck.actionManager = new BABYLON.ActionManager(this.scene);

        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker.material, "albedoTexture", this.checker_BAKING_HIGHLIGHT));
        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker.material, "albedoTexture", this.checker_BAKING));

        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING_HIGHLIGHT));
        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.checker_locks.material, "albedoTexture", this.checker_locks_BAKING));

        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING_HIGHLIGHT));
        this.tarot_deck.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.tarot_deck.material, "albedoTexture", this.tarot_deck_BAKING));

        this.tarot_deck.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_games.isVisible = true));
        this.tarot_deck.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_games.isVisible = false));

        this.tarot_deck.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.tarot_deck},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.tarot_deck.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_games.next()));
    }

    private addActions_ThreedGlassesFrame() {
        this.threed_glasses_frame.isPickable = true;
        this.threed_glasses_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glasses_frame .material, "albedoTexture", this.threed_glasses_frame_BAKING_HIGHLIGHT));
        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glasses_frame .material, "albedoTexture", this.threed_glasses_frame_BAKING));

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", true));
        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", false));

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", true));
        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", false));

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_stereoscopy.isVisible = true));
        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_stereoscopy.isVisible = false));

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.threed_glasses_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.threed_glasses_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_stereoscopy.next()));
    }

    private addActions_ThreedGlassBlue() {
        this.threed_glass_blue.isPickable = true;
        this.threed_glass_blue.actionManager = new BABYLON.ActionManager(this.scene);

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glasses_frame.material, "albedoTexture", this.threed_glasses_frame_BAKING_HIGHLIGHT));
        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glasses_frame.material, "albedoTexture", this.threed_glasses_frame_BAKING));

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", true));
        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", false));

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", true));
        this.threed_glass_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", false));

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_stereoscopy.isVisible = true));
        this.threed_glass_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_stereoscopy.isVisible = false));

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.threed_glass_blue},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.threed_glass_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_stereoscopy.next()));
    }

    private addActions_ThreedGlassRed() {
        this.threed_glass_red.isPickable = true;
        this.threed_glass_red.actionManager = new BABYLON.ActionManager(this.scene);

        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glasses_frame.material, "albedoTexture", this.threed_glasses_frame_BAKING_HIGHLIGHT));
        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glasses_frame.material, "albedoTexture", this.threed_glasses_frame_BAKING));

        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", true));
        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_blue.material, "useEmissiveAsIllumination", false));

        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", true));
        this.threed_glass_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.threed_glass_red.material, "useEmissiveAsIllumination", false));

        this.threed_glass_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_stereoscopy.isVisible = true));
        this.threed_glass_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_stereoscopy.isVisible = false));

        this.threed_glass_red.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.threed_glass_red},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.threed_glass_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_stereoscopy.next()));
    }

    private addActions_AmorAmor() {
        this.amor_amor.isPickable = true;
        this.amor_amor.actionManager = new BABYLON.ActionManager(this.scene);

        this.amor_amor.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.amor_amor.material, "albedoTexture", this.amor_amor_BAKING_HIGHLIGHT));
        this.amor_amor.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.amor_amor.material, "albedoTexture", this.amor_amor_BAKING));

        this.amor_amor.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_art.isVisible = true));
        this.amor_amor.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_art.isVisible = false));

        this.amor_amor.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.amor_amor},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.amor_amor.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_art.next()));
    }

    private addActions_AmorAmorFrame() {
        this.amor_amor_frame.isPickable = true;
        this.amor_amor_frame.actionManager = new BABYLON.ActionManager(this.scene);

        this.amor_amor_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.amor_amor.material, "albedoTexture", this.amor_amor_BAKING_HIGHLIGHT));
        this.amor_amor_frame.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.amor_amor.material, "albedoTexture", this.amor_amor_BAKING));

        this.amor_amor_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_art.isVisible = true));
        this.amor_amor_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_art.isVisible = false));

        this.amor_amor_frame.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.amor_amor_frame},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.amor_amor_frame.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_art.next()));
    }

    private addActions_ViaAirMail() {
        this.via_air_mail.isPickable = true;
        this.via_air_mail.actionManager = new BABYLON.ActionManager(this.scene);

        this.via_air_mail.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.via_air_mail.material, "albedoTexture", this.via_air_mail_BAKING_HIGHLIGHT));
        this.via_air_mail.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.via_air_mail.material, "albedoTexture", this.via_air_mail_BAKING));

        this.via_air_mail.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_contact_me.isVisible = true));
        this.via_air_mail.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_contact_me.isVisible = false));

        this.via_air_mail.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.via_air_mail},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.via_air_mail.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_contactMe.next()));
    }

    private addActions_Keyboard() {
        this.keyboard.isPickable = true;
        this.keyboard.actionManager = new BABYLON.ActionManager(this.scene);

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.keyboard.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.mac_mini},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_KeyboardKeyboard() {
        this.keyboard_keyboard.isPickable = true;
        this.keyboard_keyboard.actionManager = new BABYLON.ActionManager(this.scene);

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.mac_mini},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.keyboard_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_MacMini() {
        this.mac_mini.isPickable = true;
        this.mac_mini.actionManager = new BABYLON.ActionManager(this.scene);

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.mac_mini.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.mac_mini.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.mac_mini.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.mac_mini.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.mac_mini},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.mac_mini.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_Laptop() {
        this.laptop.isPickable = true;
        this.laptop.actionManager = new BABYLON.ActionManager(this.scene);

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.laptop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.laptop.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.laptop.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.laptop.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.laptop},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.laptop.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_LaptopKeyboard() {
        this.laptop_keyboard.isPickable = true;
        this.laptop_keyboard.actionManager = new BABYLON.ActionManager(this.scene);

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.laptop_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.laptop_keyboard},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.laptop_keyboard.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_LaptopScreen() {
        this.laptop_screen.isPickable = true;
        this.laptop_screen.actionManager = new BABYLON.ActionManager(this.scene);

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.laptop_screen.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.laptop_screen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.laptop_screen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.laptop_screen.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.laptop_screen},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.laptop_screen.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_ScreenCenter() {
        this.screen_center.isPickable = true;
        this.screen_center.actionManager = new BABYLON.ActionManager(this.scene);

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.screen_center.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.screen_center},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_ScreenFrameCenter() {
        this.screen_frame_center.isPickable = true;
        this.screen_frame_center.actionManager = new BABYLON.ActionManager(this.scene);

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.screen_frame_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.screen_frame_center.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.screen_frame_center},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.screen_frame_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_ScreenRight() {
        this.screen_center.isPickable = true;
        this.screen_center.actionManager = new BABYLON.ActionManager(this.scene);

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.screen_center.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.screen_center.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.screen_center},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.screen_center.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_ScreenFrameRight() {
        this.screen_frame_right.isPickable = true;
        this.screen_frame_right.actionManager = new BABYLON.ActionManager(this.scene);

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.keyboard.material, "albedoTexture", this.keyboard_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop.material, "albedoTexture", this.laptop_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.laptop_screen.material, "albedoTexture", this.laptop_screen_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_center.material, "albedoTexture", this.screen_center_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.screen_right.material, "albedoTexture", this.screen_right_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING_HIGHLIGHT));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mac_mini.material, "albedoTexture", this.mac_mini_BAKING));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_development.isVisible = true));
        this.screen_frame_right.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_development.isVisible = false));

        this.screen_frame_right.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.screen_frame_right},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.screen_frame_right.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_development.next()));
    }

    private addActions_WorldMap() {
        this.world_map.isPickable = true;
        this.world_map.actionManager = new BABYLON.ActionManager(this.scene);

        this.world_map.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.world_map.material, "albedoTexture", this.world_map_BAKING_HIGHLIGHT));
        this.world_map.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.world_map.material, "albedoTexture", this.world_map_BAKING));

        this.world_map.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_travel.isVisible = true));
        this.world_map.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_travel.isVisible = false));

        this.world_map.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.world_map},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_camera_open()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons())
                ]
            )
        );

        this.world_map.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_travel.next()));
    }

    private addActions_Twitter() {
        this.twitter.isPickable = true;
        this.twitter.actionManager = new BABYLON.ActionManager(this.scene);

        this.twitter.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.twitter.material, "albedoTexture", this.twitter_BAKING_HIGHLIGHT));
        this.twitter.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.twitter.material, "albedoTexture", this.twitter_BAKING));

        this.twitter.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_social_networks.isVisible = true));
        this.twitter.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_social_networks.isVisible = false));

        this.twitter.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnPickTrigger},
                function(event){
                    var pickedMesh = event.meshUnderPointer;
                    window.open("https://twitter.com/FedericoMoko");
                }
            )
        );
    }

    private addActions_Instagram() {
        this.instagram.isPickable = true;
        this.instagram.actionManager = new BABYLON.ActionManager(this.scene);

        this.instagram.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.instagram.material, "albedoTexture", this.instagram_BAKING_HIGHLIGHT));
        this.instagram.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.instagram.material, "albedoTexture", this.instagram_BAKING));

        this.instagram.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_social_networks.isVisible = true));
        this.instagram.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_social_networks.isVisible = false));

        this.instagram.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnPickTrigger},
                function(event){
                    var pickedMesh = event.meshUnderPointer;
                    window.open("https://www.instagram.com/moko_maracucho/?hl=fr");
                }
            )
        );
    }

    private addActions_InstagramLens() {
        this.instagram_lens.isPickable = true;
        this.instagram_lens.actionManager = new BABYLON.ActionManager(this.scene);

        this.instagram_lens.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.instagram.material, "albedoTexture", this.instagram_BAKING_HIGHLIGHT));
        this.instagram_lens.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.instagram.material, "albedoTexture", this.instagram_BAKING));

        this.instagram_lens.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_social_networks.isVisible = true));
        this.instagram_lens.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_social_networks.isVisible = false));

        this.instagram_lens.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnPickTrigger},
                function(event){
                    var pickedMesh = event.meshUnderPointer;
                    window.open("https://www.instagram.com/moko_maracucho/?hl=fr");
                }
            )
        );
    }

    private addActions_Youtube() {
        this.youtube.isPickable = true;
        this.youtube.actionManager = new BABYLON.ActionManager(this.scene);

        this.youtube.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.youtube.material, "albedoTexture", this.youtube_BAKING_HIGHLIGHT));
        this.youtube.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.youtube.material, "albedoTexture", this.youtube_BAKING));

        this.youtube.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.youtube_play.material, "albedoTexture", this.youtube_play_BAKING_HIGHLIGHT));
        this.youtube.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.youtube_play.material, "albedoTexture", this.youtube_play_BAKING));

        this.youtube.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_social_networks.isVisible = true));
        this.youtube.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_social_networks.isVisible = false));

        this.youtube.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnPickTrigger},
                function(event){
                    var pickedMesh = event.meshUnderPointer;
                    window.open("https://www.youtube.com/channel/UCi50Pr7mvDz79EFFMd0stEQ/playlists?view_as=subscriber");
                }
            )
        );
    }

    private addActions_YoutubePlay() {
        this.youtube_play.isPickable = true;
        this.youtube_play.actionManager = new BABYLON.ActionManager(this.scene);

        this.youtube_play.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.youtube.material, "albedoTexture", this.youtube_BAKING_HIGHLIGHT));
        this.youtube_play.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.youtube.material, "albedoTexture", this.youtube_BAKING));

        this.youtube_play.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.youtube_play.material, "albedoTexture", this.youtube_play_BAKING_HIGHLIGHT));
        this.youtube_play.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.youtube_play.material, "albedoTexture", this.youtube_play_BAKING));

        this.youtube_play.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_social_networks.isVisible = true));
        this.youtube_play.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_social_networks.isVisible = false));

        this.youtube_play.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnPickTrigger},
                function(event){
                    var pickedMesh = event.meshUnderPointer;
                    window.open("https://www.youtube.com/channel/UCi50Pr7mvDz79EFFMd0stEQ/playlists?view_as=subscriber");
                }
            )
        );
    }

    private addActions_UnitedKingdomRed() {
        this.united_kingdom_red.isPickable = true;
        this.united_kingdom_red.actionManager = new BABYLON.ActionManager(this.scene);

        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING_HIGHLIGHT));
        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING));

        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING_HIGHLIGHT));
        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING));

        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING_HIGHLIGHT));
        this.united_kingdom_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING));

        this.united_kingdom_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.united_kingdom_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.united_kingdom_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_english.next()));
    }

    private addActions_UnitedKingdomWhite() {
        this.united_kingdom_white.isPickable = true;
        this.united_kingdom_white.actionManager = new BABYLON.ActionManager(this.scene);

        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING_HIGHLIGHT));
        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING));

        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING_HIGHLIGHT));
        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING));

        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING_HIGHLIGHT));
        this.united_kingdom_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING));

        this.united_kingdom_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.united_kingdom_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.united_kingdom_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_english.next()));
    }

    private addActions_UnitedKingdomBlue() {
        this.united_kingdom_blue.isPickable = true;
        this.united_kingdom_blue.actionManager = new BABYLON.ActionManager(this.scene);

        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING_HIGHLIGHT));
        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_red.material, "albedoTexture", this.united_kingdom_red_BAKING));

        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING_HIGHLIGHT));
        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_white.material, "albedoTexture", this.united_kingdom_white_BAKING));

        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING_HIGHLIGHT));
        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.united_kingdom_blue.material, "albedoTexture", this.united_kingdom_blue_BAKING));

        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.united_kingdom_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_english.next()));
    }

    private addActions_FranceBlue() {
        this.france_blue.isPickable = true;
        this.france_blue.actionManager = new BABYLON.ActionManager(this.scene);

        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING_HIGHLIGHT));
        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING));

        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING_HIGHLIGHT));
        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING));

        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING_HIGHLIGHT));
        this.france_blue.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING));

        this.france_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.france_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.france_blue.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_french.next()));
    }

    private addActions_FranceWhite() {
        this.france_white.isPickable = true;
        this.france_white.actionManager = new BABYLON.ActionManager(this.scene);

        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING_HIGHLIGHT));
        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING));

        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING_HIGHLIGHT));
        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING));

        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING_HIGHLIGHT));
        this.france_white.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING));

        this.france_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.france_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.france_white.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_french.next()));
    }

    private addActions_FranceRed() {
        this.france_red.isPickable = true;
        this.france_red.actionManager = new BABYLON.ActionManager(this.scene);

        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING_HIGHLIGHT));
        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_blue.material, "albedoTexture", this.france_blue_BAKING));

        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING_HIGHLIGHT));
        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_white.material, "albedoTexture", this.france_white_BAKING));

        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING_HIGHLIGHT));
        this.france_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.france_red.material, "albedoTexture", this.france_red_BAKING));

        this.france_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.france_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.france_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_french.next()));
    }

    private addActions_SpainRed() {
        this.spain_red.isPickable = true;
        this.spain_red.actionManager = new BABYLON.ActionManager(this.scene);

        this.spain_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.spain_red.material, "albedoTexture", this.spain_red_BAKING_HIGHLIGHT));
        this.spain_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.spain_red.material, "albedoTexture", this.spain_red_BAKING));

        this.spain_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.spain_yellow.material, "albedoTexture", this.spain_yellow_BAKING_HIGHLIGHT));
        this.spain_red.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.spain_yellow.material, "albedoTexture", this.spain_yellow_BAKING));

        this.spain_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.spain_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.spain_red.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_spanish.next()));
    }

    private addActions_SpainYellow() {
        this.spain_yellow.isPickable = true;
        this.spain_yellow.actionManager = new BABYLON.ActionManager(this.scene);

        this.spain_yellow.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.spain_red.material, "albedoTexture", this.spain_red_BAKING_HIGHLIGHT));
        this.spain_yellow.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.spain_red.material, "albedoTexture", this.spain_red_BAKING));

        this.spain_yellow.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.spain_yellow.material, "albedoTexture", this.spain_yellow_BAKING_HIGHLIGHT));
        this.spain_yellow.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.spain_yellow.material, "albedoTexture", this.spain_yellow_BAKING));

        this.spain_yellow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => this.pop_up_languages.isVisible = true));
        this.spain_yellow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => this.pop_up_languages.isVisible = false));

        this.spain_yellow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.change_language_spanish.next()));
    }

    // ENTER LABORATORY

    public animation_enterLaboratory() {
        this.animation_cameraPosition_enterLaboratory();
        this.animation_targetScreenOffset_enterLaboratory();
        this.introduction_closed = true;
    }

    private animation_cameraPosition_enterLaboratory() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_cameraPosition_enterLaboratory', this.arc_rotate_camera, 'position', 15, 30, this.arc_rotate_camera.position, new BABYLON.Vector3(-20.220454501261877, 26.68576493813795, 21.37067338632216), 0, ease);
    }

    private animation_targetScreenOffset_enterLaboratory() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_targetScreenOffset_enterLaboratory', this.arc_rotate_camera, 'targetScreenOffset', 15, 30, this.arc_rotate_camera.targetScreenOffset, this.get_screenOffset_arcRotateCamera(), 0, ease);
    }

    // OPEN CAMERA

    private animation_camera_open() {
        this.arc_rotate_camera_clone = this.arc_rotate_camera.position.clone();
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_Camera_Open', this.arc_rotate_camera, 'position', 15, 40, this.arc_rotate_camera.position, new BABYLON.Vector3(-49.863988231551964, 22.117887723833682, 19.477904270270514), 0, ease);
    }

    // CLOSE CAMERA

    public animation_close() {
        this.animation_cameraPosition_close();
        this.activation_buttons();
    }

    private animation_cameraPosition_close() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_cameraPosition_close', this.arc_rotate_camera, 'position', 15, 40, this.arc_rotate_camera.position, this.arc_rotate_camera_clone, 0, ease);
    }

    // SWITCH CAMERA

    public animation_switch_camera() {
        if(this.anaglyph_activated) {
            this.animation_anaglyphArcRotateCameraPosition_switch();
        } else {
            this.animation_arcRotateCameraPosition_switch();
        }
    }

    private animation_anaglyphArcRotateCameraPosition_switch() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_anaglyphArcRotateCameraPosition_switch', this.anaglyph_arc_rotate_camera, 'position', 15, 30, this.anaglyph_arc_rotate_camera.position, new BABYLON.Vector3(this.arc_rotate_camera.position.x, this.arc_rotate_camera.position.y, this.arc_rotate_camera.position.z), 0, ease, () => this.switch_camera());
    }

    private animation_arcRotateCameraPosition_switch() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_arcRotateCameraPosition_switch', this.arc_rotate_camera, 'position', 15, 30, this.arc_rotate_camera.position, new BABYLON.Vector3(this.anaglyph_arc_rotate_camera.position.x, this.anaglyph_arc_rotate_camera.position.y, this.anaglyph_arc_rotate_camera.position.z), 0, ease, () => this.switch_camera());
    }

    private switch_camera() {
      if(this.anaglyph_activated) {
          this.scene.setActiveCameraByName("arc_rotate_camera");
          this.anaglyph_activated = false;
          this.interaction.toogle_anaglyph_activated.next();
          this.activation_buttons();
      } else {
          this.scene.setActiveCameraByName("anaglyph_arc_rotate_camera");
          this.anaglyph_activated = true;
          this.interaction.toogle_anaglyph_activated.next();
          this.desactivation_buttons();
      }
    }

    // DASHBOARD

    public emitCameraDatas_init(): CameraDatas {
        this.getCameraDatas_dashBoard();
        this.interaction.getCameraDatas_init.next();
        return this.dashBoardCameraDatas;
    }

    public emitCameraDatas_loop(): CameraDatas {
        this.getCameraDatas_dashBoard();
        this.interaction.getCameraDatas_loop.next();
        return this.dashBoardCameraDatas;
    }

    public getCameraDatas_dashBoard() {
        this.dashBoardCameraDatas = {
            alpha: this.arc_rotate_camera.alpha,
            beta: this.arc_rotate_camera.beta,
            radius: this.arc_rotate_camera.radius,
            x: this.arc_rotate_camera.position.x,
            y: this.arc_rotate_camera.position.y,
            z: this.arc_rotate_camera.position.z
        }
    }

    public animate(): void {
        this.ngZone.runOutsideAngular(() => {
            const rendererLoopCallback = () => {
                this.scene.render();
                this.scene.executeWhenReady(() => this.sceneIsLoaded());
                this.emitCameraDatas_loop();
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
                if(this.introduction_closed == false) {
                    this.set_position_arcRotateCamera();
                }
                this.set_screenOffset_arcRotateCamera();
                this.set_screenOffset_anaglyphArcRotateCamera();
            });
        });
    }

    public cleanUp() {
        this.engine.stopRenderLoop();
        this.scene.dispose();
        this.engine.dispose();
        this.scene_loaded = false;
    }
}
