<template>
    
    <div class="upload">
        <el-button type="primary" @click="dialogVisible = true">上传模型</el-button>
    </div>
    <!-- 对话框收集数据 -->
    <el-dialog v-model="dialogVisible" title="请输入模型数据" width="30%">
        <el-form :model="newModel" ref="modelForm" :rules="rules">
            <!-- 收集模型姓名与一级分类 -->
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="模型名称" prop="name">
                        <el-input v-model.trim="newModel.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模型分类" prop="first_category">
                        <el-select v-model="newModel.first_category" class="m-2" placeholder="选择">
                            <el-option v-for="item in firstCategory" :key="item.value" :value="item.value"
                                :label="item.label" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 收集模型预览图片与模型 -->
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="预览图片:" prop="photo_url">
                        <div class="upload-img" @click="tempImg">
                            <img v-show="imageUrl" :src="imageUrl" />
                            <el-icon :size="40" class="img-icon" v-show="!imageUrl">
                                <Plus />
                            </el-icon>
                        </div>
                        <input type="file" @change="uploadImg" ref="uploadImgEle" accept="image/*" v-show="false">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模型" prop="model_url">
                        <input type="file" ref="uploadModelEle" :accept="acceptModel" >
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 收集tag标签 -->
            <el-row>
                <el-form-item label="标签(最多5个):" prop="tag">
                    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" style="margin:5px;" closable
                        :disable-transitions="false" @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
                        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" class="ml-1 w-20"
                        style="width: 80px;height: 25px;" />
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + New Tag
                    </el-button>

                </el-form-item>

            </el-row>

            <!-- 对表单的操作 -->
            <el-row class="dialog-bottom">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="uploadModelInfo">
                    确认
                </el-button>
            </el-row>

        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { useUserStore, useServerStore } from '@/store/'
import {customAlphabet} from 'nanoid'
import axios from 'axios'
import parnetComponent from '../model.vue'

//后端请求
const server = useServerStore()
const userStore = useUserStore()
const url = ref(server.baseURL)
const request = axios.create({
    baseURL: url.value
})

const emits=defineEmits(['update'])
const { proxy } = getCurrentInstance()

//对话框显示
let dialogVisible = ref(false)

//表单数据
const newModel = reactive({ id:'',name: '', first_category: '', photo_url: '', model_url: '', tag: '',owner:'' })

//创建用户id
const createId = () => {
    const nanoid = customAlphabet('vr@model_123456789', 15)
    return nanoid()
}
//模型限制
const acceptModel = reactive(['.gltf', '.obj', '.fbx', '.stl'])

//表单校验
const rules = reactive({
    name: [
        { required: true, message: '名称不能为空', trigger: 'blur' },
        { min: 2, max: 10, message: '模型长度为3-10', trigger: 'blur' }
    ],
    first_category: [
        { required: true, message: '分类不能为空', trigger: 'change' },
    ],
    
})


//模型分类
let value = ref('')
const firstCategory = reactive([
    { label: '人物模型', value: '人物模型' },
    { label: '动物模型', value: '动物模型' },
    { label: '植物模型', value: '植物模型' },
    { label: '场景模型', value: '场景模型' },
    { label: '家具家居', value: '家具家居' },
    { label: '交通运输', value: '交通运输' },
    { label: '交通运输', value: '交通运输' },
    { label: '其它', value: '其它' },
])

//动态标签
let dynamicTags = ref([])

//输入框属性
let inputVisible = ref(false)
let inputValue = ref('')


//图片的属性
// 上传图片的innput
const imageUrl = ref('')
const uploadImgEle = ref('')

//模型属性
const uploadModelEle = ref('')

//输入框显示
const showInput = () => {

    if (dynamicTags.value.length < 5) {
        inputVisible.value = true
    }
    else {
        alert('标签最多5个！')
    }
}

//删除标签
const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

//添加标签
const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}


//上传图片
const tempImg = () => {
    uploadImgEle.value.click()
}

//调用方法
const uploadImg = () => {

    const file = uploadImgEle.value.files[0]
    let render = new FileReader()

    // 性能后续可优化
    render.addEventListener('load', () => {
        imageUrl.value = render.result
    }, render.readAsDataURL(file))


}
//数据库预检查模型姓名是否唯一
const preCheck = async () => {
    const res = await request.get('/model/check', { params: { name: newModel.name } })
    let isOnly = res.data.isOnly

    //检查模型名称
    if (!isOnly) {
        return '模型名称已存在'
    }

    //检查图片
    const fileImg = uploadImgEle.value.files[0]
    if (!fileImg) {
        return '图片不能为空'
    } else {
        const type = fileImg.type.split('/')[0]
        if (type !== 'image') {
            return '图片格式错误'
        }
    }

    //检查模型
    const fileModel =uploadModelEle.value.files[0]

    if (!fileModel) {
        return '模型不能为空!'
    } else {
        const type = '.' + fileModel.name.split('.')[1] 
        const size = fileModel.size/1024/1024
        if (!acceptModel.includes(type)) {
            return '模型格式错误'
        }
        if (size>10) {
            return '模型过大,不能上传'
        }
    }
    
    return '正确'
}


const uploadInfo = async() => {

    //id
    newModel.id = createId()


    const fileImg = uploadImgEle.value.files[0]
    const fileModel = uploadModelEle.value.files[0]

    // console.log('图片属性', fileImg);
    // console.log('模型属性',fileModel);

    // //相对地址
    const relativePath = `/${newModel.first_category}/${newModel.name}`
    // //表单的图片地址
    newModel.photo_url = `${relativePath}/${fileImg.name}`

    // //表单的模型地址
    newModel.model_url = `${relativePath}/${fileModel.name}`

    // //表单的标签
    newModel.tag = changeTag(dynamicTags.value)

    newModel.owner=userStore.username

    // console.log(newModel);

    // 正式像后端发起请求

    let formDataImg = new FormData()
    formDataImg.set('fileImg', fileImg)


    let formDataModel = new FormData()
    formDataModel.set('fileModel', fileModel)

    //封装要上传的内容
    await request.post('/upload/path', { relativePath })
    await request.post('/upload/img', formDataImg)
    await request.post('/upload/model', formDataModel)
 
 
    //  //参数上传数据库
    await request.post('/db/insert/model', newModel) 

    dialogVisible.value = false
}
//上传
const uploadModelInfo = () => {

    proxy.$refs.modelForm.validate( async (valid, fileds) => {
        if (valid) {
            const result = await preCheck()
            if (result === '正确') {
                await uploadInfo()
                emits('update')
                
            }
            else {
                alert(result)
            }
        } else {
            alert('数据不合法!')
        }
    })


}


//标签修改成为字符串（可优化）
const changeTag = (tagArr) => {
    let str = ''
    for (let i = 0; i < tagArr.length; i++) {
        if (i < tagArr.length - 1) {
            str += tagArr[i] + ','
        } else {
            str += tagArr[i]
        }
    }
    return str
}


</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
}

.right .btn {
    display: flex;
    width: 260px;
    justify-content: space-between;
}

.dialog-bottom {
    display: flex;
    justify-content: flex-end;
}

.upload-img {
    width: 120px;
    height: 80px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .img-icon {
        margin-left: 40px;
        margin-top: 20px;
    }
}
</style>
