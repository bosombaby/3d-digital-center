<template>
    <div class="container" ref="show-model">

    </div>
</template>

<script setup>
// 可以接受的模型格式
// const acceptModel = reactive(['.gltf', '.obj', '.fbx', '.stl'])
import { useRoute } from 'vue-router'
import { getCurrentInstance, onMounted } from 'vue'
import { useServerStore } from '@/store/'

//three.js相关包
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

const { proxy } = getCurrentInstance()

//确定模型类型与地址
const route = useRoute()
const serverStore = useServerStore()
const requestURL = serverStore.baseURL
const modelURL = requestURL + route.query.url
const modelType = route.query.url.split('.')[1]


// 渲染three页面
let scene, camera, renderer
let controls, stats, gui


function init () {
    //场景
    scene = new THREE.Scene()

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    //导航网格
    const gridHelper = new THREE.GridHelper(10, 15)
    scene.add(gridHelper)

    //加载物体
    console.log(modelType);
    switch (modelType) {
        case 'gltf':
            gltfLoader()
            break;
        case 'stl':
            stlLoader()
            break;
        default:
            alert('不支持这种模型！')
            break;
    }





    //灯光
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    scene.add(ambientLight)

    //点光源
    const pointLight1 = new THREE.PointLight(0xffffff)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    //相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position.set(0, 5, 10)
    camera.lookAt(scene.position)

    //渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xb9d3ff, 1)
    proxy.$refs['show-model'].appendChild(renderer.domElement)

    //控制器
    controls = new OrbitControls(camera, renderer.domElement)
    //帧率检测
    stats = new Stats()
    proxy.$refs['show-model'].appendChild(stats.domElement)

    window.addEventListener('resize', windowResize)
    window.addEventListener('dblclick', fullScreen)


}

function aniamte () {
    renderer.render(scene, camera)
    controls.update()
    stats.update()
    requestAnimationFrame(aniamte)
}
//加载模型

function gltfLoader () {
    const loader = new GLTFLoader()
    loader.load(modelURL, (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.material.emissive = child.material.color;
                child.material.emissiveMap = child.material.map;
            }
        });

        scene.add(gltf.scene)
        infoPanel(gltf.scene)
    })
}

function stlLoader () {

}
init()
aniamte()
//自适应屏幕
function windowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

//全屏响应
function fullScreen () {
    let isFullScreen = document.fullscreenElement
    if (!isFullScreen) {
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

//添加gui
function infoPanel (model) {
    gui = new dat.GUI()

    let guiTranslate = gui.addFolder('平移')
    guiTranslate.add(model.position, 'x', -10, 10, 0.1).name('X轴移动')
    guiTranslate.add(model.position, 'y', -10, 10, 0.1).name('Y轴移动')
    guiTranslate.add(model.position, 'z', -10, 10, 0.1).name('Z轴移动')

    let guiRotate = gui.addFolder('旋转')
    guiRotate.add(model.rotation, 'x', 0, 360, 0.01).name('X轴旋转')
    guiRotate.add(model.rotation, 'y', 0, 360, 0.01).name('Y轴旋转')
    guiRotate.add(model.rotation, 'z', 0, 360, 0.01).name('Z轴旋转')


    let guiScale = gui.addFolder('缩放')
    guiScale.add(model.scale, 'x', 0.1, 5, 0.1).name('X轴缩放')
    guiScale.add(model.scale, 'y', 0.1, 5, 0.1).name('Y轴缩放')
    guiScale.add(model.scale, 'z', 0.1, 5, 0.1).name('Z轴缩放')



    //自旋转
    let guiOrbit = gui.addFolder('模型控制')
    guiOrbit.add(controls, 'enabled').name('关闭轨道控制器')
    guiOrbit.add(controls, 'autoRotate').name('自旋转')
    guiOrbit.add(controls, 'autoRotateSpeed', 2, 60, 0.1).name('自旋转速度')
    guiOrbit.add(controls, 'enableDamping').name('阻尼')

    //颜色



    //恢复默认值


    //



    // console.log(model);

}
onMounted(() => {
    init()
    aniamte()

})
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>