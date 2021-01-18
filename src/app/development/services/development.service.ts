import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';

import { InteractionService } from './interaction.service';

import { CameraDatas } from '../../shared/models/camera-datas';

@Injectable({
  providedIn: 'root'
})
export class DevelopmentService {

    private innerWidth: any;
    private innerHeight: any;

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private arc_rotate_camera: BABYLON.ArcRotateCamera;
    private anaglyph_arc_rotate_camera: BABYLON.AnaglyphArcRotateCamera;

    private pipeline: BABYLON.DefaultRenderingPipeline;
    private rotation;

    private hemispheric_light: BABYLON.Light;

    private desk;
    private threed_glasses_frame;
    private threed_glass_blue;
    private threed_glass_red;
    private server_glass;
    private arrow_top;
    private arrow_bottom;


    private icon_postgresql;
    private icon_java;
    private icon_spring_framework;
    private icon_maven;
    private icon_css;
    private icon_html;
    private icon_bootstrap;
    private icon_angular;
    private icon_typescript;
    private icon_postman;
    private icon_docker;
    private icon_git;
    private icon_blender;
    private icon_babylon;
    private icon_photoshop;
    private icon_illustrator;
    private via_air_mail;

    private icon_git_BAKING: BABYLON.Texture;
    private icon_git_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_docker_BAKING: BABYLON.Texture;
    private icon_docker_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_postman_BAKING: BABYLON.Texture;
    private icon_postman_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_postgresql_BAKING: BABYLON.Texture;
    private icon_postgresql_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_spring_framework_BAKING: BABYLON.Texture;
    private icon_spring_framework_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_maven_BAKING: BABYLON.Texture;
    private icon_maven_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_java_BAKING: BABYLON.Texture;
    private icon_java_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_html_BAKING: BABYLON.Texture;
    private icon_html_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_css_BAKING: BABYLON.Texture;
    private icon_css_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_angular_BAKING: BABYLON.Texture;
    private icon_angular_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_bootstrap_BAKING: BABYLON.Texture;
    private icon_bootstrap_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_typescript_BAKING: BABYLON.Texture;
    private icon_typescript_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_blender_BAKING: BABYLON.Texture;
    private icon_blender_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_babylon_BAKING: BABYLON.Texture;
    private icon_babylon_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_photoshop_BAKING: BABYLON.Texture;
    private icon_photoshop_BAKING_HIGHLIGHT: BABYLON.Texture;
    private icon_illustrator_BAKING: BABYLON.Texture;
    private icon_illustrator_BAKING_HIGHLIGHT: BABYLON.Texture;
    private via_air_mail_BAKING: BABYLON.Texture;
    private via_air_mail_BAKING_HIGHLIGHT: BABYLON.Texture;
    private threed_glasses_frame_BAKING: BABYLON.Texture;
    private threed_glasses_frame_BAKING_HIGHLIGHT: BABYLON.Texture;

    private glass_MATERIAL: BABYLON.StandardMaterial;
    private glass_blue_MATERIAL: BABYLON.StandardMaterial;
    private glass_red_MATERIAL: BABYLON.StandardMaterial;
    private arrows_MATERIAL: BABYLON.StandardMaterial;

    private scene_loaded = false;
    private introduction_closed = false;

    private arc_rotate_camera_clone;

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

        this.arc_rotate_camera = new BABYLON.ArcRotateCamera("arc_rotate_camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.set_initialPosition_ArcRotateCamera();
        this.arc_rotate_camera.lockedTarget = new BABYLON.Vector3(-4, 10, 5);
        this.arc_rotate_camera.lowerBetaLimit = -0.4;
        this.arc_rotate_camera.upperBetaLimit = 1.65;
        this.arc_rotate_camera.lowerRadiusLimit = 5;
        this.arc_rotate_camera.upperRadiusLimit = 90;
        this.arc_rotate_camera.attachControl(canvas, true);
        this.set_initialScreenOffset_ArcRotateCamera();

        this.anaglyph_arc_rotate_camera = new BABYLON.AnaglyphArcRotateCamera("anaglyph_arc_rotate_camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), 0.1, this.scene);
        this.anaglyph_arc_rotate_camera.lockedTarget =  new BABYLON.Vector3(-4, 10, 5);
        this.anaglyph_arc_rotate_camera.lowerBetaLimit = -0.4;
        this.anaglyph_arc_rotate_camera.upperBetaLimit = 1.65;
        this.anaglyph_arc_rotate_camera.lowerRadiusLimit = 5;
        this.anaglyph_arc_rotate_camera.upperRadiusLimit = 90;
        this.anaglyph_arc_rotate_camera.attachControl(canvas, true);
        this.anaglyph_arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(8, -2);

        this.pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, this.scene, [this.arc_rotate_camera]);

        this.pipeline.samples = 4;
        this.pipeline.fxaaEnabled = true;
        this.pipeline.bloomEnabled = true;
        this.pipeline.bloomKernel = 640;
        this.pipeline.bloomWeight = 1;
        this.pipeline.bloomThreshold = 0.3;
        this.pipeline.bloomScale = 0.5;

        this.pipeline.chromaticAberrationEnabled = true;
        this.set_chromaticAberration();
        this.rotation = 1;
        this.pipeline.chromaticAberration.direction.x = Math.sin(this.rotation);
        this.pipeline.chromaticAberration.direction.y = Math.cos(this.rotation);

        this.pipeline.grainEnabled = true;
        this.pipeline.grain.intensity = 7;

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

        this.via_air_mail_BAKING = new BABYLON.Texture("../../assets/glb/laboratory/baking/via_air_mail_BAKING.jpg", this.scene, false, false);
        this.via_air_mail_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/laboratory/baking/via_air_mail_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("via_air_mail", "../../assets/glb/development/", "via_air_mail.glb").then((result) => {
          this.via_air_mail = this.scene.getMeshByName("via_air_mail");
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

        this.icon_postgresql_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_postgresql_BAKING.jpg", this.scene, false, false);
        this.icon_postgresql_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_postgresql_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_java_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_java_BAKING.jpg", this.scene, false, false);
        this.icon_java_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_java_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_spring_framework_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_spring_framework_BAKING.jpg", this.scene, false, false);
        this.icon_spring_framework_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_spring_framework_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_maven_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_maven_BAKING.jpg", this.scene, false, false);
        this.icon_maven_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_maven_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_css_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_css_BAKING.jpg", this.scene, false, false);
        this.icon_css_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_css_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_html_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_html_BAKING.jpg", this.scene, false, false);
        this.icon_html_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_html_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_bootstrap_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_bootstrap_BAKING.jpg", this.scene, false, false);
        this.icon_bootstrap_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_bootstrap_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_angular_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_angular_BAKING.jpg", this.scene, false, false);
        this.icon_angular_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_angular_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_typescript_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_typescript_BAKING.jpg", this.scene, false, false);
        this.icon_typescript_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_typescript_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_postman_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_postman_BAKING.jpg", this.scene, false, false);
        this.icon_postman_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_postman_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_docker_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_docker_BAKING.jpg", this.scene, false, false);
        this.icon_docker_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_docker_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_git_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_git_BAKING.jpg", this.scene, false, false);
        this.icon_git_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_git_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_blender_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_blender_BAKING.jpg", this.scene, false, false);
        this.icon_blender_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_blender_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_babylon_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_babylon_BAKING.jpg", this.scene, false, false);
        this.icon_babylon_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_babylon_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_photoshop_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_photoshop_BAKING.jpg", this.scene, false, false);
        this.icon_photoshop_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_photoshop_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        this.icon_illustrator_BAKING = new BABYLON.Texture("../../assets/glb/development/baking/icon_illustrator_BAKING.jpg", this.scene, false, false);
        this.icon_illustrator_BAKING_HIGHLIGHT = new BABYLON.Texture("../../assets/glb/development/baking/icon_illustrator_BAKING_HIGHLIGHT.jpg", this.scene, false, false);

        BABYLON.SceneLoader.ImportMeshAsync("icon_postgresql", "../../assets/glb/development/", "icon_postgresql.glb").then((result) => {
            this.icon_postgresql = this.scene.getMeshByName("icon_postgresql");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_java", "../../assets/glb/development/", "icon_java.glb").then((result) => {
          this.icon_java = this.scene.getMeshByName("icon_java");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_spring_framework", "../../assets/glb/development/", "icon_spring_framework.glb").then((result) => {
          this.icon_spring_framework = this.scene.getMeshByName("icon_spring_framework");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_maven", "../../assets/glb/development/", "icon_maven.glb").then((result) => {
          this.icon_maven = this.scene.getMeshByName("icon_maven");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_css", "../../assets/glb/development/", "icon_css.glb").then((result) => {
          this.icon_css = this.scene.getMeshByName("icon_css");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_html", "../../assets/glb/development/", "icon_html.glb").then((result) => {
          this.icon_html = this.scene.getMeshByName("icon_html");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_bootstrap", "../../assets/glb/development/", "icon_bootstrap.glb").then((result) => {
          this.icon_bootstrap = this.scene.getMeshByName("icon_bootstrap");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_angular", "../../assets/glb/development/", "icon_angular.glb").then((result) => {
          this.icon_angular = this.scene.getMeshByName("icon_angular");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_typescript", "../../assets/glb/development/", "icon_typescript.glb").then((result) => {
          this.icon_typescript = this.scene.getMeshByName("icon_typescript");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_postman", "../../assets/glb/development/", "icon_postman.glb").then((result) => {
          this.icon_postman = this.scene.getMeshByName("icon_postman");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_docker", "../../assets/glb/development/", "icon_docker.glb").then((result) => {
          this.icon_docker = this.scene.getMeshByName("icon_docker");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_git", "../../assets/glb/development/", "icon_git.glb").then((result) => {
          this.icon_git = this.scene.getMeshByName("icon_git");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_blender", "../../assets/glb/development/", "icon_blender.glb").then((result) => {
          this.icon_blender = this.scene.getMeshByName("icon_blender");
        });
        BABYLON.SceneLoader.ImportMeshAsync("icon_babylon", "../../assets/glb/development/", "icon_babylon.glb").then((result) => {
          this.icon_babylon = this.scene.getMeshByName("icon_babylon");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_photoshop", "../../assets/glb/development/", "icon_photoshop.glb").then((result) => {
          this.icon_photoshop = this.scene.getMeshByName("icon_photoshop");
        });

        BABYLON.SceneLoader.ImportMeshAsync("icon_illustrator", "../../assets/glb/development/", "icon_illustrator.glb").then((result) => {
          this.icon_illustrator = this.scene.getMeshByName("icon_illustrator");
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

    // WINDOW DIMENSIONS

    public set_windowDimensions(width, height) {
        this.innerWidth = width;
        this.innerHeight = height;
    }

    private set_initialPosition_ArcRotateCamera() {
        if(this.innerWidth <= 576) {
          this.arc_rotate_camera.alpha = 2.5;       this.arc_rotate_camera.beta = 0.6;      this.arc_rotate_camera.radius = 65;

        } else if(this.innerWidth <= 768) {
            this.arc_rotate_camera.alpha = 2.5;       this.arc_rotate_camera.beta = 0.6;      this.arc_rotate_camera.radius = 65;

        } else if(this.innerWidth <= 960) {
            this.arc_rotate_camera.alpha = 2.6;       this.arc_rotate_camera.beta = 0.9;      this.arc_rotate_camera.radius = 70;

        } else if(this.innerWidth <= 1140) {
            this.arc_rotate_camera.alpha = 2.75;      this.arc_rotate_camera.beta = 1;        this.arc_rotate_camera.radius = 60;

        } else if(this.innerWidth <= 1500) {
          this.arc_rotate_camera.alpha = 2.4;      this.arc_rotate_camera.beta = 0.85;        this.arc_rotate_camera.radius = 64;

        } else {
            this.arc_rotate_camera.alpha = 2.25;      this.arc_rotate_camera.beta = 1.05;     this.arc_rotate_camera.radius = 50;

        }
    }

    private set_initialScreenOffset_ArcRotateCamera() {
      if(this.innerWidth <= 576) {
          this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(0, -2);
      } else if(this.innerWidth <= 768) {
          this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(1, -2);
      } else if(this.innerWidth <= 960) {
          this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(7, -0.5);
      } else if(this.innerWidth <= 1140) {
          this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(7, 0);
      } else if(this.innerWidth <= 1500) {
        this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(8, -1);
      } else {
          this.arc_rotate_camera.targetScreenOffset = new BABYLON.Vector2(9, 0);
      }
    }

    // ABERRATION CHROMATIC AMOUNT

    private set_chromaticAberration():void {
      if(this.innerWidth <= 576) {
        this.pipeline.chromaticAberration.aberrationAmount = 15;
        this.pipeline.chromaticAberration.radialIntensity = 1;
      } else if(this.innerWidth <= 768) {
        this.pipeline.chromaticAberration.aberrationAmount = 18;
        this.pipeline.chromaticAberration.radialIntensity = 1;
      } else if(this.innerWidth <= 960) {
        this.pipeline.chromaticAberration.aberrationAmount = 21;
        this.pipeline.chromaticAberration.radialIntensity = 0.9;
      } else if(this.innerWidth <= 1140) {
        this.pipeline.chromaticAberration.aberrationAmount = 24;
        this.pipeline.chromaticAberration.radialIntensity = 0.8;
      } else if(this.innerWidth <= 1500) {
        this.pipeline.chromaticAberration.aberrationAmount = 27;
        this.pipeline.chromaticAberration.radialIntensity = 0.8;
      } else {
        this.pipeline.chromaticAberration.aberrationAmount = 30;
        this.pipeline.chromaticAberration.radialIntensity = 0.8;
      }
    }

    // IS LOADED

    private sceneIsLoaded():void {
        if(!this.scene_loaded) {
            this.scene_loaded = true;
            this.interaction.isLoaded.next();
            this.addActions_buttons();
        }
    }

    // ADD ACTIONS

    public addActions_buttons() {
        this.addActions_IconPostgresql();
        this.addActions_IconJava();
        this.addActions_IconSpringFramework();
        this.addActions_IconMaven();
        this.addActions_IconCss();
        this.addActions_IconHtml();
        this.addActions_IconBootstrap();
        this.addActions_IconAngular();
        this.addActions_IconTypescript();
        this.addActions_IconPostman();
        this.addActions_IconDocker();
        this.addActions_IconGit();
        this.addActions_IconBlender();
        this.addActions_IconBabylon();
        this.addActions_IconPhotoshop();
        this.addActions_IconIllustrator();
        this.addActions_ViaAirMail();
    }

    private activation_buttons() {
        this.icon_postgresql.isPickable = true;
        this.icon_java.isPickable = true;
        this.icon_spring_framework.isPickable = true;
        this.icon_maven.isPickable = true;
        this.icon_css.isPickable = true;
        this.icon_html.isPickable = true;
        this.icon_bootstrap.isPickable = true;
        this.icon_angular.isPickable = true;
        this.icon_typescript.isPickable = true;
        this.icon_postman.isPickable = true;
        this.icon_docker.isPickable = true;
        this.icon_git.isPickable = true;
        this.icon_blender.isPickable = true;
        this.icon_babylon.isPickable = true;
        this.icon_photoshop.isPickable = true;
        this.icon_illustrator.isPickable = true;
        this.via_air_mail.isPickable = true;
    }

    private desactivation_buttons() {
        this.icon_postgresql.isPickable = false;
        this.icon_java.isPickable = false;
        this.icon_spring_framework.isPickable = false;
        this.icon_maven.isPickable = false;
        this.icon_css.isPickable = false;
        this.icon_html.isPickable = false;
        this.icon_bootstrap.isPickable = false;
        this.icon_angular.isPickable = false;
        this.icon_typescript.isPickable = false;
        this.icon_postman.isPickable = false;
        this.icon_docker.isPickable = false;
        this.icon_git.isPickable = false;
        this.icon_blender.isPickable = false;
        this.icon_babylon.isPickable = false;
        this.icon_photoshop.isPickable = false;
        this.icon_illustrator.isPickable = false;
        this.via_air_mail.isPickable = false;
    }

    private addActions_IconPostgresql() {
        this.icon_postgresql.isPickable = true;
        this.icon_postgresql.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_postgresql.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_postgresql.material, "albedoTexture", this.icon_postgresql_BAKING_HIGHLIGHT));
        this.icon_postgresql.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_postgresql.material, "albedoTexture", this.icon_postgresql_BAKING));

        this.icon_postgresql.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_postgresql},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_postgresql.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_postgresql.next()));
    }

    private addActions_IconJava() {
        this.icon_java.isPickable = true;
        this.icon_java.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_java.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_java.material, "albedoTexture", this.icon_java_BAKING_HIGHLIGHT));
        this.icon_java.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_java.material, "albedoTexture", this.icon_java_BAKING));

        this.icon_java.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_java},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_java.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_java.next()));
    }

    private addActions_IconSpringFramework() {
        this.icon_spring_framework.isPickable = true;
        this.icon_spring_framework.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_spring_framework.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_spring_framework.material, "albedoTexture", this.icon_spring_framework_BAKING_HIGHLIGHT));
        this.icon_spring_framework.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_spring_framework.material, "albedoTexture", this.icon_spring_framework_BAKING));

        this.icon_spring_framework.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_spring_framework},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_spring_framework.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_spring_framework.next()));
    }

    private addActions_IconMaven() {
        this.icon_maven.isPickable = true;
        this.icon_maven.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_maven.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_maven.material, "albedoTexture", this.icon_maven_BAKING_HIGHLIGHT));
        this.icon_maven.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_maven.material, "albedoTexture", this.icon_maven_BAKING));

        this.icon_maven.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_maven},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_maven.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_maven.next()));
    }

    private addActions_IconCss() {
        this.icon_css.isPickable = true;
        this.icon_css.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_css.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_css.material, "albedoTexture", this.icon_css_BAKING_HIGHLIGHT));
        this.icon_css.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_css.material, "albedoTexture", this.icon_css_BAKING));

        this.icon_css.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_css},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_css.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_css.next()));
    }

    private addActions_IconHtml() {
        this.icon_html.isPickable = true;
        this.icon_html.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_html.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_html.material, "albedoTexture", this.icon_html_BAKING_HIGHLIGHT));
        this.icon_html.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_html.material, "albedoTexture", this.icon_html_BAKING));

        this.icon_html.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_html},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_html.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_html.next()));
    }

    private addActions_IconBootstrap() {
        this.icon_bootstrap.isPickable = true;
        this.icon_bootstrap.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_bootstrap.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_bootstrap.material, "albedoTexture", this.icon_bootstrap_BAKING_HIGHLIGHT));
        this.icon_bootstrap.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_bootstrap.material, "albedoTexture", this.icon_bootstrap_BAKING));

        this.icon_bootstrap.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_bootstrap},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_bootstrap.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_bootstrap.next()));
    }

    private addActions_IconAngular() {
        this.icon_angular.isPickable = true;
        this.icon_angular.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_angular.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_angular.material, "albedoTexture", this.icon_angular_BAKING_HIGHLIGHT));
        this.icon_angular.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_angular.material, "albedoTexture", this.icon_angular_BAKING));

        this.icon_angular.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_angular},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_angular.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_angular.next()));
    }

    private addActions_IconTypescript() {
        this.icon_typescript.isPickable = true;
        this.icon_typescript.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_typescript.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_typescript.material, "albedoTexture", this.icon_typescript_BAKING_HIGHLIGHT));
        this.icon_typescript.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_typescript.material, "albedoTexture", this.icon_typescript_BAKING));

        this.icon_typescript.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_typescript},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_typescript.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_typescript.next()));
    }

    private addActions_IconPostman() {
        this.icon_postman.isPickable = true;
        this.icon_postman.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_postman.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_postman.material, "albedoTexture", this.icon_postman_BAKING_HIGHLIGHT));
        this.icon_postman.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_postman.material, "albedoTexture", this.icon_postman_BAKING));

        this.icon_postman.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_postman},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_postman.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_postman.next()));
    }

    private addActions_IconDocker() {
        this.icon_docker.isPickable = true;
        this.icon_docker.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_docker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_docker.material, "albedoTexture", this.icon_docker_BAKING_HIGHLIGHT));
        this.icon_docker.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_docker.material, "albedoTexture", this.icon_docker_BAKING));

        this.icon_docker.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_docker},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_docker.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_docker.next()));
    }

    private addActions_IconGit() {
        this.icon_git.isPickable = true;
        this.icon_git.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_git.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_git.material, "albedoTexture", this.icon_git_BAKING_HIGHLIGHT));
        this.icon_git.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_git.material, "albedoTexture", this.icon_git_BAKING));

        this.icon_git.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_git},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_git.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_git.next()));
    }

    private addActions_IconBlender() {
        this.icon_blender.isPickable = true;
        this.icon_blender.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_blender.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_blender.material, "albedoTexture", this.icon_blender_BAKING_HIGHLIGHT));
        this.icon_blender.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_blender.material, "albedoTexture", this.icon_blender_BAKING));

        this.icon_blender.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_blender},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_blender.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_blender.next()));
    }

    private addActions_IconBabylon() {
        this.icon_babylon.isPickable = true;
        this.icon_babylon.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_babylon.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_babylon.material, "albedoTexture", this.icon_babylon_BAKING_HIGHLIGHT));
        this.icon_babylon.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_babylon.material, "albedoTexture", this.icon_babylon_BAKING));

        this.icon_babylon.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_babylon},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_babylon.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_babylon.next()));
    }

    private addActions_IconPhotoshop() {
        this.icon_photoshop.isPickable = true;
        this.icon_photoshop.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_photoshop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_photoshop.material, "albedoTexture", this.icon_photoshop_BAKING_HIGHLIGHT));
        this.icon_photoshop.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_photoshop.material, "albedoTexture", this.icon_photoshop_BAKING));

        this.icon_photoshop.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_photoshop},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_photoshop.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_photoshop.next()));
    }

    private addActions_IconIllustrator() {
        this.icon_illustrator.isPickable = true;
        this.icon_illustrator.actionManager = new BABYLON.ActionManager(this.scene);

        this.icon_illustrator.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.icon_illustrator.material, "albedoTexture", this.icon_illustrator_BAKING_HIGHLIGHT));
        this.icon_illustrator.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.icon_illustrator.material, "albedoTexture", this.icon_illustrator_BAKING));

        this.icon_illustrator.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.icon_illustrator},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.desactivation_buttons()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );

        this.icon_illustrator.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,() => this.interaction.open_illustrator.next()));
    }

    private addActions_ViaAirMail() {
        this.via_air_mail.isPickable = true;
        this.via_air_mail.actionManager = new BABYLON.ActionManager(this.scene);

        this.via_air_mail.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.via_air_mail.material, "albedoTexture", this.via_air_mail_BAKING_HIGHLIGHT));
        this.via_air_mail.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.via_air_mail.material, "albedoTexture", this.via_air_mail_BAKING));

        this.via_air_mail.actionManager.registerAction(new BABYLON.CombineAction(
                {trigger: BABYLON.ActionManager.OnPickTrigger, parameter: this.via_air_mail},
                [
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.animation_openCard()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.open_contactMe.next()),
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.NothingTrigger, () => this.interaction.toogle_cache.next())
                ]
            )
        );
    }

    // ENTER DEVELOPMENT

    public animation_enterDevelopment() {
        this.animation_cameraPosition_enterDevelopment();
        this.animation_targetScreenOffset_enterDevelopment();
        this.introduction_closed = true;
    }

    private animation_cameraPosition_enterDevelopment() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_cameraPosition_enterDevelopment', this.arc_rotate_camera, 'position', 15, 30, this.arc_rotate_camera.position, this.get_positionCamera_enterDevelopment(), 0, ease);
    }

    private get_positionCamera_enterDevelopment(): BABYLON.Vector3 {
        if(this.innerWidth <= 576) {
            return new BABYLON.Vector3(-3.094765153164219, 39.442763062028746, 90.04295534108225);
        } else if(this.innerWidth <= 768) {
          return new BABYLON.Vector3(-3.094765153164219, 39.442763062028746, 90.04295534108225);
        } else if(this.innerWidth <= 960) {
            return new BABYLON.Vector3(-3.346219277285269, 31.264217767020764, 66.41991219078163);
        } else if(this.innerWidth <= 1140) {
            return new BABYLON.Vector3(-3.3883415436680724, 29.89419106833633, 62.46270480821193);
        } else if(this.innerWidth <= 1500) {
            return new BABYLON.Vector3(-3.48872236413827, 26.629304919281328, 53.03235459336118);
        } else {
            return new BABYLON.Vector3(-3.5891031846084673, 23.364418770226326, 43.60200437851042);
        }
    }

    private animation_targetScreenOffset_enterDevelopment() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_targetScreenOffset_enterDevelopment', this.arc_rotate_camera, 'targetScreenOffset', 15, 30, this.arc_rotate_camera.targetScreenOffset, new BABYLON.Vector2(4, -0.5), 0, ease, () => this.interaction.toogle_cache.next());
    }

    // OPEN CARD

    private animation_openCard() {
      this.animation_cameraPosition_openCard();
      this.animation_targetScreenOffset_openCard();
      this.desactivation_buttons();
    }

    private animation_cameraPosition_openCard() {
        this.arc_rotate_camera_clone = this.arc_rotate_camera.position.clone();
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_cameraPosition_openCard', this.arc_rotate_camera, 'position', 15, 30, this.arc_rotate_camera.position, this.get_positionCamera_openCard(), 0, ease);
    }

    private get_positionCamera_openCard(): BABYLON.Vector3 {
        if(this.innerWidth <= 576) {
            return new BABYLON.Vector3(-50.65007800566379, 47.233077592451984, 13.183056196512112);
        } else if(this.innerWidth <= 768) {
            return new BABYLON.Vector3(-52.3410593253664, 58.85694487174785, 14.276335682616303);
        } else if(this.innerWidth <= 960) {
            return new BABYLON.Vector3(-57.04992146287326, 39.949376044454034, 14.642339769040099);
        } else if(this.innerWidth <= 1140) {
            return new BABYLON.Vector3(-60.62313059142518, 48.64356558951404, 19.878532715863148);
        } else if(this.innerWidth <= 1500) {
            return new BABYLON.Vector3(-58.38337660286841, 36.651254667701544, 33.99949253333725);
        } else {
            return new BABYLON.Vector3(-49.863988231551964, 22.117887723833682, 19.477904270270514);
        }
    }

    private animation_targetScreenOffset_openCard() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_targetScreenOffset_openCard', this.arc_rotate_camera, 'targetScreenOffset', 15, 30, this.arc_rotate_camera.targetScreenOffset, new BABYLON.Vector2(10, 1), 0, ease, () => this.interaction.toogle_cache.next());
    }

    // CLOSE CARD

    public animation_closeCard() {
      this.animation_cameraPosition_closeCard();
      this.animation_targetScreenOffset_closeCard();
      this.activation_buttons();
    }

    private animation_cameraPosition_closeCard() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_cameraPosition_closeCard', this.arc_rotate_camera, 'position', 15, 30, this.arc_rotate_camera.position, this.arc_rotate_camera_clone, 0, ease);
    }

    private animation_targetScreenOffset_closeCard() {
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('animation_targetScreenOffset_openCard', this.arc_rotate_camera, 'targetScreenOffset', 15, 30, this.arc_rotate_camera.targetScreenOffset, new BABYLON.Vector2(0, 0), 0, ease, () => this.interaction.toogle_cache.next());
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
                if(!this.introduction_closed) {
                    this.set_initialPosition_ArcRotateCamera();
                    this.set_initialScreenOffset_ArcRotateCamera();
                }
                this.set_chromaticAberration();
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
