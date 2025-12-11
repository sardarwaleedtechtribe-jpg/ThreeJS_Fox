import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.setInstance()
    }

     setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLight=true
        this.instance.outputColorEncoding=THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        
        // Use BasicShadowMap for better performance (faster than PCFSoftShadowMap)
        // If soft shadows are needed, consider PCFShadowMap as a middle ground
        this.instance.shadowMap.type = THREE.BasicShadowMap
        
        this.instance.setClearColor('#221d20')  
        this.instance.setSize(this.sizes.width, this.sizes.height)
        
        // Limit pixel ratio to max 2 for better performance on high-DPI displays
        const pixelRatio = Math.min(this.sizes.pixelRatio, 2)
        this.instance.setPixelRatio(pixelRatio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        // Limit pixel ratio to max 2 for better performance on high-DPI displays
        const pixelRatio = Math.min(this.sizes.pixelRatio, 2)
        this.instance.setPixelRatio(pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}