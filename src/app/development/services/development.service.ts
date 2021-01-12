import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';

import { InteractionService } from './interaction.service';

import { CameraDatas } from '../../shared/models/camera-datas';

@Injectable({
  providedIn: 'root'
})
export class DevelopmentService {

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private arc_rotate_camera: BABYLON.ArcRotateCamera;
    private anaglyph_arc_rotate_camera: BABYLON.AnaglyphArcRotateCamera;

    private hemispheric_light: BABYLON.Light;

    private desk;
    private threed_glasses_frame;
    private threed_glass_blue;
    private threed_glass_red;
    private server_glass;
    private arrow_top;
    private arrow_bottom;

    private threed_glasses_frame_BAKING: BABYLON.Texture;
    private threed_glasses_frame_BAKING_HIGHLIGHT: BABYLON.Texture;

    private glass_MATERIAL: BABYLON.StandardMaterial;
    private glass_blue_MATERIAL: BABYLON.StandardMaterial;
    private glass_red_MATERIAL: BABYLON.StandardMaterial;
    private arrows_MATERIAL: BABYLON.StandardMaterial;

    private scene_loaded = false;

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

        this.arc_rotate_camera = new BABYLON.ArcRotateCamera("arc_rotate_camera", 2.25, 1.05, 50, new BABYLON.Vector3(0, 5, 0), this.scene);
        this.arc_rotate_camera.lockedTarget = new BABYLON.Vector3(-8, 10, 5);
        this.arc_rotate_camera.lowerBetaLimit = -0.4;
        this.arc_rotate_camera.upperBetaLimit = 1.65;
        this.arc_rotate_camera.lowerRadiusLimit = 20;
        this.arc_rotate_camera.upperRadiusLimit = 65;
        this.arc_rotate_camera.attachControl(canvas, true);
        this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(8, -2);

        this.anaglyph_arc_rotate_camera = new BABYLON.AnaglyphArcRotateCamera("anaglyph_arc_rotate_camera", 2.25, 1.05, 50, new BABYLON.Vector3(0, 5, 0), 0.1, this.scene);
        this.anaglyph_arc_rotate_camera.lockedTarget =  new BABYLON.Vector3(-8, 10, 5);
        this.anaglyph_arc_rotate_camera.lowerBetaLimit = -0.4;
        this.anaglyph_arc_rotate_camera.upperBetaLimit = 1.65;
        this.anaglyph_arc_rotate_camera.lowerRadiusLimit = 20;
        this.anaglyph_arc_rotate_camera.upperRadiusLimit = 65;
        this.anaglyph_arc_rotate_camera.attachControl(canvas, true);
        this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(8, -2);

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
        this.hemispheric_light.intensity = 0.8;

        // PLANS

        BABYLON.SceneLoader.ImportMeshAsync("plan_inside", "../../assets/glb/development/", "plan_inside.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("plan_outside", "../../assets/glb/development/", "plan_outside.glb").then((result) => {
        });

        // PERSIAN CARPET

        BABYLON.SceneLoader.ImportMeshAsync("persian_carpet", "../../assets/glb/development/", "persian_carpet.glb").then((result) => {
        });

        // TRESTLES

        BABYLON.SceneLoader.ImportMeshAsync("trestle_left", "../../assets/glb/development/", "trestle_left.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("trestle_right", "../../assets/glb/development/", "trestle_right.glb").then((result) => {
        });

        // DESK

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

        BABYLON.SceneLoader.ImportMeshAsync("desk", "../../assets/glb/development/", "desk.glb", this.scene).then((result) => {
            this.desk = this.scene.getMeshByName("desk");
            this.desk.material = this.glass_MATERIAL;
        });

        // RINCE COCHON

        BABYLON.SceneLoader.ImportMeshAsync("rince_cochon", "../../assets/glb/development/", "rince_cochon.glb").then((result) => {
        });

        // POST-IT

        BABYLON.SceneLoader.ImportMeshAsync("post_it", "../../assets/glb/development/", "post_it.glb").then((result) => {
        });

        // VIA AIR MAIL

        BABYLON.SceneLoader.ImportMeshAsync("via_air_mail", "../../assets/glb/development/", "via_air_mail.glb").then((result) => {
        });

        // NOTEBOOKS

        BABYLON.SceneLoader.ImportMeshAsync("notebook_bottom", "../../assets/glb/development/", "notebook_bottom.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("notebook_top", "../../assets/glb/development/", "notebook_top.glb").then((result) => {
        });

        // 3D GLASSES

        this.threed_glasses_frame_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/threed_glasses_frame_BAKING.jpg", this.scene, false, false);
        this.threed_glasses_frame_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/threed_glasses_frame_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("threed_glasses_frame", "../../assets/glb/development/", "threed_glasses_frame.glb", this.scene).then((result) => {
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

        BABYLON.SceneLoader.ImportMeshAsync("threed_glass_blue", "../../assets/glb/development/", "threed_glass_blue.glb", this.scene).then((result) => {
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

        BABYLON.SceneLoader.ImportMeshAsync("threed_glass_red", "../../assets/glb/development/", "threed_glass_red.glb", this.scene).then((result) => {
            this.threed_glass_red = this.scene.getMeshByName("threed_glass_red");
            this.threed_glass_red.material = this.glass_red_MATERIAL;
        });

        // SPUPPORT LAPTOP

        BABYLON.SceneLoader.ImportMeshAsync("support_laptop", "../../assets/glb/development/", "support_laptop.glb").then((result) => {
        });

        // BOXES

        BABYLON.SceneLoader.ImportMeshAsync("wood_box_center", "../../assets/glb/development/", "wood_box_center.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("wood_box_right", "../../assets/glb/development/", "wood_box_right.glb").then((result) => {
        });

        // COMPUTERS

        BABYLON.SceneLoader.ImportMeshAsync("keyboard", "../../assets/glb/development/", "keyboard.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("keyboard_keyboard", "../../assets/glb/development/", "keyboard_keyboard.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("mouse", "../../assets/glb/development/", "mouse.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("mac_mini", "../../assets/glb/development/", "mac_mini.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("laptop", "../../assets/glb/development/", "laptop.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("laptop_keyboard", "../../assets/glb/development/", "laptop_keyboard.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("laptop_screen", "../../assets/glb/development/", "laptop_screen.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("screen_frame_center", "../../assets/glb/development/", "screen_frame_center.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("screen_center", "../../assets/glb/development/", "screen_center.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("screen_frame_right", "../../assets/glb/development/", "screen_frame_right.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("screen_right", "../../assets/glb/development/", "screen_right.glb").then((result) => {
        });

        // ICONS

        BABYLON.SceneLoader.ImportMeshAsync("icon_css", "../../assets/glb/development/", "icon_css.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_html", "../../assets/glb/development/", "icon_html.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_bootstrap", "../../assets/glb/development/", "icon_bootstrap.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_angular", "../../assets/glb/development/", "icon_angular.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_typescript", "../../assets/glb/development/", "icon_typescript.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_postman", "../../assets/glb/development/", "icon_postman.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_docker", "../../assets/glb/development/", "icon_docker.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_git", "../../assets/glb/development/", "icon_git.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_blender", "../../assets/glb/development/", "icon_blender.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_babylon", "../../assets/glb/development/", "icon_babylon.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_photoshop", "../../assets/glb/development/", "icon_photoshop.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_illustrator", "../../assets/glb/development/", "icon_illustrator.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_spring_framework", "../../assets/glb/development/", "icon_spring_framework.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_maven", "../../assets/glb/development/", "icon_maven.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_java", "../../assets/glb/development/", "icon_java.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_postgresql", "../../assets/glb/development/", "icon_postgresql.glb").then((result) => {
        });

        // OWL

        BABYLON.SceneLoader.ImportMeshAsync("owl", "../../assets/glb/development/", "owl.glb").then((result) => {
        });

        // IPAD

        BABYLON.SceneLoader.ImportMeshAsync("ipad", "../../assets/glb/development/", "ipad.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("ipad_screen", "../../assets/glb/development/", "ipad_screen.glb").then((result) => {
        });

        // IPAD

        BABYLON.SceneLoader.ImportMeshAsync("celle_tower", "../../assets/glb/development/", "celle_tower.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("antennas", "../../assets/glb/development/", "antennas.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("antenna_box", "../../assets/glb/development/", "antenna_box.glb").then((result) => {
        });

        // CABLE

        BABYLON.SceneLoader.ImportMeshAsync("cable", "../../assets/glb/development/", "cable.glb").then((result) => {
        });

        // SERVER

        BABYLON.SceneLoader.ImportMeshAsync("servers", "../../assets/glb/development/", "servers.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("server_box", "../../assets/glb/development/", "server_box.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("server_flagstone", "../../assets/glb/development/", "server_flagstone.glb").then((result) => {
        });
        BABYLON.SceneLoader.ImportMeshAsync("server_glass", "../../assets/glb/development/", "server_glass.glb").then((result) => {
            this.server_glass = this.scene.getMeshByName("server_glass");
            this.server_glass.material = this.glass_MATERIAL;
        });

        // DATABASE

        BABYLON.SceneLoader.ImportMeshAsync("database", "../../assets/glb/development/", "database.glb").then((result) => {
        });

        // ARROWS

        this.arrows_MATERIAL = new BABYLON.StandardMaterial("arrows", this.scene);
        this.arrows_MATERIAL.diffuseColor = new BABYLON.Color3(0, 1, 0);
        this.arrows_MATERIAL.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.arrows_MATERIAL.alpha = 0.3;
        this.arrows_MATERIAL.specularPower = 16;
        this.arrows_MATERIAL.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.arrows_MATERIAL.reflectionFresnelParameters.bias = 0.1;
        this.arrows_MATERIAL.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.arrows_MATERIAL.emissiveFresnelParameters.bias = 0.6;
        this.arrows_MATERIAL.emissiveFresnelParameters.power = 4;

        BABYLON.SceneLoader.ImportMeshAsync("arrow_top", "../../assets/glb/development/", "arrow_top.glb").then((result) => {
            this.arrow_top = this.scene.getMeshByName("arrow_top");
            this.arrow_top.material = this.arrows_MATERIAL;
        });
        BABYLON.SceneLoader.ImportMeshAsync("arrow_bottom", "../../assets/glb/development/", "arrow_bottom.glb").then((result) => {
            this.arrow_bottom = this.scene.getMeshByName("arrow_bottom");
            this.arrow_bottom.material = this.arrows_MATERIAL;
        });
    }

    // IS LOADED

    private sceneIsLoaded() {
        if(!this.scene_loaded) {
            this.scene_loaded = true;
            this.interaction.isLoaded.next();
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
