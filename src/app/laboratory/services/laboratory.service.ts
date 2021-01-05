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

    private pegasus_BAKING: BABYLON.Texture;
    private pegasus_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_laces_BAKING: BABYLON.Texture;
    private pegasus_laces_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_sole_inside_BAKING: BABYLON.Texture;
    private pegasus_sole_inside_BAKING_HIGHLIGHT: BABYLON.Texture;
    private pegasus_sole_outside_BAKING: BABYLON.Texture;
    private pegasus_sole_outside_BAKING_HIGHLIGHT: BABYLON.Texture;

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

        BABYLON.SceneLoader.ImportMeshAsync("speakers", "../../assets/glb/laboratory/", "speakers.glb", this.scene).then((result) => {
            this.speakers = this.scene.getMeshByName("speakers");
        });

        BABYLON.SceneLoader.ImportMeshAsync("loud_speakers", "../../assets/glb/laboratory/", "loud_speakers.glb", this.scene).then((result) => {
            this.loud_speakers = this.scene.getMeshByName("loud_speakers");
        });

        BABYLON.SceneLoader.ImportMeshAsync("chiva", "../../assets/glb/laboratory/", "chiva.glb", this.scene).then((result) => {
            this.chiva = this.scene.getMeshByName("chiva");
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
